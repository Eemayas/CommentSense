/** @format */

// src/store.js

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./index";

const store = createStore(combineReducers, applyMiddleware(thunk));

// Get the root state type from the root reducer
export type RootState = ReturnType<typeof combineReducers>;

export default store;
