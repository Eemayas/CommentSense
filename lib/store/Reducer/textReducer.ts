import { TextDataMap } from "@/types";
import { ADD_TEXT, REMOVE_TEXT } from "./constant";

// Action types
const ADD_COMMENT = "ADD_COMMENT";
const REMOVE_COMMENT = "REMOVE_COMMENT";

// Action creators
const addComment = (commentData: { [key: string]: any }) => ({
  type: ADD_COMMENT,
  payload: commentData,
});

const removeComment = () => ({
  type: REMOVE_COMMENT,
  payload: "",
});

// Initial state
export const textPredictInitialState: TextDataMap = {
  GRU: {
    negative_score: 0,
    neutral_score: 0,
    positive_score: 0,
    type: 2,
  },
  LSTM: {
    negative_score: 0,
    neutral_score: 0,
    positive_score: 0,
    type: 2,
  },
  RNN: {
    negative_score: 0,
    neutral_score: 0,
    positive_score: 0,
    type: 2,
  },
  Roberta: {
    negative_score: 0,
    neutral_score: 0,
    positive_score: 0,
    type: 2,
  },
  comment: "Empty",
};

// Reducer
const TextReducer = (
  state = textPredictInitialState,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case ADD_TEXT:
      return action.payload;

    case REMOVE_TEXT:
      return textPredictInitialState;

    default:
      return state;
  }
};
export default TextReducer;
export { addComment, removeComment };
