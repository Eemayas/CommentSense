"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import Navbar from "@/components/Navbar";
import { useDispatch } from "react-redux";
import ImageUploader from "./components/ProfileImageUploader";
import ProfileForm from "./components/ProfileForm";
import { IS_SHOW_SPINNER } from "@/lib/store/Reducer/constant";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    image: "",
    firstname: "",
    surname: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    country: "",
    education: "",
    dateOfBirth: "",
  });

  // Function to handle form submission
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsLoading(true);
    console.log(userDetails);
    // Dispatch action to show spinner
    dispatch({
      type: IS_SHOW_SPINNER,
      payload: true,
    });

    try {
      // Send POST request to create/update user
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const newUser = await response.json();
      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error posting user data:", error);
    }
    // Hide spinner after request is complete
    dispatch({
      type: IS_SHOW_SPINNER,
      payload: false,
    });
    setIsLoading(false);
  };

  // Function to fetch user data from the API
  const getUserData = async () => {
    // Show spinner while fetching data
    dispatch({
      type: IS_SHOW_SPINNER,
      payload: true,
    });
    try {
      const response = await fetch("/api/user");
      const userData = await response.json();
      // Assuming userData is an array, you might want to handle this based on your API response structure
      if (userData.length > 0) {
        setUserDetails(userData[0]); // Set user details based on the first user (you might adjust this based on your API response)
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    // Hide spinner after data is fetched
    dispatch({
      type: IS_SHOW_SPINNER,
      payload: false,
    });
  };

  // Effect to check session and redirect if not logged in
  useEffect(() => {
    console.log({ session });
    if (session === null) {
      router.push("./login");
    }
  }, [session, router]);

  // Effect to fetch user data when session is available
  useEffect(() => {
    if (session !== null) {
      getUserData();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <Card>
          <CardBody>
            <div className="flex flex-col md:flex-row">
              <div className="border-b-1 md:border-b-0 md:border-r-1">
                <div className="flex flex-col items-center justify-center p-3 py-5 text-center">
                  <ImageUploader
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    setIsDisabled={setIsDisabled}
                  />

                  <span className="font-bold">{userDetails.firstname}</span>
                  <span className="text-black">{userDetails.emailAddress}</span>
                  <span> </span>
                </div>
              </div>
              <ProfileForm
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                setIsDisabled={setIsDisabled}
                isDisabled={isDisabled}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default UserProfile;
