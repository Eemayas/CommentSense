// const apiKeys = ["API_KEY_2", "API_KEY_3"]; // Add your API keys here
// let currentApiKeyIndex = 0;

// let nextPageToken = "";

// function extractVideoId(videoUrl: string) {
//   const regExp =
//     /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const match = videoUrl.match(regExp);
//   return match && match[4] ? match[4] : null;
// }
// let pageCount = 0;
// export function fetchComments(videoUrl: string, nextPageToken = "") {
//   const videoId = extractVideoId(videoUrl);
//   if (!videoId) {
//     console.error("Invalid YouTube URL");
//     return;
//   }

//   const apiKey = apiKeys[currentApiKeyIndex];
//   let url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;

//   if (nextPageToken) {
//     url += `&pageToken=${nextPageToken}`;
//   }

//   fetch(url)
//     .then((response) => {
//       if (response.status === 403) {
//         // Switch to the next API key if the current one reaches its quota
//         currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
//         fetchComments(videoUrl, nextPageToken); // Retry with the new API key
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Handle the data here
//       const comments = data.items.map(
//         (item: {
//           snippet: {
//             topLevelComment: {
//               snippet: { authorDisplayName: any; textDisplay: any };
//             };
//           };
//         }) => {
//           return {
//             author: item.snippet.topLevelComment.snippet.authorDisplayName,
//             text: item.snippet.topLevelComment.snippet.textDisplay,
//           };
//         }
//       );

//       // Use the comments data as needed
//       console.log(comments);

//       // Check if there are more pages
//       if (data.nextPageToken && pageCount <= 48) {
//         pageCount += 1;
//         console.log(pageCount);

//         // Fetch the next page
//         fetchComments(videoUrl, data.nextPageToken);
//       }
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }

// // // Call the function with the videoUrl
// // const videoUrl = "YOUR_VIDEO_URL";
// // fetchComments(videoUrl);
