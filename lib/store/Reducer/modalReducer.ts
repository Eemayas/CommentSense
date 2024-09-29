/** @format */

import {
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SPINNER,
  IS_SHOW_SUCESS_MODAL,
  IS_SHOW_URL_ENTRY,
} from "./constant";

const initialStates = {
  spinner: { isShow: false },
  urlQuery: { isShow: false },
  sucessModal: {
    isShow: false,
    title: "Sucess",
    description:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
  },
  errorModal: {
    isShow: false,
    title: "Sucess",
    description:
      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
  },
};
// const initialStates = false;

const ModalReducer = (
  state = initialStates,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case IS_SHOW_SPINNER:
      const updatedSpinner = {
        ...initialStates,
        spinner: { isShow: action.payload },
      };
      return updatedSpinner;

    case IS_SHOW_URL_ENTRY:
      const updatedUrlEntry = {
        ...initialStates,
        urlQuery: { isShow: action.payload },
      };
      return updatedUrlEntry;

    case IS_SHOW_SUCESS_MODAL:
      const updatedSucessModal = {
        ...initialStates,
        sucessModal: action.payload,
      };
      return updatedSucessModal;

    case IS_SHOW_ERROR_MODAL:
      console.log("jvgu");
      const updatedErrorModal = {
        ...initialStates,
        errorModal: action.payload,
      };
      return updatedErrorModal;

    default:
      return state;
  }
};

export default ModalReducer;
