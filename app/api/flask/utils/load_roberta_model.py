import csv
import urllib.request
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer


def load_roberta_model(task="sentiment"):
    """
    Load the Roberta model and tokenizer for a specified task.

    Args:
        task (str): The task for which the model and tokenizer are to be loaded.

    Returns:
        tuple: A tuple containing the tokenizer and model.
    """
    MODEL = f"cardiffnlp/twitter-roberta-base-{task}"

    # Load the tokenizer from local files if available; otherwise, download from Hugging Face
    try:
        tokenizer_Roberta = AutoTokenizer.from_pretrained(MODEL, local_files_only=True)
        model_Roberta = TFAutoModelForSequenceClassification.from_pretrained(
            MODEL, local_files_only=True
        )
    except:
        # If local files are not available, download the tokenizer and model from Hugging Face
        tokenizer = AutoTokenizer.from_pretrained(MODEL)

        # Download label mapping for the task
        labels = []
        mapping_link = f"https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/{task}/mapping.txt"
        with urllib.request.urlopen(mapping_link) as f:
            html = f.read().decode("utf-8").split("\n")
            csvreader = csv.reader(html, delimiter="\t")
        labels = [row[1] for row in csvreader if len(row) > 1]

        # Download the model from Hugging Face
        model = TFAutoModelForSequenceClassification.from_pretrained(MODEL)

        # Save the downloaded model and tokenizer locally for future use
        model.save_pretrained(MODEL)
        tokenizer.save_pretrained(MODEL)

        print("Model and tokenizer downloaded and saved successfully.")

    return model_Roberta, tokenizer_Roberta
