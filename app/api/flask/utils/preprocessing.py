# Helper function to preprocess comments for Roberta
def preprocess_Roberta(text):
    """
    Preprocesses a comment by replacing usernames and URLs with placeholders.

    Args:
        text (str): The original text.

    Returns:
        str: Preprocessed text with placeholders for usernames and URLs.
    """
    new_text = []
    for t in text.split(" "):
        t = "@user" if t.startswith("@") and len(t) > 1 else t
        t = "http" if t.startswith("http") else t
        new_text.append(t)
    return " ".join(new_text)
