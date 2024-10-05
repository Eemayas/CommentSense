/** @format */

"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { ErrorIcon } from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SUCESS_MODAL,
  IS_SHOW_URL_ENTRY,
  SET_BASE_URL,
} from "@/lib/store/Reducer/constant";
import InputField from "./TextField";
import { RootState } from "@/lib/store/Reducer/store";

export const CustomSpinner = () => {
  //To call Spinner:
  // const dispatch = useDispatch();
  // dispatch({
  //   type: IS_SHOW_SPINNER,
  //   payload: false,
  // })
  // dispatch({
  //   type: IS_SHOW_SPINNER,
  //   payload: true,
  // });

  const modalInfos = useSelector((state: RootState) => state.ModalReducer);
  return (
    <>
      <div
        className={`fixed inset-0 z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none ${
          modalInfos.spinner.isShow ? "flex" : "hidden"
        } `}
      >
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          <div className="h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200"></div>
          <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blue-500"></div>
        </div>
      </div>
      <div
        className={`${
          modalInfos.spinner.isShow ? "" : "hidden"
        } fixed inset-0 z-40 bg-black opacity-25`}
      ></div>
    </>
  );
};

export const SucessModal = () => {
  // To call the Sucess Modal
  // const dispatch = useDispatch();

  // dispatch({
  //   type: IS_SHOW_SUCESS_MODAL,
  //   payload: {
  //     isShow: true,
  //     title: "Sucess",
  //     description:
  //       "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
  //   },
  // });

  // dispatch({
  //   type: IS_SHOW_SUCESS_MODAL,
  //   payload: {
  //     isShow: false,
  //     title: "Sucess",
  //     description:
  //       "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
  //   },
  // });

  const dispatch = useDispatch();
  const modalInfos = useSelector((state: RootState) => state.ModalReducer);
  return (
    <>
      <div
        className={`fixed inset-0 z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none ${
          modalInfos.sucessModal.isShow ? "flex" : "hidden"
        } `}
      >
        <Card
          // isBlurred
          className="absolute left-1/2 top-1/2 flex min-w-[80vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 border-1 border-green-500 p-6 sm:w-[385px] sm:min-w-[40vw]"
          shadow="sm"
        >
          <CardHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-20 w-20 rounded-full bg-[#D1FAE5] text-[#059669]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </CardHeader>
          <CardBody>
            <span className="text-center text-2xl font-medium">
              {modalInfos.sucessModal.title}
            </span>
            <p className="text-center">{modalInfos.sucessModal.description}</p>
          </CardBody>
          <CardFooter className="justify-end">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onClick={() => {
                dispatch({
                  type: IS_SHOW_SUCESS_MODAL,
                  payload: {
                    isShow: false,
                    title: "Sucess",
                    description:
                      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
                  },
                });
              }}
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div
        className={`${
          modalInfos.sucessModal.isShow ? "" : "hidden"
        } fixed inset-0 z-40 bg-black opacity-25`}
      ></div>
    </>
  );
};

export const ErrorModal = () => {
  // To call the Error Modal
  // const dispatch = useDispatch();

  // dispatch({
  //   type: IS_SHOW_ERROR_MODAL,
  //   payload: {
  //     isShow: true,
  //     title: "Error",
  //     description:
  //       "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
  //   },
  // });

  // dispatch({
  //   type: IS_SHOW_ERROR_MODAL,
  //   payload: {
  //     isShow: false,
  //     title: "Error",
  //     description:
  //       "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
  //   },
  // });

  const dispatch = useDispatch();
  const modalInfos = useSelector((state: RootState) => state.ModalReducer);
  return (
    <>
      <div
        className={`fixed inset-0 z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none ${
          modalInfos.errorModal.isShow ? "flex" : "hidden"
        } `}
      >
        <Card
          // isBlurred
          className="absolute left-1/2 top-1/2 flex min-w-[80vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 border-1 border-red-500 p-6 sm:w-[385px] sm:min-w-[40vw]"
          shadow="sm"
        >
          <CardHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <ErrorIcon className="h-16 w-16 text-red-600" />
            </div>
          </CardHeader>
          <CardBody>
            <span className="text-center text-2xl font-medium">
              {modalInfos.errorModal.title}
            </span>
            <p className="text-center">{modalInfos.errorModal.description}</p>
          </CardBody>
          <CardFooter className="justify-end">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onClick={() => {
                dispatch({
                  type: IS_SHOW_ERROR_MODAL,
                  payload: {
                    isShow: false,
                    title: "Error",
                    description:
                      "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
                  },
                });
              }}
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div
        className={`${
          modalInfos.sucessModal.isShow ? "" : "hidden"
        } fixed inset-0 z-40 bg-black opacity-25`}
      ></div>
    </>
  );
};

export const BaseUrlEntryModal = () => {
  const dispatch = useDispatch();
  const modalInfos = useSelector((state: RootState) => state.ModalReducer);
  const [userInput, setUserInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    // Dispatch your action to close the modal and send the input
    console.log("User Input: ", userInput);

    dispatch({
      type: SET_BASE_URL,
      payload: userInput,
    });
    dispatch({
      type: IS_SHOW_URL_ENTRY,
      payload: false,
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none ${
          modalInfos.urlQuery.isShow ? "flex" : "hidden"
        } `}
      >
        <Card
          // isBlurred
          className="absolute left-1/2 top-1/2 flex min-w-[80vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 border-1 border-red-500 p-6 sm:w-[385px] sm:min-w-[40vw]"
          shadow="sm"
        >
          <CardBody>
            <InputField
              label={"Enter the API URL: "}
              value={userInput}
              onChange={handleInputChange}
              placeholder="www.api-endpoint.com"
            />
          </CardBody>
          <CardFooter className="justify-evenly">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onClick={handleSubmit}
            >
              Set Url
            </Button>
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onClick={() =>
                dispatch({
                  type: IS_SHOW_URL_ENTRY,
                  payload: false,
                })
              }
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div
        className={`${
          modalInfos.sucessModal.isShow ? "" : "hidden"
        } fixed inset-0 z-40 bg-black opacity-25`}
      ></div>

      {/* <div
        className={`fixed inset-0 z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none ${
          modalInfos.urlQuery.isShow ? "flex" : "hidden"
        } `}
      >
        <div
          className={`rounded-[10px] bg-gradient-to-br from-green-400 to-blue-600 p-[2px] text-gray-900 hover:text-white dark:text-white md:w-[30rem]`}
        >
          <div className="relative h-full w-auto max-w-3xl rounded-lg bg-white p-6 dark:bg-black">
            <InputField
              label={"Enter the API URL: "}
              value={userInput}
              onChange={handleInputChange}
              placeholder="www.api-endpoint.com"
            />
            <CardFooter className="justify-end">
              <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={handleSubmit}
              >
                Set Url
              </Button>
              <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={() =>
                  dispatch({
                    type: IS_SHOW_URL_ENTRY,
                    payload: false,
                  })
                }
              >
                Cancel
              </Button>
            </CardFooter>
          </div>
        </div>
      </div> */}
    </>
  );
};
