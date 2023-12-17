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

export default function ProfileDropDown() {
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
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownSection aria-label="Preferences" showDivider>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings" href="./personaldetail">
              My Profile
            </DropdownItem>
            <DropdownItem key="settings" href="./personaldetail">
              Search History
            </DropdownItem>
          </DropdownSection>

          <DropdownItem key="settings" href="./resetpassword">
            Reset Password
          </DropdownItem>

          <DropdownItem key="logout" color="danger" href="/api/auth/signout">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
