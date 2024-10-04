"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ProfileDropDown from "@/components/ProfileDropDown";
const navIcons = [
  { src: "/assets/icons/search.svg", alt: "Search" },
  { src: "/assets/icons/black-heart.svg", alt: "Heart" },
];

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/assets/images/CommentSense.png"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="nav-logo">
            {" "}
            Comment<span className="text-primary">Sense</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navIcons.map((icons) => (
            <Image
              key={icons.alt}
              src={icons.src}
              alt={icons.alt}
              height={0}
              width={0}
              style={{ width: "30px", height: "auto" }}
              className="h-auto w-auto object-contain"
            />
          ))}
          <ProfileDropDown />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
