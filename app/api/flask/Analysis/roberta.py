from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import pandas as pd
from flask import jsonify, request
from pytube import YouTube
import re
from getComments import getComments, getCertainComments
import json
from constants import commentCountPerPage
# Preprocess text (username and link placeholders)
task = 'sentiment'
MODEL = f"cardiffnlp/twitter-roberta-base-{task}"

# # download label mapping
# labels = []
# mapping_link = f"https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/{task}/mapping.txt"
# # with urllib.request.urlopen(mapping_link) as f:
# #     html = f.read().decode('utf-8').split("\n")
# #     csvreader = csv.reader(html, delimiter='\t')
# # labels = [row[1] for row in csvreader if len(row) > 1]
model_Roberta = TFAutoModelForSequenceClassification.from_pretrained(
    MODEL, local_files_only=True)
tokenizer_Roberta = AutoTokenizer.from_pretrained(MODEL, local_files_only=True)


def preprocess_Roberta(text):
    new_text = []

    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)


def get_Comment_Analysis_Rob():
    df_predict = pd.DataFrame(
        columns=['comment', "type", 'negative_score', 'neutral_score', 'positive_score'])
    try:
        youtubeLink = request.args.get('youtubeLink')
        comment = request.args.get('comment')
        match = re.search(r'\d+', comment)
        commentCount = 100 if not match else int(match.group())
        if match:
            commentCount = int(match.group())
            print(commentCount)
        else:
            print("No number found in the text")
        video_url = youtubeLink
        if not video_url:
            return jsonify({"error": "Video URL is required"}), 400

        video_id = YouTube(video_url).video_id
        comments = getComments(video_id, 0, 1, commentCount)
        # Check if comments is None
        if comments is None:
            return jsonify({"error": "Failed to retrieve comments"}), 500
        comments = comments[:commentCountPerPage]
        for comment in comments:
            initComment = comment
            comment = preprocess_Roberta(comment)
            if comment and comment != "" and comment != ".":
                encoded_input = tokenizer_Roberta(comment, return_tensors='tf')
                output = model_Roberta(encoded_input)
                scores = output[0][0].numpy()
                scores = softmax(scores)
                type = np.argmax(np.array(scores))
                type = 0 if type == 0 else 4 if type == 2 else 2
                new_row = {'comment': initComment, "type": type, 'negative_score': round(
                    scores[0]*100, 2), 'neutral_score': round(scores[1]*100, 2), 'positive_score': round(scores[2]*100, 2)}

                df_predict.loc[len(df_predict)] = new_row

        # Convert DataFrame to JSON
        json_result = df_predict.to_json(orient='records')

        # Load JSON string back to Python object and return as JSON
        return jsonify({"comments": json.loads(json_result)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_Comment_Analysis_pagination_Rob(page_number):
    df_predict = pd.DataFrame(
        columns=['comment', "type", 'negative_score', 'neutral_score', 'positive_score'])
    try:
        page_number = int(page_number)
        comments = getCertainComments(page_number)
        # Check if comments is None
        if comments is None:
            return jsonify({"error": "Failed to retrieve comments"}), 500

        for comment in comments:
            initComment = comment
            text = preprocess_Roberta(comment)
            if comment != "" or comment != ".":
                encoded_input = tokenizer_Roberta(text, return_tensors='tf')
                output = model_Roberta(encoded_input)
                scores = output[0][0].numpy()
                scores = softmax(scores)
                type = np.argmax(np.array(scores))
                type = 0 if type == 0 else 4 if type == 2 else 2
                new_row = {'comment': initComment, "type": type, 'negative_score': round(
                    scores[0]*100, 2), 'neutral_score': round(scores[1]*100, 2), 'positive_score': round(scores[2]*100, 2)}

                df_predict.loc[len(df_predict)] = new_row

        # # Convert DataFrame to JSON
        json_result = df_predict.to_json(orient='records')

        # Load JSON string back to Python object and return as JSON
        return jsonify({"comments": json.loads(json_result)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
