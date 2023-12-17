"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  {
    imgUrl: "/assets/images/hero-1.jpg",
    alt: "hero-1",
  },
  {
    imgUrl: "/assets/images/hero-2.jpg",
    alt: "hero-2",
  },
  {
    imgUrl: "/assets/images/hero-3.jpg",
    alt: "hero-3",
  },
  {
    imgUrl: "/assets/images/hero-4.jpg",
    alt: "hero-4",
  },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel my-auto">
      <Image
        className="max-xl:hidden absolute -left-[15%] z-10  bottom-0"
        src={"assets/icons/hand-drawn-arrow.svg"}
        alt="arrow"
        width={175}
        height={175}
      />
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            alt={image.alt}
            src={image.imgUrl}
            width={484}
            height={484}
            className="object-fill rounded-[1rem]"
            key={image.alt}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
