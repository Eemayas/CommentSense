/** @format */

import { combineReducers } from "redux";
import BaseUrlReducer from "./BaseUrlReducer";
import CommentDataReducer from "./commentDataReducer";
import YoutubeLinkReducer from "./youtubeLinkReducer";
import ModalReducer from "./modalReducer";
import SearchPromptReducer from "./searchPromptReducer";
import CommentDataPaginationReducer from "./commentDataPaginationReducer";
import TextReducer from "./textReducer";
export default combineReducers({
  BaseUrlReducer,
  CommentDataReducer,
  ModalReducer,
  YoutubeLinkReducer,
  SearchPromptReducer,
  CommentDataPaginationReducer,
  TextReducer,
});
