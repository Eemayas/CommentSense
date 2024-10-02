/** @format */

"use client";
import { useState, MouseEvent } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { GithubIcon, GoogleIcon } from "@/components/Icons";
import Link from "next/link";
import {
  handleGithubSignIn,
  handleGoogleSignIn,
} from "../../lib/action/LoginFunctionalities";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { EmailField, PasswordField } from "@/components/TextField";
import {
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SPINNER,
} from "@/lib/store/Reducer/constant";
import AuthFormWrapper from "@/components/AuthFormBox";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  //TODO: add Error message
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch({
      type: IS_SHOW_SPINNER,
      payload: true,
    });
    onOpen();
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.ok) {
        dispatch({
          type: IS_SHOW_SPINNER,
          payload: false,
        });
        toast.success("---Login Sucessful---");
        router.push("./");
      } else {
        toast.error("---Login Failed---");

        dispatch({
          type: IS_SHOW_ERROR_MODAL,
          payload: {
            isShow: true,
            title: "Error",
            description:
              "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,consequatur ",
          },
        });
      }
    } catch (error) {
      console.error(`LoginError:${error}`);
    }
    console.log({ email, password });

    setIsLoading(false);
  };

  return (
    <AuthFormWrapper>
      <div className="rounded-t-lg bg-white px-6 py-12 md:px-16">
        <p className="text-center text-sm font-bold text-gray-400">
          Sign in with
        </p>

        <div className="mt-3 flex items-center justify-center space-x-4">
          <button
            onClick={handleGithubSignIn}
            className="flex transform items-center rounded border border-b border-transparent border-b-black bg-white px-4 py-2 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-black hover:bg-gray-100 hover:text-gray-700 hover:shadow-lg"
          >
            <GithubIcon className="mr-3 h-6 w-6" />
            Github
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="flex transform items-center rounded border border-b border-transparent border-b-black bg-white px-4 py-2 text-sm font-medium uppercase text-indigo-500 shadow-md transition hover:-translate-y-0.5 hover:border-black hover:bg-gray-100 hover:text-gray-700 hover:shadow-lg"
          >
            <GoogleIcon className="mr-3 h-6 w-6" />
            Google
          </button>
        </div>
      </div>
      <div className="rounded-b-lg bg-gray-100 px-6 py-12 md:px-16">
        <p className="text-center text-sm font-bold text-gray-500">
          Or sign in with credentials{" "}
        </p>
        <form className="mt-6" onSubmit={handleLoginSubmit}>
          <div className="flex flex-col gap-5">
            <EmailField
              isEmailError={isEmailError}
              email={email}
              setEmail={setEmail}
            />
            <div className="flex flex-col">
              <PasswordField
                errorMessage={passwordErrorMsg}
                isPasswordError={isPasswordError}
                label="Password"
                password={password}
                setPassword={setPassword}
              />

              <Link
                className="mb-0 mt-2 text-end text-sm font-bold text-blue-800 underline"
                href={"./forgotpassword"}
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Button
              type="submit"
              // onClick={() => setIsLoading(!isLoading)}
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 px-10 text-white shadow-lg"
              isLoading={isLoading}
            >
              {isLoading ? "Loging..." : "Login"}
            </Button>
          </div>
        </form>
        <hr className="mt-2 h-1 w-full bg-gray-500"></hr>
        <p className="mt-12 text-center text-sm font-medium text-gray-500">
          Don't have a account?{" "}
          <Link
            className="font-bold text-blue-800 underline"
            href={"./register"}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthFormWrapper>
  );
}
