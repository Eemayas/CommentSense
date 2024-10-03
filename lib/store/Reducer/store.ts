/** @format */

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { combineReducers } from "redux";
import BaseUrlReducer from "./BaseUrlReducer";
import CommentDataReducer from "./commentDataReducer";
import YoutubeLinkReducer from "./youtubeLinkReducer";
import ModalReducer from "./modalReducer";
import SearchPromptReducer from "./searchPromptReducer";
import CommentDataPaginationReducer from "./commentDataPaginationReducer";
import TextReducer from "./textReducer";
const combinedReducers = combineReducers({
  BaseUrlReducer,
  CommentDataReducer,
  ModalReducer,
  YoutubeLinkReducer,
  SearchPromptReducer,
  CommentDataPaginationReducer,
  TextReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

// Get the root state type from the root reducer
export type RootState = ReturnType<typeof combinedReducers>;

export default store;
