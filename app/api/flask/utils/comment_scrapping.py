from flask import jsonify
from googleapiclient.discovery import build
from apis import YOUTUBE_API
import global_variables
from utils.utils import filter_english_comments
from constants import comment_count_per_page

# Initialize the YouTube API service
youtube = build("youtube", "v3", developerKey=YOUTUBE_API)


def get_comments(video_id, page_count_start, max_results=1000, comments_count=100):
    """
    Fetches comments from a YouTube video, filters them, and returns a list of comments.

    Args:
        video_id (str): The ID of the YouTube video.
        pagecount_start (int): The starting page count for pagination.
        max_results (int): The range of pages to fetch.
        comments_count (int): The maximum number of comments to retrieve.

    Returns:
        list: A list of filtered comments.
    """
    print(f"Scraping comment from the video ID :{video_id} .........\n")
    try:
        global_variables.global_comment_list = []
        page_token = None
        page_count = page_count_start

        while True:
            # Request comments from the YouTube API
            comment_request = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                textFormat="plainText",
                maxResults=max_results,  # Maximum allowed per page
                pageToken=page_token,
            )
            result = comment_request.execute()

            # Process the comments
            for item in result.get("items", []):
                new_comment = item["snippet"]["topLevelComment"]["snippet"][
                    "textDisplay"
                ]
                new_comment = filter_english_comments(new_comment)

                if new_comment and new_comment not in ["", "."]:
                    global_variables.global_comment_list.append(new_comment)

            # Handle pagination
            if (
                "nextPageToken" in result
                and len(global_variables.global_comment_list) < comments_count
            ):
                page_token = result["nextPageToken"]
                page_count += 1
                print(f"Page Count: {page_count}")
            else:
                break

        print(
            f"Sucessfully scraped comment from the video ID :{video_id} ........\nRetrieved {len(global_variables.global_comment_list)} comments"
        )
        return global_variables.global_comment_list

    except Exception as e:
        print(
            f"An error occurred while scraped comment from the video ID {video_id}: {e}"
        )
        return {"error": str(e)}


def get_certain_comments(comment_list: list, page_number: int):
    """
    Retrieves a certain page of comments from the global comment list.

    Args:
        comment_list (list): The list of comments.
        page_number (int): The page number to retrieve.

    Returns:
        list: A list of comments for the specified page.
    """
    if len(comment_list) == 0:
        print(
            f"An error occurred while partitioning comment: No availabe scrapped comments"
        )
        return {"error": "(Get Certain Comments) No availabe scrapped comments"}
    try:
        print("\nTotal available scraped comments " + str(len(comment_list)))
        partition_comment = comment_list[
            (page_number - 1)
            * comment_count_per_page : page_number
            * comment_count_per_page
        ]
        print(
            f"Sucessfully partition comment  ........\nPartition {len(partition_comment)} comments"
        )
        return comment_list[
            (page_number - 1)
            * comment_count_per_page : page_number
            * comment_count_per_page
        ]
    except Exception as e:
        print(f"An error occurred while partitioning comment: {e}")
        return {"error": f"(Get Certain Comments) {str(e)}"}
