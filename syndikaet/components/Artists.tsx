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
        alt="logo"
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
        <svg className="w-8 h-8 ml-auto mb-4 border-2 border-black bg-white rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
        {artists.map((artist, index) => (
          <SwiperSlide key={index} className="bg-inherit">
            <div className="shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
              <div className="relative w-full h-64">
                <Image
                  src={artist.imageUrl}
                  alt={artist.name}
                  /* width={100}
                  height={100} */
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
