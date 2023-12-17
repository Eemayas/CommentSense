"use client";
import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { EmailField, PasswordField } from "@/components/TextField";
import {
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SUCESS_MODAL,
} from "@/lib/store/Reducer/constant";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Forgot Password");
    e.preventDefault();
    setIsLoading(true);
    dispatch({
      type: IS_SHOW_ERROR_MODAL,
      payload: {
        isShow: true,
        title: "Error",
        description:
          "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
      },
    });
    setIsLoading(false);
  };
  return (
    <main>
      <div className="h-screen items-center justify-center flex  ">
        <div className=" rounded-[16px] bg-slate-800 border border-slate-400 shadow-lg backdrop-blur-sm bg-opacity-30 p-8 mx-auto">
          {" "}
          <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
            <p className="text-center text-sm text-gray-500 font-bold">
              {" "}
              Reset Password?
            </p>
            <form className="mt-6" onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-2">
                <PasswordField
                  errorMessage={passwordErrorMsg}
                  isPasswordError={isPasswordError}
                  label="Old Password"
                  password={oldPassword}
                  setPassword={setOldPassword}
                />
                <PasswordField
                  errorMessage={passwordErrorMsg}
                  isPasswordError={isPasswordError}
                  label="New Password"
                  password={newPassword}
                  setPassword={setNewPassword}
                />
                <PasswordField
                  errorMessage={passwordErrorMsg}
                  isPasswordError={isPasswordError}
                  label=" Confirm Password"
                  password={confirmPassword}
                  setPassword={setConfirmPassword}
                />
              </div>

              <div className="flex items-center justify-center mt-4">
                <Button
                  type="submit"
                  radius="full"
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg px-10"
                  isLoading={isLoading}
                >
                  {isLoading ? "Reseting password..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
