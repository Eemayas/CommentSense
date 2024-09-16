from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import tokenizer_from_json
import pickle

commentCountPerPage: int = 12

# Load Keras model
lstm = load_model("app/api/flask/Model/LSTM_sentimentmodel.h5")
rnn = load_model("app/api/flask/Model/RNN_sentimentmodel.h5")
gru = load_model("app/api/flask/Model/GRU_sentimentmodel.h5")
# rnn = load_model('app/api/flask/rnnmodel.h5')

# lstm = load_model("app/api/flask/downloaded_files/LSTM_sentimentmodel.h5")
# rnn = load_model("app/api/flask/downloaded_files/RNN_sentimentmodel.h5")
# gru = load_model("app/api/flask/downloaded_files/GRU_sentimentmodel.h5")


# tokenizer_LSTM = Tokenizer()
# with open("app/api/flask/downloaded_files/LSTMtokenizer.pkl", "rb") as tokenizer_file:
#     tokenizer_LSTM = pickle.load(tokenizer_file)

# tokenizer_RNN = Tokenizer()
# with open(
#     "app/api/flask/downloaded_files/RNNtokenizer.pkl", "rb"
# ) as tokenizer_file_RNN:
#     tokenizer_RNN = pickle.load(tokenizer_file_RNN)


tokenizer_LSTM = Tokenizer()
with open("app/api/flask/Tokenizer/LSTMtokenizer.pkl", "rb") as tokenizer_file:
    tokenizer_LSTM = pickle.load(tokenizer_file)

tokenizer_RNN = Tokenizer()
with open("app/api/flask/Tokenizer/RNNtokenizer.pkl", "rb") as tokenizer_file_RNN:
    tokenizer_RNN = pickle.load(tokenizer_file_RNN)
# Dictionary containing filenames and their corresponding Google Drive file IDs
file_ids = {
    "LSTMtokenizer.pkl": "1cOTPKdFxfoJyUgu_jPHDqftHIR9dk5YU",
    "RNNtokenizer.pkl": "1ZPu4d8MHuB2m2IVapJMj1YuqqDBQmpPf",
    "GRU_sentimentmodel.h5": "1wzYPdydceMAb_Xp0FfD_1X6Veu42kKPw",
    "LSTM_sentimentmodel.h5": "1yd65IwfdnBvLMM6QdZCJNxX82lOKy0D6",
    "RNN_sentimentmodel.h5": "1uCP0MlSYftnIpKV5asSnmnLKmRkJW77o",
    "rnnmodel.h5": "1SvmsIwG9Z62Qokx16yNEJmLeAuR7sTCq",
}
