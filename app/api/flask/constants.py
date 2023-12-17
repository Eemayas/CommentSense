from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import tokenizer_from_json
import pickle

commentCountPerPage = 12

# Load Keras model
lstm = load_model('app/api/flask/Model/LSTM_sentimentmodel.h5')
rnn = load_model('app/api/flask/Model/RNN_sentimentmodel.h5')
gru = load_model('app/api/flask/Model/GRU_sentimentmodel.h5')
# rnn = load_model('app/api/flask/rnnmodel.h5')


tokenizer_LSTM = Tokenizer()
with open('app/api/flask/Tokenizer/LSTMtokenizer.pkl', 'rb') as tokenizer_file:
    tokenizer_LSTM = pickle.load(tokenizer_file)

tokenizer_RNN = Tokenizer()
with open('app/api/flask/Tokenizer/RNNtokenizer.pkl', 'rb') as tokenizer_file_RNN:
    tokenizer_RNN = pickle.load(tokenizer_file_RNN)
