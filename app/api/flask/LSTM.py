import json
from flask import jsonify, request
from pytube import YouTube
from flask import jsonify
from googleapiclient.discovery import build
import pandas as pd
import numpy as np
from test import data
from getComments import getComments,getCertainComments
import re
from keras.models import Model
from keras.preprocessing.text import Tokenizer
from model import lstm,tokenizer,tokenizer_RNN,rnn
from keras.preprocessing.sequence import pad_sequences
from preprocessing import clean_LSTM,clean_RNN
from flask import request,jsonify,Response
import json
from getComments import commentlist

def get_Comment_Analysis_LSTM():
    df_predict = pd.DataFrame(columns=['comment',"type" ,'negative_score', 'neutral_score', 'positive_score'])
    
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
        comments = getComments(video_id, 0, 1,commentCount)
        # Check if comments is None
        if comments is None:
            return jsonify({"error": "Failed to retrieve comments"}), 500       
        comments = comments[:10]
        for comment in comments:
            comment=clean_LSTM(comment)
            if comment!="":
                sequence=tokenizer.texts_to_sequences([comment])
                padded_sequences = pad_sequences(sequence,padding='post',maxlen=50)
                prediction=lstm.predict(padded_sequences)
                result1=prediction.tolist()
                result=result1[0]
                type=np.argmax(np.array(result))
                type=0 if type==0 else 4 if type==2 else 2
                new_row = {'comment': comment, "type":type,'negative_score': round(result[0]*100, 2), 'neutral_score': round(result[1]*100, 2), 'positive_score': round(result[2]*100, 2)}
                
                df_predict.loc[len(df_predict)] = new_row
        
        # Convert DataFrame to JSON
        json_result = df_predict.to_json(orient='records')

        # Load JSON string back to Python object and return as JSON
        return jsonify({"comments": json.loads(json_result)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def get_Comment_Analysis_pagination_LSTM(page_number):
    df_predict = pd.DataFrame(columns=['comment',"type" ,'negative_score', 'neutral_score', 'positive_score'])
    try:
        if page_number=="1":
            youtubeLink = request.args.get('youtubeLink')
            comment = request.args.get('comment')
            match = re.search(r'\d+', comment)
            commentCount = 100 if not match else int(match.group())
            
            video_url = youtubeLink
            if not video_url:
                return jsonify({"error": "Video URL is required"}), 400

            video_id = YouTube(video_url).video_id
            comments = getComments(video_id, 0, 1,commentCount)
            # Check if comments is None
            if comments is None:
                return jsonify({"error": "Failed to retrieve comments"}), 500
            
        page_number=int(page_number) 
        comments=getCertainComments(page_number) 
        print("get_Comment_Analysis_pagination_LSTM \t"+str(len(comments)))        
        for comment in comments:
            comment=clean_LSTM(comment)
            if comment!="":
                sequence=tokenizer.texts_to_sequences([comment])
                padded_sequences = pad_sequences(sequence,padding='post',maxlen=50)
                prediction=lstm.predict(padded_sequences)
                result1=prediction.tolist()
                result=result1[0]
                type=np.argmax(np.array(result))
                type=0 if type==0 else 4 if type==2 else 2
                new_row = {'comment': comment, "type":type,'negative_score': round(result[0]*100, 2), 'neutral_score': round(result[1]*100, 2), 'positive_score': round(result[2]*100, 2)}
                
                df_predict.loc[len(df_predict)] = new_row

        # Convert DataFrame to JSON
        json_result = df_predict.to_json(orient='records')

        # Load JSON string back to Python object and return as JSON
        return jsonify({"comments": json.loads(json_result)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def get_Comment_Analysis_pagination_part_2_LSTM(page_number):
    df_predict = pd.DataFrame(columns=['comment',"type" ,'negative_score', 'neutral_score', 'positive_score'])
    try:
        page_number=int(page_number) 
        comments=getCertainComments(page_number)     # Check if comments is None
        if comments is None:
            return jsonify({"error": "Failed to retrieve comments"}), 500
        print("get_Comment_Analysis_pagination_LSTM \t"+str(len(comments)))        
        for comment in comments:
            comment=clean_LSTM(comment)
            if comment!="":
                sequence=tokenizer.texts_to_sequences([comment])
                padded_sequences = pad_sequences(sequence,padding='post',maxlen=50)
                prediction=lstm.predict(padded_sequences)
                result1=prediction.tolist()
                result=result1[0]
                type=np.argmax(np.array(result))
                type=0 if type==0 else 4 if type==2 else 2
                new_row = {'comment': comment, "type":type,'negative_score': round(result[0]*100, 2), 'neutral_score': round(result[1]*100, 2), 'positive_score': round(result[2]*100, 2)}
                
                df_predict.loc[len(df_predict)] = new_row

        # Convert DataFrame to JSON
        json_result = df_predict.to_json(orient='records')

        # Load JSON string back to Python object and return as JSON
        return jsonify({"comments": json.loads(json_result)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    