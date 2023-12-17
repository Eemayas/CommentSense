from flask import Flask, request, jsonify
from test import data
from flask_cors import CORS
from getComments import get_Comment_try
from Analysis.LSTM import get_Comment_Analysis_LSTM, get_Comment_Analysis_pagination_part_2_LSTM
from Analysis.GRU import get_Comment_Analysis_GRU,  get_Comment_Analysis_pagination_part_2_GRU
from Analysis.roberta import get_Comment_Analysis_Rob, get_Comment_Analysis_pagination_Rob
from Analysis.RNN import get_Comment_Analysis_RNN, get_Comment_Analysis_pagination_RNN
from Analysis.singleComment import single_comment_analysis


app = Flask(__name__)
CORS(app)

model = "LSTM"


@app.route("/test", methods=['GET'])
def test_endpoint():
    youtubeLink = request.args.get('youtubeLink')
    comment = request.args.get('comment')
    model = request.args.get('model')
    pageNumber = request.args.get('pageNumber')
    return jsonify({'youtubeLink': youtubeLink,
                    "comment": comment,
                    "model": model,
                    "pageNumber": pageNumber,
                    "data": data})


@app.route('/get_comments', methods=['GET'])
def get_comments():
    return get_Comment_try()


@app.route('/get_comments_analysis', methods=['GET'])
def get_comments_Analysis():
    global model
    model = request.args.get('model')
    pageNumber = request.args.get('pageNumber')
    print(model)
    # return get_Comment_Analysis_pagination_LSTM(pageNumber)
    if (model == "LSTM"):
        return get_Comment_Analysis_LSTM()
    if (model == "RNN"):
        return get_Comment_Analysis_RNN()
    if (model == "Roberta"):
        return get_Comment_Analysis_Rob()
    else:
        return get_Comment_Analysis_GRU()


@app.route('/get_comments_analysis_pagination', methods=['GET'])
def get_comments_Analysis_pagination():
    pageNumber = request.args.get('pageNumber')
    if (model == "LSTM"):
        return get_Comment_Analysis_pagination_part_2_LSTM(pageNumber)
    if (model == "RNN"):
        return get_Comment_Analysis_pagination_RNN(pageNumber)
    if (model == "Roberta"):
        return get_Comment_Analysis_pagination_Rob(pageNumber)
    else:
        return get_Comment_Analysis_pagination_part_2_GRU(pageNumber)


@app.route('/predict/text', methods=['GET'])
def predict_endpoint():
    return single_comment_analysis()


@app.route('/')
def home_endpoint():
    return "Welcome"


@app.route('/flask')
def homes_endpoint():
    return "Welcome"


if __name__ == '_main_':
    app.run(debug=True)
