"use client";
import React, { SetStateAction, useState } from "react";
import { Input } from "@nextui-org/react";
import { MailIcon, PasswordIcon } from "./Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
interface UserNameProps {
  username: string;
  setUsername: (value: SetStateAction<string>) => void;
}
export const UserNameField = ({ username, setUsername }: UserNameProps) => {
  const [isValid, setIsValid] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <Input
      isRequired
      type="text"
      label="Name"
      value={username}
      variant="bordered"
      placeholder="Eemayas"
      onChange={handleChange}
      labelPlacement="outside"
      // className="border-1 border-black"
      startContent={
        <FontAwesomeIcon
          icon={faUser}
          className="pointer-events-none flex-shrink-0 text-xl text-default-600"
        />
      }
    />
  );
};

interface EmailProps {
  email: string;
  isEmailError: boolean;
  setEmail: (value: SetStateAction<string>) => void;
}
export const EmailField = ({ email, setEmail, isEmailError }: EmailProps) => {
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValid(validateEmail(inputEmail));
  };
  return (
    <Input
      isRequired
      type="email"
      label="Email"
      value={email}
      errorMessage={
        isValid || isEmailError || !email ? "" : "Please enter a valid email"
      }
      variant="bordered"
      placeholder="you@example.com"
      onChange={handleChange}
      labelPlacement="outside"
      // className="border-1 border-black"
      startContent={
        <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
      }
    />
  );
};

interface PasswordProps {
  password: string;
  label: string;
  errorMessage: string;
  isPasswordError: boolean;
  setPassword: (value: SetStateAction<string>) => void;
}
export const PasswordField = ({
  password,
  label,
  setPassword,
  errorMessage,
  isPasswordError,
}: PasswordProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Input
      isRequired
      variant="bordered"
      type={visible ? "text" : "password"}
      label={label}
      placeholder="*******"
      errorMessage={isPasswordError ? errorMessage : ""}
      labelPlacement="outside"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      startContent={
        <PasswordIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
      }
      endContent={
        <FontAwesomeIcon
          className="text-l cursor-auto"
          onClick={() => setVisible(!visible)}
          icon={visible ? faEye : faEyeSlash}
        />
      }
    />
  );
};

const InputField = ({
  label,
  value,
  onChange,
  errorMessage,
  placeholder = "https://github.com/",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  placeholder?: string;
}) => {
  const inputClassNames = `
  ${
    errorMessage
      ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 darks:text-red-500 darks:placeholder-red-500 darks:border-red-500"
      : "bg-gray-50 border-gray-300 text-text-light placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 darks:text-text-darks darks:placeholder-gray-500 darks:border-gray-600"
  }
  rounded-lg text-sm block w-full p-2.5 darks:bg-gray-700
`;
  return (
    <div>
      <label
        htmlFor="github-repo-link"
        className={`mb-2 block text-sm font-medium ${
          errorMessage
            ? "darks:text-red-500 text-red-700"
            : "text-text-light darks:text-text-darks"
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        id="github-repo-link"
        value={value}
        onChange={onChange}
        className={`border ${
          errorMessage
            ? "darks:border-red-500 darks:text-red-500 darks:placeholder-red-500 border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500"
            : "text-text-light darks:border-gray-600 darks:text-text-darks darks:placeholder-gray-500 border-gray-300 bg-gray-50 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
        } darks:bg-gray-700 block w-full rounded-lg p-2.5 text-sm`}
        placeholder={placeholder}
      />
      {errorMessage && (
        <p className="darks:text-red-500 mt-2 text-sm text-red-600">
          <span className="font-medium">{errorMessage}</span>
        </p>
      )}
    </div>
  );
};
export default InputField;
