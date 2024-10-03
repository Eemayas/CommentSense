import React from "react";
import { Input, Button } from "@nextui-org/react";
import { UserDetails } from "../types";

interface ProfileFormProps {
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  isLoading: boolean;
  handleSubmit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  userDetails,
  setUserDetails,
  setIsDisabled,
  isDisabled,
  isLoading,
  handleSubmit,
}) => {
  const handleInputChange =
    (field: keyof UserDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsDisabled(false);
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="flex flex-col gap-5 border-b-1 p-3 py-5 md:border-b-0 md:border-r-1">
      <div className="mb-3 flex items-center justify-between text-right font-bold underline">
        Profile Settings
      </div>
      <div className="mt-2 flex flex-row space-x-5">
        <Input
          type="text"
          label="Name"
          labelPlacement="outside"
          placeholder="FirstName"
          onChange={handleInputChange("firstname")}
          value={userDetails.firstname}
        />
        <Input
          type="text"
          label="Surname"
          labelPlacement="outside"
          placeholder="Surname"
          onChange={handleInputChange("surname")}
          value={userDetails.surname}
        />
      </div>
      <Input
        type="email"
        label="Email Address"
        labelPlacement="outside"
        placeholder="email@example.com"
        onChange={handleInputChange("emailAddress")}
        value={userDetails.emailAddress}
      />
      <Input
        type="tel"
        label="Phone Number"
        labelPlacement="outside"
        placeholder="9800000000"
        onChange={handleInputChange("phoneNumber")}
        value={userDetails.phoneNumber}
      />
      <Input
        type="text"
        label="Address"
        labelPlacement="outside"
        placeholder="Banepa,Kavre"
        onChange={handleInputChange("address")}
        value={userDetails.address}
      />
      <Input
        type="text"
        label="Country"
        labelPlacement="outside"
        placeholder="Nepal"
        onChange={handleInputChange("country")}
        value={userDetails.country}
      />
      <Input
        type="date"
        label="Date of Birth"
        labelPlacement="outside"
        onChange={handleInputChange("dateOfBirth")}
        value={userDetails.dateOfBirth}
      />
      <Input
        type="text"
        label="Education"
        labelPlacement="outside"
        placeholder="Master's Degree"
        onChange={handleInputChange("education")}
        value={userDetails.education}
      />
      <Button
        isDisabled={isDisabled}
        color="secondary"
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileForm;
