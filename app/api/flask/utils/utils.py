import re

from langdetect import detect, detect_langs


def remove_emojis(text):
    """
    Removes emojis from the input text.

    Args:
        text (str): Input text containing emojis.

    Returns:
        str: Text without emojis.
    """
    # Define a regular expression pattern to match emojis
    emoji_pattern = re.compile(
        "["
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
        "]+",
        flags=re.UNICODE,
    )

    # Use the sub method to remove emojis
    text_no_emojis = emoji_pattern.sub(r"emoji", text)
    return text_no_emojis.encode("utf-8").decode("unicode-escape")


def filter_english_comments(text):
    """
    Filters out non-English comments by detecting the language.

    Args:
        text (str): Input text.

    Returns:
        str: Original comment if it is in English, otherwise an empty string.
    """
    # we ue re module for multi seperator split
    sentences = re.split(r"[.:]", text)
    englishcomments = []
    for sentence in sentences:
        try:
            if detect(sentence) == "en" and detect_langs(sentence)[0].prob >= 0.7:
                englishcomments.append(sentence)
            else:
                englishcomments.append("")
        except:
            pass
    filteredcomment = ".".join(englishcomments)
    return filteredcomment


# Function to map prediction types (e.g., 0 -> negative, 2 -> neutral, 4 -> positive)
def map_sentiment_label(type_value):
    """
    Maps the sentiment label from a numerical value to a descriptive label.

    Args:
        type_value (int): Numerical value representing the sentiment label.

    Returns:
        int: Mapped sentiment label.
    """
    return 0 if type_value == 0 else 4 if type_value == 2 else 2


def remove_tags(text):
    """
    Removes HTML tags from the given text.

    This function uses a regular expression to find and remove any content
    enclosed within HTML tags (i.e., anything between < and >).

    Args:
        text (str): The input string that may contain HTML tags.

    Returns:
        str: The string with HTML tags removed.
    """

    # Regular expression to match anything between opening and closing angle brackets
    TAG_RE = re.compile(r"<[^>]+>")

    # Substitute the matched HTML tags with an empty string
    return TAG_RE.sub("", text)
