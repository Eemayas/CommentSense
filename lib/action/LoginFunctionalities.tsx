import { signIn } from "next-auth/react";

export const handleGoogleSignIn = () => {
  const callbackUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://comment-sense.vercel.app/";
  signIn("google", { callbackUrl: callbackUrl });
};
export const handleGithubSignIn = () => {
  const callbackUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://comment-sense.vercel.app/";
  signIn("github", { callbackUrl: callbackUrl });
};
