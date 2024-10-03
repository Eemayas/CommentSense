import React, { useRef } from "react";
import Image from "next/image";
import { UserDetails } from "../types";

interface ProfileImageUploaderProps {
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  userDetails,
  setUserDetails,
  setIsDisabled,
}) => {
  const imagePickerRef = useRef<HTMLInputElement | null>(null);

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The result will be a base64-encoded string
        const base64String = reader.result as string;
        // Enable form submission
        setIsDisabled(false);
        // Update user details with new image
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          image: base64String,
        }));
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="flex h-64 w-64 justify-center"
      onClick={() => {
        imagePickerRef.current?.click();
      }}
    >
      <input
        type="file"
        ref={imagePickerRef}
        hidden
        accept="image/*" // This allows all image types
        onChange={handleImageUpload}
      />

      <Image
        src={
          userDetails.image
            ? userDetails.image
            : "https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
        alt="Uploaded Image"
        width={200}
        height={200}
        className="absolute mt-2 h-52 w-52 cursor-not-allowed rounded-full object-cover filter transition-all duration-150 hover:grayscale"
        onClick={() => {
          setIsDisabled(false);
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            image: "",
          }));
        }}
      />
      <div className="group mt-2 flex h-52 w-52 cursor-pointer items-center justify-center rounded-full opacity-60 transition duration-500 hover:bg-gray-200">
        <Image
          src="https://www.svgrepo.com/show/33565/upload.svg"
          className="hidden w-12 group-hover:block"
          alt="Uploaded Image Sign"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default ProfileImageUploader;
