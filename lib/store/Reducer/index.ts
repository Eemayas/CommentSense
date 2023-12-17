import { combineReducers } from "redux";
import CommentDataReducer from "./commentDataReducer";
import YoutubeLinkReducer from "./youtubeLinkReducer";
import ModalReducer from "./modalReducer";
import SearchPromptReducer from "./searchPromptReducer";
import CommentDataPaginationReducer from "./commentDataPaginationReducer";
import TextReducer from "./textReducer";
export default combineReducers({
  CommentDataReducer,
  ModalReducer,
  YoutubeLinkReducer,
  SearchPromptReducer,
  CommentDataPaginationReducer,
  TextReducer,
});
