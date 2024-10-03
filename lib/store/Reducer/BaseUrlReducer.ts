/** @format */

import { RESET_BASE_URL, SET_BASE_URL } from "./constant";

// Initial State
const initialState: string = "http://127.0.0.1:5000";

// Action Creators
export const setBaseUrl = (url: string) => ({
  type: SET_BASE_URL,
  payload: url,
});

export const resetBaseUrl = () => ({
  type: RESET_BASE_URL,
});

// Reducer Function
const BaseUrlReducer = (
  state: string = initialState,
  action: { type: string; payload?: string },
): string => {
  switch (action.type) {
    case SET_BASE_URL:
      return action.payload!;
    case RESET_BASE_URL:
      return initialState;
    default:
      return state;
  }
};

export default BaseUrlReducer;
