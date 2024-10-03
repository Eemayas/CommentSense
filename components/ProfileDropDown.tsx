"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Avatar,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function ProfileDropDown() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            size="sm"
            color="secondary"
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        {session === null ? (
          <>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              disabledKeys={["info"]}
            >
              <DropdownSection aria-label="Preferences" showDivider>
                <DropdownItem key="info" className="h-14 gap-2">
                  <p className="font-semibold">You are cuurently sign out</p>
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="logout" color="danger" href="/login">
                Log In
              </DropdownItem>
            </DropdownMenu>
          </>
        ) : (
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection aria-label="Preferences" showDivider>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="My_Profile" href="./personaldetail">
                My Profile
              </DropdownItem>
              <DropdownItem key="Search_History" href="./personaldetail">
                Search History
              </DropdownItem>
            </DropdownSection>

            <DropdownItem key="Reset_Password" href="./resetpassword">
              Reset Password
            </DropdownItem>
            <DropdownItem key="logout" color="danger" href="/api/auth/signout">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
}
