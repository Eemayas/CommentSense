import json
import pandas as pd
from flask import jsonify
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer

import global_variables

from utils.comment_scrapping import get_certain_comments
from utils.prediction_utils import run_roberta_prediction
from utils.preprocessing import preprocess_Roberta

# Load the Roberta model and tokenizer (use local files only)
task = "sentiment"
MODEL = f"cardiffnlp/twitter-roberta-base-{task}"
model_Roberta = TFAutoModelForSequenceClassification.from_pretrained(
    MODEL, local_files_only=True
)
tokenizer_Roberta = AutoTokenizer.from_pretrained(MODEL, local_files_only=True)


# Updated get_Comment_Analysis_Rob using run_roberta_prediction
def get_Comment_Analysis_Rob(comments: list):
    """
    Analyze YouTube comments using Roberta sentiment analysis model.

    Args:
        comments (list): A list of comments to be analyzed.

    Returns:
        JSON response containing comments and their sentiment scores.
    """
    df_predict = pd.DataFrame(
        columns=["comment", "type", "negative_score", "neutral_score", "positive_score"]
    )

    try:
        if comments is None or len(comments) == 0:
            return (
                jsonify({"error": "(Comment Analysis Roberta) No comments provided"}),
                400,
            )
        # Process each comment and predict sentiment using run_roberta_prediction
        for comment in comments:
            initComment = comment
            comment = preprocess_Roberta(comment)

            if comment and comment != "" and comment != ".":
                sentiment_type, scores = run_roberta_prediction(
                    tokenizer_Roberta, model_Roberta, comment
                )

                # Add the result to the DataFrame
                new_row = {
                    "comment": initComment,
                    "type": sentiment_type,
                    "negative_score": round(scores[0] * 100, 2),
                    "neutral_score": round(scores[1] * 100, 2),
                    "positive_score": round(scores[2] * 100, 2),
                }
                df_predict.loc[len(df_predict)] = new_row

        # Convert DataFrame to JSON
        json_result = df_predict.to_json(orient="records")

        # Return the result as JSON
        return jsonify({"comments": json.loads(json_result)})

    except Exception as e:
        return jsonify({"error": f"(Comment Analysis Roberta) {str(e)}"}), 500


# Updated get_Comment_Analysis_pagination_Rob using run_roberta_prediction
def get_Comment_Analysis_pagination_Rob(page_number):
    """
    Analyze YouTube comments in paginated manner using Roberta model.

    Args:
        page_number (int): The current page number of comments.

    Returns:
        JSON response containing comments and their sentiment scores.
    """
    df_predict = pd.DataFrame(
        columns=["comment", "type", "negative_score", "neutral_score", "positive_score"]
    )

    try:
        page_number = int(page_number)

        # Fetch paginated comments
        comments = get_certain_comments(
            comment_list=global_variables.comment_list, page_number=page_number
        )

        # Process each comment and predict sentiment using run_roberta_prediction
        for comment in comments:
            if not isinstance(comment, str):
                continue

            initComment = comment
            comment = preprocess_Roberta(comment)

            if comment != "" and comment != ".":
                sentiment_type, scores = run_roberta_prediction(
                    tokenizer_Roberta, model_Roberta, comment
                )

                # Add the result to the DataFrame
                new_row = {
                    "comment": initComment,
                    "type": sentiment_type,
                    "negative_score": round(scores[0] * 100, 2),
                    "neutral_score": round(scores[1] * 100, 2),
                    "positive_score": round(scores[2] * 100, 2),
                }
                df_predict.loc[len(df_predict)] = new_row

        # Convert DataFrame to JSON
        json_result = df_predict.to_json(orient="records")

        # Return the result as JSON
        return jsonify({"comments": json.loads(json_result)})

    except Exception as e:
        return (
            jsonify({"error": f"(Comment Analysis Roberta Pagination) {str(e)}"}),
            500,
        )


