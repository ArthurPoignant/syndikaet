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
    <div className="max-w-4xl mx-auto p-6 relative">
      {/* <h2 className="text-3xl font-normal mb-8 text-center">SYNDIKAET ALL-STARS</h2> */}
      <Image
        src={titleSvg}
        alt={titleSvg.name}
        className="w-60 h-30 m-auto mb-5"
        width={100}
        height={100}
        unoptimized={true}
      />
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {artists.map((artist, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col rounded-xl">
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-auto object-cover"
                width={100}
                height={100}
                unoptimized={true}
              />
              <h2 className="absolute text-white left-5 top-5 text-3xl">{artist.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Artists;
