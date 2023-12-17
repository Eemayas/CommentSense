import re
from langdetect import detect, detect_langs
from nltk.corpus import stopwords
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.stem import PorterStemmer
nltk.download('stopwords')

# function to completely remove the emojis from the comments using re


def removeemoji(text):
    # Define a regular expression pattern to match emojis
    emoji_pattern = re.compile("["
                               "\U0001F600-\U0001F64F"  # Emoticons
                               "\U0001F300-\U0001F5FF"  # Symbols & Pictographs
                               "\U0001F680-\U0001F6FF"  # Transport & Map Symbols
                               "\U0001F700-\U0001F77F"  # Alphabetic Presentation Forms
                               "\U0001F780-\U0001F7FF"  # Geometric Shapes Extended
                               "\U0001F800-\U0001F8FF"  # Supplemental Arrows-C
                               "\U0001F900-\U0001F9FF"  # Supplemental Symbols and Pictographs
                               "\U0001FA00-\U0001FA6F"  # Chess Symbols
                               "\U0001FA70-\U0001FAFF"  # Symbols and Pictographs Extended-A
                               "\U0001FB00-\U0001FBFF"  # Symbols for Legacy Computing
                               "\U0001FC00-\U0001FCFF"  # Symbols for Legacy Computing
                               "\U0001FD00-\U0001FDFF"  # Symbols for Legacy Computing
                               "\U0001F700-\U0001F77F"  # Alphabetic Presentation Forms
                               "\U0001FE00-\U0001FEFF"  # Variation Selectors
                               "\U0001FF00-\U0001FFFF"  # Variation Selectors
                               "\U0001F200-\U0001F251"
                               "❤"
                               "❤️"
                               "]+", flags=re.UNICODE)

    # Use the sub method to remove emojis
    text_no_emojis = emoji_pattern.sub(r'', text)
    return text_no_emojis


def filter_english_comments(text):
  # we ue re module for multi seperator split
    sentences = re.split(r'[.:]', text)
    englishcomments = []
    for sentence in sentences:
        try:
            # print(sentence)
            # print(detect(sentence))
            if detect(sentence) == "en" and detect_langs(sentence)[0].prob >= 0.7:
                englishcomments.append(sentence)
            else:
                englishcomments.append("")
        except:
            pass
    filteredcomment = '.'.join(englishcomments)
    return filteredcomment


def remove_tags(text):
    TAG_RE = re.compile(r'<[^>]+>')
    '''Removes HTML tags: replaces anything between opening and closing <> with empty space'''
    return TAG_RE.sub('', text)


def preprocessing(text):
    text = str(text)
    # Convert to lowercase
    text = text.lower()

    # Remove html tags
    text = remove_tags(text)

    # Substitute 'n't' with 'not'
    text = re.sub(r"n't", "not", text)

    # Remove punctuations and numbers
    text = re.sub('[^a-zA-Z]', ' ', text)

    # Single character removal
    # When we remove apostrophe from the word "Mark's", the apostrophe is replaced by an empty space. Hence, we are left with single character "s" that we are removing here.
    text = re.sub(r"\s+[a-zA-Z]\s+", ' ', text)

    # Remove multiple spaces
    # Next, we remove all the single characters and replace it by a space which creates multiple spaces in our text. Finally, we remove the multiple spaces from our text as well.
    text = re.sub(r'\s+', ' ', text)

    # Remove Stopwords
    pattern = re.compile(
        r'\b(' + r'|'.join(stopwords.words('english')) + r')\b\s*')
    text = pattern.sub('', text)

    return text


