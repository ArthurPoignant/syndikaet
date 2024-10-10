"use client";
import Image from "next/image";
import { useState } from "react";

const Shop = () => {
  const [activeSection, setActiveSection] = useState("Merch");

  interface Product {
    id: number;
    name: string;
    bio: string;
    imageUrl: string;
    price: number;
  }

  const products: Product[] = [
    {
      id: 1,
      name: "Aexhy",
      bio: "Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art.",
      imageUrl: "/Aexhy.jpeg",
      price: 20,
    },
    {
      id: 2,
      name: "Sonny Smiles",
      bio: "Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.",
      imageUrl: "/SonnySmiles.jpg",
      price: 20,
    },
    {
      id: 3,
      name: "Der Schaffner",
      bio: "Spanish painter, sculptor, printmaker, ceramicist, and theatre designer who spent most of his adult life in France.",
      imageUrl: "/Pico.jpeg",
      price: 20,
    },
  ];

  return (
    <div id="shop" className="flex flex-col min-h-screen bg-gray-100">
      <h1 className="text-xl font-normal text-black sm:text-md mb-6 ml-6 mt-6">
        Shop
      </h1>

      <div className="flex space-x-4 mb-8 mx-auto">
        <a
          className={`px-4 py-2 font-semibold text-lg rounded ${
            activeSection === "Merch" ? "text-blue-400" : "text-black"
          }`}
          onClick={() => setActiveSection("Merch")}
        >
          Merch
        </a>
        <a
          className={`px-4 py-2 font-semibold text-lg rounded ${
            activeSection === "Tracks" ? "text-pink-500" : "text-black"
          }`}
          onClick={() => setActiveSection("Tracks")}
        >
          Tracks
        </a>
      </div>

      <div className="w-full max-w-full p-4 flex flex-wrap justify-around mx-auto">
        <svg
          className="w-8 h-8 ml-auto mb-4 border-2 border-black bg-white rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
        {activeSection === "Merch"
          ? products.map((product, index) => (
              <div
                key={index}
                className="bg-white text-black shadow-lg rounded-lg overflow-hidden w-80 mx-auto mb-8"
              >
                {/* Image de l'article */}
                <div className="relative w-full h-64">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>

                {/* Détails de l'article */}
                <div className="p-4 flex flex-col">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold text-black mb-2">
                      {product.name}
                    </h2>
                    <p className="text-black mb-4 ml-auto">${product.price}</p>
                  </div>

                  {/* Bouton Ajouter au panier */}
                  <button
                    onClick={() => console.log(product)}
                    className="w-12 bg-pink-300 text-white px-4 py-2 ml-auto rounded-lg hover:bg-blue-400 transition"
                  >
                    <svg
                      className="w-4 h-4 fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
                      </svg>
                  </button>
                </div>
              </div>
            ))
          : products.map((product, index) => (
              <div
                key={index}
                className="w-full h-24 flex justify-between flex-row bg-white border border-gray-200"
              >
                <a href="#">
                  <Image
                    className="object-cover w-24 h-full hover:"
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={100}
                  />
                </a>
                <div className="p-5 w-full flex flex-row items-center justify-between">
                  <div>
                    <h5 className="text-lg font-semibold tracking-tight text-black">
                      {product.name}{" "}
                      <p className="text-black text-sm">Track name</p>
                    </h5>
                    <p className="text-black">Duration: 3min46</p>
                  </div>
                  <div className="w-32 flex items-center justify-between">
                    <span className="text-xl font-medium text-black">
                      {product.price}€
                    </span>
                    <a
                      href="#"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
                    >
                      <svg
                      className="w-4 h-4 fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Shop;
