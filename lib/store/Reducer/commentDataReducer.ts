import {
  ADD_COMMENT_DATA_SUCCESS,
  FETCH_COMMENT_DATA_SUCCESS,
  RESET_COMMENT_DATA_SUCCESS,
} from "./constant";

const CommentDataReducer = (
  //intialState,
  state = [],
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case FETCH_COMMENT_DATA_SUCCESS:
      // console.log(state, action);
      return action.payload;
    case ADD_COMMENT_DATA_SUCCESS:
      console.log(action.payload);
      console.log();
      const newDatas = [...state, ...action.payload];
      return newDatas;
    case RESET_COMMENT_DATA_SUCCESS:
      return [];
    default:
      return state;
  }
};

export default CommentDataReducer;