contractions = {
    "ilove": "i love",
    "ain't": "am not",
    "aren't": "are not",
    "can't": "cannot",
    "could've": "could have",
    "couldn't": "could not",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not",
    "hadn't": "had not",
    "hasn't": "has not",
    "haven't": "have not",
    "he'd": "he would",
    "he'll": "he will",
    "he's": "he is",
    "how'd": "how did",
    "how'll": "how will",
    "how's": "how is",
    "I'd": "I would",
    "I'll": "I will",
    "I'm": "I am",
    "I've": "I have",
    "isn't": "is not",
    "it'd": "it would",
    "it'll": "it will",
    "it's": "it is",
    "let's": "let us",
    "might've": "might have",
    "mightn't": "might not",
    "must've": "must have",
    "mustn't": "must not",
    "needn't": "need not",
    "oughtn't": "ought not",
    "shan't": "shall not",
    "she'd": "she would",
    "she'll": "she will",
    "she's": "she is",
    "should've": "should have",
    "shouldn't": "should not",
    "that's": "that is",
    "there'd": "there would",
    "there'll": "there will",
    "there's": "there is",
    "they'd": "they would",
    "they'll": "they will",
    "they're": "they are",
    "they've": "they have",
    "wasn't": "was not",
    "we'd": "we would",
    "we'll": "we will",
    "we're": "we are",
    "we've": "we have",
    "weren't": "were not",
    "what'll": "what will",
    "what're": "what are",
    "what's": "what is",
    "what've": "what have",
    "where'd": "where did",
    "where's": "where is",
    "who'd": "who would",
    "who'll": "who will",
    "who's": "who is",
    "won't": "will not",
    "would've": "would have",
    "wouldn't": "would not",
    "you'd": "you would",
    "you'll": "you will",
    "you're": "you are",
    "you've": "you have",
    "aren't": "are not",
    "can't": "cannot",
    "couldn't": "could not",
    "didn't": "did not",
    "doesn't": "does not",
    "don't": "do not",
    "hadn't": "had not",
    "hasn't": "has not",
    "haven't": "have not",
    "he'd": "he would",
    "he'll": "he will",
    "he's": "he is",
    "how'd": "how did",
    "how'll": "how will",
    "how's": "how is",
    "I'd": "I would",
    "I'll": "I will",
    "I'm": "I am",
    "I've": "I have",
    "isn't": "is not",
    "it'd": "it would",
    "it'll": "it will",
    "it's": "it is",
    "let's": "let us",
    "might've": "might have",
    "mightn't": "might not",
    "must've": "must have",
    "mustn't": "must not",
    "needn't": "need not",
    "oughtn't": "ought not",
    "shan't": "shall not",
    "she'd": "she would",
    "she'll": "she will",
    "she's": "she is",
    "should've": "should have",
    "shouldn't": "should not",
    "that's": "that is",
    "there'd": "there would",
    "there'll": "there will",
    "there's": "there is",
    "they'd": "they would",
    "they'll": "they will",
    "they're": "they are",
    "they've": "they have",
    "wasn't": "was not",
    "we'd": "we would",
    "we'll": "we will",
    "we're": "we are",
    "we've": "we have",
    "weren't": "were not",
    "what'll": "what will",
    "what're": "what are",
    "what's": "what is",
    "what've": "what have",
    "where'd": "where did",
    "where's": "where is",
    "who'd": "who would",
    "who'll": "who will",
    "who's": "who is",
    "won't": "will not",
    "would've": "would have",
    "wouldn't": "would not",
    "you'd": "you would",
    "you'll": "you will",
    "you're": "you are",
    "you've": "you have",
    "I'd've": "I would have",
    "he'd've": "he would have",
    "it'd've": "it would have",
    "she'd've": "she would have",
    "we'd've": "we would have",
    "they'd've": "they would have",
    "should've": "should have",
    "shouldn't've": "should not have",
    "could've": "could have",
    "couldn't've": "could not have",
    "might've": "might have",
    "mightn't've": "might not have",
    "must've": "must have",
    "mustn't've": "must not have",
    "needn't've": "need not have",
    "oughtn't've": "ought not have",
    "shan't've": "shall not have",
    "won't've": "will not have",
    "would've": "would have",
    "wouldn't've": "would not have",
    "you'd've": "you would have",
    "you'll've": "you will have",
    "you're": "you are",
    "you've": "you have",
    "aint": "am not",
    "arent": "are not",
    "cant": "cannot",
    "couldve": "could have",
    "couldnt": "could not",
    "didnt": "did not",
    "doesnt": "does not",
    "dont": "do not",
    "hadnt": "had not",
    "hasnt": "has not",
    "havent": "have not",
    "hed": "he would",
    "hell": "he will",
    "hes": "he is",
    "howd": "how did",
    "howll": "how will",
    "hows": "how is",
    "Id": "I would",
    "Ill": "I will",
    "Im": "I am",
    "Ive": "I have",
    "isnt": "is not",
    "itd": "it would",
    "itll": "it will",
    "its": "it is",
    "lets": "let us",
    "mightve": "might have",
    "mightnt": "might not",
    "mustve": "must have",
    "mustnt": "must not",
    "neednt": "need not",
    "oughtnt": "ought not",
    "shant": "shall not",
    "shed": "she would",
    "shell": "she will",
    "shes": "she is",
    "shouldve": "should have",
    "shouldnt": "should not",
    "thats": "that is",
    "thered": "there would",
    "therell": "there will",
    "theres": "there is",
    "theyd": "they would",
    "theyll": "they will",
    "theyre": "they are",
    "theyve": "they have",
    "wasnt": "was not",
    "wed": "we would",
    "well": "we will",
    "were": "we are",
    "weve": "we have",
    "werent": "were not",
    "whatll": "what will",
    "whatre": "what are",
    "whats": "what is",
    "whatve": "what have",
    "whered": "where did",
    "wheres": "where is",
    "whod": "who would",
    "wholl": "who will",
    "whos": "who is",
    "wont": "will not",
    "wouldve": "would have",
    "wouldnt": "would not",
    "youd": "you would",
    "youll": "you will",
    "youre": "you are",
    "youve": "you have",
    "arent": "are not",
    "cant": "cannot",
    "couldnt": "could not",
    "didnt": "did not",
    "doesnt": "does not",
    "dont": "do not",
    "hadnt": "had not",
    "hasnt": "has not",
    "havent": "have not",
    "hed": "he would",
    "hell": "he will",
    "hes": "he is",
    "howd": "how did",
    "howll": "how will",
    "hows": "how is",
    "Id": "I would",
    "Ill": "I will",
    "Im": "I am",
    "Ive": "I have",
    "isnt": "is not",
    "itd": "it would",
    "itll": "it will",
    "its": "it is",
    "lets": "let us",
    "mightve": "might have",
    "mightnt": "might not",
    "mustve": "must have",
    "mustnt": "must not",
    "neednt": "need not",
    "oughtnt": "ought not",
    "shant": "shall not",
    "shed": "she would",
    "shell": "she will",
    "shes": "she is",
    "shouldve": "should have",
    "shouldnt": "should not",
    "thats": "that is",
    "thered": "there would",
    "therell": "there will",
    "theres": "there is",
    "theyd": "they would",
    "theyll": "they will",
    "theyre": "they are",
    "theyve": "they have",
    "wasnt": "was not",
    "wed": "we would",
    "well": "we will",
    "were": "we are",
    "weve": "we have",
    "werent": "were not",
    "whatll": "what will",
    "whatre": "what are",
    "whats": "what is",
    "whatve": "what have",
    "whered": "where did",
    "wheres": "where is",
    "whod": "who would",
    "wholl": "who will",
    "whos": "who is",
    "wont": "will not",
    "wouldve": "would have",
    "wouldnt": "would not",
    "youd": "you would",
    "youll": "you will",
    "youre": "you are",
    "youve": "you have",
    "Idve": "I would have",
    "hedve": "he would have",
    "itdve": "it would have",
    "shedve": "she would have",
    "wedve": "we would have",
    "theydve": "they would have",
    "shouldve": "should have",
    "shouldntve": "should not have",
    "couldve": "could have",
    "couldntve": "could not have",
    "mightve": "might have",
    "mightntve": "might not have",
    "mustve": "must have",
    "mustntve": "must not have",
    "needntve": "need not have",
    "oughtntve": "ought not have",
    "shantve": "shall not have",
    "wontve": "will not have",
    "wouldve": "would have",
    "wouldntve": "would not have",
    "youdve": "you would have",
    "youllve": "you will have",
    "youre": "you are",
    "youve": "you have"
}


