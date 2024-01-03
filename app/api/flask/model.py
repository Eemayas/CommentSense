from keras.models import load_model,Model
from keras.preprocessing.text import Tokenizer
import json
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import tokenizer_from_json
import pickle

# Load Keras model
lstm = load_model('app/api/flask/sentimentmodel.h5')
rnn = load_model('app/api/flask/85.59%RNN_Model.h5')
#gru = load_model('app/api/flask/GRU_sentimentmodel.h5')
gru = load_model('app/api/flask/GRU_sentimentmodel.12.7.023.h5')
# rnn = load_model('app/api/flask/rnnmodel.h5')



tokenizer=Tokenizer()
with open('app/api/flask/tokenizer.pkl', 'rb') as tokenizer_file:
# with open('tokenizer.pkl', 'rb') as tokenizer_file:
    tokenizer = pickle.load(tokenizer_file)
    # tokenizer_RNN= pickle.load(tokenizer_file)
tokenizer_RNN=Tokenizer()
with open('app/api/flask/RNNtokenizer.pkl', 'rb') as tokenizer_file_RNN:
# with open('tokenizer.pkl', 'rb') as tokenizer_file:
    tokenizer_RNN= pickle.load(tokenizer_file_RNN)
    # tokenizer_RNN= pickle.load(tokenizer_file)


