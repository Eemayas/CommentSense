"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { GithubIcon, GoogleIcon } from "@/components/Icons";
import Link from "next/link";
import {
  handleGithubSignIn,
  handleGoogleSignIn,
} from "@/lib/action/LoginFunctionalities";

import toast from "react-hot-toast";
import {
  EmailField,
  PasswordField,
  UserNameField,
} from "@/components/TextField";
import { useDispatch } from "react-redux";
import {
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SPINNER,
} from "@/lib/store/Reducer/constant";
import AuthFormWrapper from "@/components/AuthFormBox";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  //TODO: add Error message
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch({
      type: IS_SHOW_SPINNER,
      payload: true,
    });
    try {
      console.log({ email, password, confirmPassword });
      const regex = /^(?=.*\d)(?=.*[a-z]).{8,}$/;

      if (!regex.test(password)) {
        setIsPasswordError(true);
        setPasswordErrorMsg(
          "Password must contain at least 8 characters,at least one lowercase letter ,at least one number",
        );
      } else {
        if (password !== confirmPassword) {
          setIsPasswordError(true);
          setPasswordErrorMsg("Passwords do not match");
        } else {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          });
          const userInfo = await response.json();
          if (userInfo.message) {
            console.log(userInfo);
            toast.error(userInfo.message);
          } else {
            toast.success("User registration Completed");
            router.push("/login");
          }
        }
      }
      dispatch({
        type: IS_SHOW_SPINNER,
        payload: false,
      });
    } catch (error: any) {
      toast.error(error.toString());
      console.log(`Register failed: ${error}`);
      dispatch({
        type: IS_SHOW_ERROR_MODAL,
        payload: {
          isShow: true,
          title: "Registration Error",
          description: error.toString(),
        },
      });
    }

    setIsLoading(false);
  };
  return (
    <AuthFormWrapper>
      <div className="rounded-t-lg bg-white px-6 py-12 md:px-16">
        <p className="text-center text-sm font-bold text-gray-400">
          Sign up with
        </p>
        <div>
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
      </div>
      <div className="rounded-b-lg bg-gray-100 px-6 py-12 md:px-16">
        <p className="text-center text-sm font-bold text-gray-500">
          {" "}
          Or sign up with credentials{" "}
        </p>
        <form className="mt-6" onSubmit={handleRegisterSubmit}>
          <div className="flex flex-col gap-5">
            <UserNameField setUsername={setUsername} username={username} />
            <EmailField
              isEmailError={isEmailError}
              email={email}
              setEmail={setEmail}
            />

            <PasswordField
              errorMessage={""}
              isPasswordError={isPasswordError}
              label="Password"
              password={password}
              setPassword={setPassword}
            />

            <PasswordField
              errorMessage={passwordErrorMsg}
              isPasswordError={isPasswordError}
              label="Confirm Password"
              password={confirmPassword}
              setPassword={setConfirmPassword}
            />
          </div>

          <div className="mt-8 flex items-center justify-center">
            <Button
              type="submit"
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 px-10 text-white shadow-lg"
              isLoading={isLoading}
            >
              {isLoading ? "Creating Account" : "Create Account"}
            </Button>
          </div>
        </form>
        <hr className="mt-2 h-1 w-full bg-gray-500"></hr>
        <p className="mt-12 text-center text-sm font-medium text-gray-500">
          Already have a account?
          <Link className="font-bold text-blue-800 underline" href={"./login"}>
            {"   "}
            Sign In
          </Link>
        </p>
      </div>
    </AuthFormWrapper>
  );
}
