import { YOUTUBE_LINK } from "./constant";

const initialStates = "";

const YoutubeLinkReducer = (
  state = initialStates,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case YOUTUBE_LINK:
      return action.payload;

    default:
      return state;
  }
};

export default YoutubeLinkReducer;
