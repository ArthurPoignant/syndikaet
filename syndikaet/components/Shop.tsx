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
      <svg className="w-8 h-8 ml-auto mb-4 border-2 border-black bg-white rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
        {activeSection === "Merch"
          ? products.map((product, index) => (
              <div
                key={index}
                className="bg-black text-white shadow-lg rounded-lg overflow-hidden w-80 mx-auto mb-8"
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
                  <h2 className="text-lg font-semibold text-white mb-2">
                    {product.name}
                  </h2>
                  <p className="text-white mb-4 ml-auto">${product.price}</p>
                  </div>

                  {/* Bouton Ajouter au panier */}
                  <button
                    onClick={() => console.log(product)}
                    className="w-48 bg-pink-300 text-white px-4 py-2 ml-auto rounded-lg hover:bg-blue-400 transition"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))
          : products.map((product, index) => (
              <div
                key={index}
                className="w-full h-32 flex justify-between flex-row bg-gray-700 border border-gray-200"
              >
                <a href="#">
                  <Image
                    className="object-cover w-20 h-full hover:"
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={100}
                  />
                </a>
                <div className="p-5 w-full flex flex-row items-center justify-between">
                  <div>
                    <h5 className="text-lg font-semibold tracking-tight text-white">
                      {product.name}{" "}
                      <p className="text-white text-sm">Track name</p>
                    </h5>
                    <p className="text-white">Duration: 3min46</p>
                  </div>
                  <div className="w-32 flex items-center justify-between">
                    <span className="text-xl font-medium text-white">
                      {product.price}€
                    </span>
                    <a
                      href="#"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
                    >
                      Buy
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