# from transformers import TFAutoModelForSequenceClassification
# from transformers import AutoTokenizer
# import numpy as np
# from scipy.special import softmax
# import pandas as pd
# from flask import jsonify, request
# from pytube import YouTube
# import re
# from getComments import getComments, getCertainComments
# import json
# from constants import commentCountPerPage
# # Preprocess text (username and link placeholders)
# task = 'sentiment'
# MODEL = f"cardiffnlp/twitter-roberta-base-{task}"

# model_Roberta = TFAutoModelForSequenceClassification.from_pretrained(
#     MODEL, local_files_only=True)
# tokenizer_Roberta = AutoTokenizer.from_pretrained(MODEL, local_files_only=True)


# def preprocess_Roberta(text):
#     new_text = []

#     for t in text.split(" "):
#         t = '@user' if t.startswith('@') and len(t) > 1 else t
#         t = 'http' if t.startswith('http') else t
#         new_text.append(t)
#     return " ".join(new_text)


# def get_Comment_Analysis_Rob():
#     df_predict = pd.DataFrame(
#         columns=['comment', "type", 'negative_score', 'neutral_score', 'positive_score'])
#     try:
#         youtubeLink = request.args.get('youtubeLink')
#         comment = request.args.get('comment')
#         match = re.search(r'\d+', comment)
#         commentCount = 100 if not match else int(match.group())
#         if match:
#             commentCount = int(match.group())
#             print(commentCount)
#         else:
#             print("No number found in the text")
#         video_url = youtubeLink
#         if not video_url:
#             return jsonify({"error": "Video URL is required"}), 400

#         video_id = YouTube(video_url).video_id
#         comments = getComments(video_id, 0, 1, commentCount)
#         # Check if comments is None
#         if comments is None:
#             return jsonify({"error": "Failed to retrieve comments"}), 500
#         comments = comments[:commentCountPerPage]
#         for comment in comments:
#             initComment = comment
#             comment = preprocess_Roberta(comment)
#             if comment and comment != "" and comment != ".":
#                 encoded_input = tokenizer_Roberta(comment, return_tensors='tf')
#                 output = model_Roberta(encoded_input)
#                 scores = output[0][0].numpy()
#                 scores = softmax(scores)
#                 type = np.argmax(np.array(scores))
#                 type = 0 if type == 0 else 4 if type == 2 else 2
#                 new_row = {'comment': initComment, "type": type, 'negative_score': round(
#                     scores[0]*100, 2), 'neutral_score': round(scores[1]*100, 2), 'positive_score': round(scores[2]*100, 2)}

#                 df_predict.loc[len(df_predict)] = new_row

#         # Convert DataFrame to JSON
#         json_result = df_predict.to_json(orient='records')

#         # Load JSON string back to Python object and return as JSON
#         return jsonify({"comments": json.loads(json_result)})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# def get_Comment_Analysis_pagination_Rob(page_number):
#     df_predict = pd.DataFrame(
#         columns=['comment', "type", 'negative_score', 'neutral_score', 'positive_score'])
#     try:
#         page_number = int(page_number)
#         comments = getCertainComments(page_number)
#         # Check if comments is None
#         if comments is None:
#             return jsonify({"error": "Failed to retrieve comments"}), 500

#         for comment in comments:
#             initComment = comment
#             text = preprocess_Roberta(comment)
#             if comment != "" or comment != ".":
#                 encoded_input = tokenizer_Roberta(text, return_tensors='tf')
#                 output = model_Roberta(encoded_input)
#                 scores = output[0][0].numpy()
#                 scores = softmax(scores)
#                 type = np.argmax(np.array(scores))
#                 type = 0 if type == 0 else 4 if type == 2 else 2
#                 new_row = {'comment': initComment, "type": type, 'negative_score': round(
#                     scores[0]*100, 2), 'neutral_score': round(scores[1]*100, 2), 'positive_score': round(scores[2]*100, 2)}

#                 df_predict.loc[len(df_predict)] = new_row

#         # # Convert DataFrame to JSON
#         json_result = df_predict.to_json(orient='records')

#         # Load JSON string back to Python object and return as JSON
#         return jsonify({"comments": json.loads(json_result)})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
