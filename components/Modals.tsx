/** @format */

"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Buttontype } from "@/types";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ErrorIcon, TickIcon } from "./Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SUCESS_MODAL,
  IS_SHOW_URL_ENTRY,
  SET_BASE_URL,
} from "@/lib/store/Reducer/constant";
import InputField from "./InputField";
import { RootState } from "@/lib/store/Reducer/store";

// type LoginModalProps = {
//   isError: boolean;
//   modelTitle: string;
//   modelDescription: string;
//   buttons: Buttontype[];
//   isOpen: boolean;
//   onOpen: () => void;
//   onOpenChange: () => void;
// };
// const LoginModal = ({
//   isError,
//   modelTitle,
//   buttons,
//   onOpenChange,
// }: LoginModalProps) => {
//   const loginErrorState = useSelector((state: RootState) => state.ModalReducer);
//   return (
//     <>
//       {/* <Button onPress={onOpen}>Open Modal</Button> */}
//       <Modal
//         backdrop="blur"
//         isOpen={loginErrorState !== ""}
//         onOpenChange={onOpenChange}
//         classNames={{
//           backdrop:
//             "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
//         }}
//       >
//         <ModalContent>
//           {(onClose: () => void) => (
//             <>
//               <div
//                 className={`mx-auto flex  h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border-1 ${
//                   isError ? "bg-red-100" : "bg-green-100"
//                 } ${isError ? "border-red-100" : "border-green-100"} mt-4 `}
//               >
//                 {isError ? (
//                   <ExclamationTriangleIcon
//                     className="h-10 w-10 text-red-600"
//                     aria-hidden="true"
//                   />
//                 ) : (
//                   <TickIcon
//                     className="h-10 w-10 text-green-600"
//                     aria-hidden="true"
//                   />
//                 )}
//               </div>
//               <ModalHeader className={`flex flex-col gap-1 items-center `}>
//                 {modelTitle}
//               </ModalHeader>
//               <ModalBody className={`flex flex-col gap-1 items-center `}>
//                 <p>{loginErrorState}</p>
//               </ModalBody>
//               <ModalFooter>
//                 {buttons.map((btn) => (
//                   <Button
//                     color={btn.color}
//                     variant={btn.variant}
//                     onPress={() => {
//                       onClose();
//                       btn.onPress();
//                     }}
//                   >
//                     {btn.buttonLabel}
//                   </Button>
//                 ))}
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
// export default LoginModal;

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
        className={`justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm ${
          modalInfos.spinner.isShow ? "flex" : "hidden"
        } `}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
      <div
        className={`${
          modalInfos.spinner.isShow ? "" : "hidden"
        } opacity-25 fixed inset-0 z-40 bg-black`}
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
        className={`justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm ${
          modalInfos.sucessModal.isShow ? "flex" : "hidden"
        } `}
      >
        <Card
          // isBlurred
          className="border-1 border-green-500 sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] flex flex-col items-center gap-2 -translate-y-1/2 p-6 left-1/2 -translate-x-1/2 absolute top-1/2"
          shadow="sm"
        >
          <CardHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#059669] mx-auto h-20 rounded-full bg-[#D1FAE5] w-20"
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
            <span className="text-2xl text-center font-medium">
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
        } opacity-25 fixed inset-0 z-40 bg-black`}
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
        className={`justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm ${
          modalInfos.errorModal.isShow ? "flex" : "hidden"
        } `}
      >
        <Card
          // isBlurred
          className="border-1 border-red-500 sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] flex flex-col items-center gap-2 -translate-y-1/2 p-6 left-1/2 -translate-x-1/2 absolute top-1/2"
          shadow="sm"
        >
          <CardHeader>
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
              <ErrorIcon className="h-16 w-16 text-red-600" />
            </div>
          </CardHeader>
          <CardBody>
            <span className="text-2xl text-center font-medium">
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
        } opacity-25 fixed inset-0 z-40 bg-black`}
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
        className={`justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm ${
          modalInfos.urlQuery.isShow ? "flex" : "hidden"
        } `}
      >
        <Card
          // isBlurred
          className="border-1 border-red-500 sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] flex flex-col items-center gap-2 -translate-y-1/2 p-6 left-1/2 -translate-x-1/2 absolute top-1/2"
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
        } opacity-25 fixed inset-0 z-40 bg-black`}
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
