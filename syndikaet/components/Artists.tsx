"use client";

import titleSvg from "../public/SYNDIKaeTAll-stars.svg";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Artist {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
}

const artists: Artist[] = [
  {
    id: 1,
    name: "Aexhy",
    bio: "Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art.",
    imageUrl: "/Aexhy.jpeg",
  },
  {
    id: 2,
    name: "Sonny Smiles",
    bio: "Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.",
    imageUrl: "/SonnySmiles.jpg",
  },
  {
    id: 3,
    name: "Der Schaffner",
    bio: "Spanish painter, sculptor, printmaker, ceramicist, and theatre designer who spent most of his adult life in France.",
    imageUrl: "/Pico.jpeg",
  },
];

const Artists: React.FC = () => {
  return (
    <section
      id="all-stars"
      className="w-full flex flex-col h-34 mx-auto mb-12 relative"
    >
      <Image
        src={titleSvg}
        alt={titleSvg.name}
        className="w-60 h-30 m-auto mb-5"
        width={100}
        height={100}
        unoptimized={true}
      />
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper p-5"
      >
        {artists.map((artist, index) => (
          <SwiperSlide key={index} className="bg-inherit">
            <div className="shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
              <div className="relative w-full h-64">
                <Image
                  src={artist.imageUrl}
                  alt={artist.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-black">
                <h2 className="text-xl font-semibold text-white">
                  {artist.name}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Artists;
