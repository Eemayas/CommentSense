import re
from nltk.corpus import stopwords
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.stem import PorterStemmer
from constants import contractions, words_to_remove
from utils.utils import filter_english_comments, remove_emojis, remove_tags

nltk.download("punkt")
nltk.download("stopwords")


def preprocessing(text):
    text = str(text)
    # Convert to lowercase
    text = text.lower()

    # Remove html tags
    text = remove_tags(text)

    # Substitute 'n't' with 'not'
    text = re.sub(r"n't", "not", text)

    # Remove punctuations and numbers
    text = re.sub("[^a-zA-Z]", " ", text)

    # Single character removal
    # When we remove apostrophe from the word "Mark's", the apostrophe is replaced by an empty space. Hence, we are left with single character "s" that we are removing here.
    text = re.sub(r"\s+[a-zA-Z]\s+", " ", text)

    # Remove multiple spaces
    # Next, we remove all the single characters and replace it by a space which creates multiple spaces in our text. Finally, we remove the multiple spaces from our text as well.
    text = re.sub(r"\s+", " ", text)

    # Remove Stopwords
    pattern = re.compile(r"\b(" + r"|".join(stopwords.words("english")) + r")\b\s*")
    text = pattern.sub("", text)

    return text


def preprocessing_RNN(text):
    text = str(text)
    # Convert to lowercase
    text = text.lower()

    # Remove html tags
    text = remove_tags(text)

    # Substitute 'n't' with 'not'
    text = re.sub(r"n't", "not", text)

    # Remove punctuations and numbers
    text = re.sub("[^a-zA-Z]", " ", text)

    # Single character removal
    # When we remove apostrophe from the word "Mark's", the apostrophe is replaced by an empty space. Hence, we are left with single character "s" that we are removing here.
    text = re.sub(r"\s+[a-zA-Z]\s+", " ", text)

    # Remove multiple spaces
    # Next, we remove all the single characters and replace it by a space which creates multiple spaces in our text. Finally, we remove the multiple spaces from our text as well.
    text = re.sub(r"\s+", " ", text)

    # Remove Stopwords
    # Get the default English stopwords from NLTK
    stop_words = set(stopwords.words("english"))
    # Remove the specified words from the default stopwords
    stop_words = [word for word in stop_words if word not in words_to_remove]

    pattern = re.compile(r"\b(" + r"|".join(stop_words) + r")\b\s*")
    text = pattern.sub("", text)
    # Tokenization
    tokens = nltk.word_tokenize(text)

    lemmatizer = WordNetLemmatizer()
    stemmer = PorterStemmer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    tokens = [stemmer.stem(word) for word in tokens]
    tokens = [contractions[word] if word in contractions else word for word in tokens]
    for i in range(len(tokens)):
        if tokens[i] == "not" and i < len(tokens) - 1:
            tokens[i + 1] = "not_" + tokens[i + 1]
    tokens = [word for word in tokens if word not in stop_words]
    processed_text = " ".join(tokens)
    return processed_text


def clean_LSTM(text):
    """
    Cleans and preprocesses a given comment for RNN model analysis.

    Steps:
    1. Remove emojis from the text.
    2. Filter out non-English comments.
    3. Perform LSTM-specific preprocessing on the text.

    Args:
        text (str): The input comment or text to be cleaned.

    Returns:
        str: The cleaned and preprocessed text.
    """
    # Step 1: Remove any emojis from the text
    comment_without_emojis = remove_emojis(text)

    # Step 2: Filter out non-English comments (assuming the function keeps only English comments)
    english_comment = filter_english_comments(comment_without_emojis)

    # Step 3: Apply RNN-specific text preprocessing (e.g., tokenization, lowercasing, etc.)
    preprocessed_comment = preprocessing(english_comment)
    return preprocessed_comment


def clean_RNN(text):
    """
    Cleans and preprocesses a given comment for RNN model analysis.

    Steps:
    1. Remove emojis from the text.
    2. Filter out non-English comments.
    3. Perform RNN-specific preprocessing on the text.

    Args:
        text (str): The input comment or text to be cleaned.

    Returns:
        str: The cleaned and preprocessed text.
    """

    # Step 1: Remove any emojis from the text
    comment_without_emojis = remove_emojis(text)

    # Step 2: Filter out non-English comments (assuming the function keeps only English comments)
    english_comment = filter_english_comments(comment_without_emojis)

    # Step 3: Apply RNN-specific text preprocessing (e.g., tokenization, lowercasing, etc.)
    preprocessed_comment = preprocessing_RNN(english_comment)

    return preprocessed_comment