def preprocessing_RNN(text):
    text = str(text)
    # Convert to lowercase
    text = text.lower()

    # Remove html tags
    text = remove_tags(text)

    # Substitute 'n't' with 'not'
    text = re.sub(r"n't", "not", text)

    # Remove punctuations and numbers
    text = re.sub('[^a-zA-Z]', ' ', text)

    # Single character removal
    # When we remove apostrophe from the word "Mark's", the apostrophe is replaced by an empty space. Hence, we are left with single character "s" that we are removing here.
    text = re.sub(r"\s+[a-zA-Z]\s+", ' ', text)

    # Remove multiple spaces
    # Next, we remove all the single characters and replace it by a space which creates multiple spaces in our text. Finally, we remove the multiple spaces from our text as well.
    text = re.sub(r'\s+', ' ', text)

    # Remove Stopwords
    words_to_remove = ['y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't",
                       'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't",
                       'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't",
                       'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't",
                       'won', "won't", 'wouldn', "wouldn't", "not"]
    # Get the default English stopwords from NLTK
    stop_words = set(stopwords.words('english'))
    # Remove the specified words from the default stopwords
    stop_words = [word for word in stop_words if word not in words_to_remove]

    pattern = re.compile(r'\b(' + r'|'.join(stop_words) + r')\b\s*')
    text = pattern.sub('', text)
    # Tokenization
    tokens = nltk.word_tokenize(text)

    lemmatizer = WordNetLemmatizer()
    stemmer = PorterStemmer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    tokens = [stemmer.stem(word) for word in tokens]
    tokens = [contractions[word]
              if word in contractions else word for word in tokens]
    for i in range(len(tokens)):
        if tokens[i] == 'not' and i < len(tokens) - 1:
            tokens[i + 1] = 'not_' + tokens[i + 1]
    tokens = [word for word in tokens if word not in stop_words]
    processed_text = ' '.join(tokens)
    return processed_text


def clean_LSTM(text):
    sent = removeemoji(text)
    sent = filter_english_comments(sent)
    sent = preprocessing(text)
    # print(sent)
    return sent


def clean_RNN(text):
    sent = removeemoji(text)
    print(f"removeemoji\t {sent}")
    sent = filter_english_comments(sent)
    print(f"filter_english_comments\t {sent}")
    sent = preprocessing_RNN(sent)
    print(f"preprocessing_RNN\t {sent}")
    return sent
