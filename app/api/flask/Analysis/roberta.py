import json
import pandas as pd
from flask import jsonify

import global_variables

from utils.comment_scrapping import get_certain_comments
from utils.prediction_utils import run_roberta_prediction
from utils.preprocessing import preprocess_Roberta


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
                    global_variables.global_tokenizer_Roberta,
                    global_variables.global_model_Roberta,
                    comment,
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
            comment_list=global_variables.global_comment_list, page_number=page_number
        )

        if comments is None or len(comments) == 0:
            return (
                jsonify(
                    {
                        "error": "(Comment Analysis Roberta Pagination) No comments provided"
                    }
                ),
                400,
            )

        # Process each comment and predict sentiment using run_roberta_prediction
        for comment in comments:
            if not isinstance(comment, str):
                continue

            initComment = comment
            comment = preprocess_Roberta(comment)

            if comment != "" and comment != ".":
                sentiment_type, scores = run_roberta_prediction(
                    global_variables.global_tokenizer_Roberta,
                    global_variables.global_model_Roberta,
                    comment,
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
