import re
import nltk
import pickle
from pytube import YouTube
from flask_cors import CORS
from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from flask import Flask, request, jsonify

import global_variables

from constants import comment_count_per_page, file_ids

from Analysis.LSTM import (
    get_Comment_Analysis_LSTM,
    get_Comment_Analysis_pagination_LSTM,
)
from Analysis.GRU import (
    get_Comment_Analysis_GRU,
    get_Comment_Analysis_pagination_GRU,
)
from Analysis.roberta import (
    get_Comment_Analysis_Rob,
    get_Comment_Analysis_pagination_Rob,
)
from Analysis.RNN import get_Comment_Analysis_RNN, get_Comment_Analysis_pagination_RNN
from Analysis.singleComment import single_comment_analysis

from utils.comment_scrapping import get_comments
from utils.load_roberta_model import load_roberta_model
from utils.model_downloader import download_model_tokenizer


app = Flask(__name__)
CORS(app)


@app.route("/comment_scrape", methods=["GET"])
def comment_scrape_endpoint_main():
    youtube_link = request.args.get("youtubeLink")
    comment_count = request.args.get("commentCount")
    if not youtube_link:
        return jsonify({"error": "YouTube link is required"}), 400
    if not comment_count:
        return jsonify({"error": "Comment count is required"}), 400

    video_id = YouTube(youtube_link).video_id
    comments = get_comments(
        video_id=video_id,
        page_count_start=0,
        max_results=1000,
        comments_count=int(comment_count),
    )

    if isinstance(comments, dict) and comments["error"]:
        return (
            jsonify(
                {
                    "error": f"(Comment Scrape) Failed to retrieve comments: {str(comments['error'])}"
                }
            ),
            500,
        )
    return jsonify(comments)


@app.route("/get_comments_analysis", methods=["GET"])
def get_comments_Analysis():
    # Fetch parameters from request args
    global_variables.global_selected_model = request.args.get("model")
    pageNumber = request.args.get("pageNumber")
    youtube_link = request.args.get("youtubeLink")
    comment = request.args.get("comment")

    # Check for missing or empty parameters
    if not global_variables.global_selected_model:
        return jsonify({"error": "Model parameter is required"}), 400
    if not pageNumber:
        return jsonify({"error": "PageNumber parameter is required"}), 400
    if not youtube_link:
        return jsonify({"error": "YouTube link is required"}), 400
    match = re.search(r"\d+", comment)
    comment_count = 100 if not match else int(match.group())

    # Extract video ID and fetch comments
    video_id = YouTube(youtube_link).video_id
    comments = get_comments(
        video_id=video_id,
        page_count_start=0,
        max_results=1000,
        comments_count=comment_count,
    )

    if isinstance(comments, dict) and comments["error"]:
        return (
            jsonify(
                {
                    "error": f"(Comment Analysis) Failed to retrieve comments: {str(comments['error'])}"
                }
            ),
            500,
        )

    sliced_comments = comments[:comment_count_per_page]

    if global_variables.global_selected_model == "LSTM":
        return get_Comment_Analysis_LSTM(comments=sliced_comments)
    if global_variables.global_selected_model == "RNN":
        return get_Comment_Analysis_RNN(comments=sliced_comments)
    if global_variables.global_selected_model == "Roberta":
        return get_Comment_Analysis_Rob(comments=sliced_comments)
    else:
        return get_Comment_Analysis_GRU(comments=sliced_comments)


@app.route("/get_comments_analysis_pagination", methods=["GET"])
def get_comments_Analysis_pagination():
    page_number = int(request.args.get("page_number"))
    youtube_link = request.args.get("youtube_link")
    if not page_number:
        return jsonify({"error": "page_number parameter is required"}), 400

    if not global_variables.global_comment_list:
        video_id = YouTube(youtube_link).video_id
        comments = get_comments(
            video_id=video_id,
            page_count_start=0,
            max_results=1000,
            comments_count=100,
        )
        if isinstance(comments, dict) and comments["error"]:
            return (
                jsonify(
                    {
                        "error": f"(Comment Analysis Pagination) Failed to retrieve comments: {str(comments['error'])}"
                    }
                ),
                500,
            )

    print(f"\nCurrently analyzing model: {global_variables.global_selected_model}")
    if global_variables.global_selected_model == "LSTM":
        return get_Comment_Analysis_pagination_LSTM(page_number)
    if global_variables.global_selected_model == "RNN":
        return get_Comment_Analysis_pagination_RNN(page_number)
    if global_variables.global_selected_model == "Roberta":
        return get_Comment_Analysis_pagination_Rob(page_number)
    else:
        return get_Comment_Analysis_pagination_GRU(page_number)


@app.route("/single-comment-analysis", methods=["GET"])
def single_comment_analysis_endpoint_main():
    return single_comment_analysis()


@app.route("/")
def home_endpoint():
    return "Flask is Up and Running"


if __name__ == "__main__":
    nltk.download("punkt")
    nltk.download("punkt")
    nltk.download("wordnet")

    download_model_tokenizer(file_ids)

    model_Roberta, tokenizer_Roberta = load_roberta_model()

    global_variables.global_model_Roberta = model_Roberta
    global_variables.global_tokenizer_Roberta = tokenizer_Roberta

    global_variables.global_model_LSTM = load_model(
        "app/api/flask/downloaded_files/LSTM_sentimentmodel.h5"
    )
    global_variables.global_model_RNN = load_model(
        "app/api/flask/downloaded_files/RNN_sentimentmodel.h5"
    )
    global_variables.global_model_GRU = load_model(
        "app/api/flask/downloaded_files/GRU_sentimentmodel.h5"
    )
    global_variables.global_tokenizer_LSTM = Tokenizer()
    with open(
        "app/api/flask/downloaded_files/LSTMtokenizer.pkl", "rb"
    ) as tokenizer_file:
        tokenizer_LSTM = pickle.load(tokenizer_file)

    global_variables.global_tokenizer_RNN = Tokenizer()
    with open(
        "app/api/flask/downloaded_files/RNNtokenizer.pkl", "rb"
    ) as tokenizer_file_RNN:
        tokenizer_RNN = pickle.load(tokenizer_file_RNN)

    app.run(debug=True)
