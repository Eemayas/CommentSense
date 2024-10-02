"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { EmailField } from "@/components/TextField";
import { IS_SHOW_ERROR_MODAL } from "@/lib/store/Reducer/constant";
import AuthFormWrapper from "@/components/AuthFormBox";

export default function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

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
  };
  return (
    <AuthFormWrapper>
      <div className="rounded-lg bg-white px-6 py-12 md:px-16">
        <p className="text-center text-sm font-bold text-gray-500">
          Forgot Password?
        </p>
        <form className="mt-6" onSubmit={handleForgotPassword}>
          <div className="flex flex-col gap-2">
            <EmailField
              isEmailError={isEmailError}
              email={email}
              setEmail={setEmail}
            />
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Button
              type="submit"
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 px-10 text-white shadow-lg"
              isLoading={isLoading}
            >
              {isLoading ? "Reseting password..." : "Reset Password"}
            </Button>
          </div>
        </form>
        <hr className="mt-2 h-1 w-full bg-gray-500"></hr>
        <p className="mt-12 text-center text-sm font-medium text-gray-500">
          Remember your password?
          <Link
            className="pl-1 font-bold text-blue-800 underline"
            href={"./login"}
          >
            LogIn here
          </Link>
        </p>
      </div>
    </AuthFormWrapper>
  );
}
