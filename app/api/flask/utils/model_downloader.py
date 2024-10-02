import os
import gdown


class Download:
    """This class helps to download files from Google Drive using gdown."""

    def __init__(self):
        pass

    def download_file_from_google_drive(self, url, destination):
        """Download file from Google Drive using gdown.

        Arguments:
            url {string} -- Full download URL from Google Drive.
            destination {string} -- Destination path where the file will be saved.
        """
        try:
            # Use gdown to download the file directly
            print(f"Downloading {url} to {destination}")
            gdown.download(url, destination, quiet=False)
        except Exception as e:
            print(f"Unexpected error occurred while downloading file from {url}: {e}")


def download_model_tokenizer(file_urls: dict[str, str]):
    """
    Download model and tokenizer files from Google Drive.

    Arguments:
        file_urls {dict[str, str]} -- Dictionary containing filenames as keys and their corresponding Google Drive URLs as values.

    Returns:
        None
    """
    # Instantiate the Download class
    downloader = Download()

    # Specify your download directory
    download_dir = "./app/api/flask/downloaded_files/"

    try:
        # Ensure the download directory exists
        os.makedirs(download_dir, exist_ok=True)
    except (OSError, IOError) as e:
        print(f"Error creating download directory {download_dir}: {e}")
        return

    # Download each file
    for filename, url in file_urls.items():
        try:
            destination_path = os.path.join(download_dir, filename)
            if os.path.exists(destination_path):
                # Check if file already exists to avoid re-downloading
                print(f"\nFile {filename} already downloaded")
            else:
                raise FileNotFoundError

        except FileNotFoundError:
            # Download the file if it does not exist
            print(f"\nDownloading {filename} from {url}")
            try:
                downloader.download_file_from_google_drive(url, destination_path)
            except Exception as e:
                print(f"Failed to download {filename}: {e}")

        except Exception as e:
            print(f"Error checking file {filename}: {e}")
