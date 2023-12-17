from constants import lstm, tokenizer_LSTM
from keras.preprocessing.sequence import pad_sequences
from preprocessing import clean_LSTM, clean_RNN
from flask import request, jsonify, Response


def predict_text_LSTM(text):
    text = clean_LSTM(text)
    sequence = tokenizer_LSTM.texts_to_sequences([text])
    padded_sequences = pad_sequences(sequence, padding='post', maxlen=50)
    prediction = lstm.predict(padded_sequences)
    prediction = prediction.tolist()
    return prediction


def predict_text_RNN(text):
    text = clean_RNN(text)
    # sequence=tokenizer_RNN.texts_to_sequences([text])
    # padded_sequences = pad_sequences(sequence,padding='post',maxlen=50)
    # prediction=rnn.predict(padded_sequences)
    # prediction=prediction.tolist()
    # return prediction
    return text


def predict_text_endpoint():
    data = request.get_json()
    text = data.get('text', '')
    result = predict_text_LSTM(text)
    return jsonify(result[0])


def predict_text_endpoint_RNN():
    data = request.get_json()
    text = data.get('text', '')
    result = predict_text_RNN(text)
    return jsonify(result[0])
