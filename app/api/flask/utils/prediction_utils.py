import numpy as np
from keras.preprocessing.sequence import pad_sequences
from scipy.special import softmax

from utils.utils import map_sentiment_label


# Function to run model prediction for LSTM, GRU, and RNN
def run_model_prediction(tokenizer, model, comment, maxlen):
    """
    Runs a prediction for a given model (LSTM, GRU, RNN).
    Args:
        tokenizer: The tokenizer for the specific model.
        model: The model to use (LSTM, GRU, or RNN).
        comment: The preprocessed comment.
        maxlen: The maximum sequence length for padding.
    Returns:
        Tuple of (sentiment type, sentiment scores list).
    """
    # Tokenize the comment
    sequence = tokenizer.texts_to_sequences([comment])

    # Pad the sequences
    padded_sequences = pad_sequences(sequence, maxlen=maxlen)

    # Make the prediction
    prediction = model.predict(padded_sequences)

    # Convert the prediction scores to a list
    scores = prediction[0].tolist()

    # Get the sentiment type
    sentiment_type = np.argmax(scores)
    sentiment_type = map_sentiment_label(sentiment_type)

    # Return the sentiment type and scores
    return sentiment_type, scores


# Function to run Roberta prediction
def run_roberta_prediction(tokenizer, model, comment):
    """
    Runs a prediction for the Roberta model.
    Args:
        tokenizer: Roberta tokenizer.
        model: Roberta model.
        comment: Preprocessed comment.
    Returns:
        Tuple of (sentiment type, sentiment scores list).
    """
    # Encode the input comment using the tokenizer
    encoded_input = tokenizer(comment, return_tensors="tf")

    # Get the model output for the encoded input
    output = model(encoded_input)

    # Convert the output scores to a numpy array
    scores = output[0][0].numpy()

    # Apply softmax to the scores
    scores = softmax(scores)

    # Get the sentiment type
    sentiment_type = np.argmax(scores)
    sentiment_type = map_sentiment_label(sentiment_type)

    # Return the sentiment type and scores as a list
    return sentiment_type, scores.tolist()
