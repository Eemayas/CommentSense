"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ProfileDropDown from "@/components/ProfileDropDown";
const navIcons = [
  { src: "/assets/icons/search.svg", alt: "Search" },
  { src: "/assets/icons/black-heart.svg", alt: "Heart" },
  // { src: "/assets/icons/user.svg", alt: "User" },
];

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="w-full ">
      <nav className="nav">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/assets/icons/logo.svg"}
            alt="logo"
            width={27}
            height={27}
          ></Image>
          <p className="nav-logo">
            Comment<span className="text-primary">Sense</span>
          </p>
        </Link>
        <div className=" flex items-center gap-5">
          {navIcons.map((icons) => (
            <Image
              key={icons.alt}
              src={icons.src}
              alt={icons.alt}
              width={28}
              height={27}
              className="object-contain"
            />
          ))}
          {/* <Image
            onClick={() => router.push("./personaldetail")}
            key={navIcons[2].alt}
            src={navIcons[2].src}
            alt={navIcons[2].alt}
            width={28}
            height={27}
            className="object-contain"
          /> */}
          <ProfileDropDown />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
