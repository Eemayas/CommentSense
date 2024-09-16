import re
from flask import Flask, request, jsonify
from test import data
from flask_cors import CORS
from pytube import YouTube
from constants import commentCountPerPage
import global_variables
from Analysis.LSTM import (
    get_Comment_Analysis_LSTM,
    get_Comment_Analysis_pagination_part_2_LSTM,
)
from Analysis.GRU import (
    get_Comment_Analysis_GRU,
    get_Comment_Analysis_pagination_part_2_GRU,
)
from Analysis.roberta import (
    get_Comment_Analysis_Rob,
    get_Comment_Analysis_pagination_Rob,
)
from Analysis.RNN import get_Comment_Analysis_RNN, get_Comment_Analysis_pagination_RNN
from Analysis.singleComment import single_comment_analysis
from utils.comment_scrapping import get_comments


app = Flask(__name__)
CORS(app)

model = "LSTM"


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
    global model
    # Fetch parameters from request args
    model = request.args.get("model")
    pageNumber = request.args.get("pageNumber")
    youtube_link = request.args.get("youtubeLink")
    comment = request.args.get("comment")

    # Check for missing or empty parameters
    if not model:
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

    # return get_Comment_Analysis_pagination_LSTM(pageNumber)
    if model == "LSTM":
        return get_Comment_Analysis_Rob()
        # return get_Comment_Analysis_LSTM()
    if model == "RNN":
        # return get_Comment_Analysis_Rob()
        return get_Comment_Analysis_RNN()
    if model == "Roberta":
        return get_Comment_Analysis_Rob(comments=comments[:commentCountPerPage])
    else:
        return get_Comment_Analysis_RNN()
        # return get_Comment_Analysis_GRU()


@app.route("/get_comments_analysis_pagination", methods=["GET"])
def get_comments_Analysis_pagination():
    page_number = int(request.args.get("page_number"))
    youtube_link = request.args.get("youtube_link")
    if not page_number:
        return jsonify({"error": "page_number parameter is required"}), 400

    if not global_variables.comment_list:
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

    if model == "LSTM":
        return get_Comment_Analysis_pagination_Rob(page_number)
        # return get_Comment_Analysis_pagination_part_2_LSTM(pageNumber)
    if model == "RNN":
        # return get_Comment_Analysis_pagination_Rob(pageNumber)
        return get_Comment_Analysis_pagination_RNN(page_number)
    if model == "Roberta":
        return get_Comment_Analysis_pagination_Rob(page_number)
    else:
        return get_Comment_Analysis_pagination_RNN(page_number)
        # return get_Comment_Analysis_pagination_part_2_GRU(pageNumber)


# Same as below
@app.route("/predict/text", methods=["GET"])
def predict_endpoint():
    return single_comment_analysis()


@app.route("/single-comment-analysis", methods=["GET"])
def single_comment_analysis_endpoint_main():
    return single_comment_analysis()


@app.route("/")
def home_endpoint():
    return "Flask is Up and Running"


@app.route("/flask")
def homes_endpoint():
    return "Welcome"


if __name__ == "__main__":
    app.run(debug=True)
