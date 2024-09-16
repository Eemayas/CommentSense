import requests
import os
from tqdm import tqdm


class Download:
    """This class helps to download files from Google Drive"""

    def __init__(self):
        pass

    def download_file_from_google_drive(self, file_id, destination):
        """Download file from Google Drive.

        Arguments:
            file_id {string} -- Unique ID of the file in Google Drive.
            destination {string} -- Destination path where the file will be saved.
        """

        def get_confirm_token(response):
            """Retrieve confirmation token from the response cookies.

            Arguments:
                response {requests.Response} -- Response object from the initial request.

            Returns:
                token {string} -- Confirmation token if present, otherwise None.
            """
            for key, value in response.cookies.items():
                if key.startswith("download_warning"):
                    return value
            return None

        def save_response_content(response, destination):
            """Save the content of the response to a file.

            Arguments:
                response {requests.Response} -- Response object containing the file content.
                destination {string} -- Destination path where the file will be saved.
            """
            CHUNK_SIZE = 32768  # Define chunk size for streaming download
            total_size = int(
                response.headers.get("content-length", 0)
            )  # Get total file size from headers
            with open(destination, "wb") as f, tqdm(
                desc=destination,
                total=total_size,
                unit="B",
                unit_scale=True,
                unit_divisor=1024,
            ) as bar:
                for chunk in response.iter_content(CHUNK_SIZE):
                    if chunk:  # Filter out keep-alive new chunks
                        f.write(chunk)
                        bar.update(len(chunk))

        URL = "https://docs.google.com/uc?export=download"  # Google Drive download URL
        session = requests.Session()  # Create a session object
        response = session.get(
            URL, params={"id": file_id}, stream=True
        )  # Initial request to get the file
        token = get_confirm_token(response)  # Check for confirmation token

        if token:
            # If confirmation token exists, make another request with the token
            params = {"id": file_id, "confirm": token}
            response = session.get(URL, params=params, stream=True)

        # Save the content of the response to the specified destination
        save_response_content(response, destination)


def download_model_tokenizer(file_ids: dict[str, str]):
    # Instantiate the Download class
    downloader = Download()
    # Specify your download directory
    download_dir = "./app/api/flask/downloaded_files/"

    # Ensure the download directory exists
    os.makedirs(download_dir, exist_ok=True)

    # Download each file
    for filename, file_id in file_ids.items():
        try:
            if os.path.exists(os.path.join(download_dir, filename)):
                # Check if file already exists to avoid re-downloading
                print(f"File {filename} already downloaded")
            else:
                raise FileNotFoundError
        except FileNotFoundError:
            # Download the file if it does not exist
            print(f"Downloading {filename} : https://drive.google.com/file/d/{file_id}")
            destination_path = os.path.join(download_dir, filename)
            downloader.download_file_from_google_drive(file_id, destination_path)
