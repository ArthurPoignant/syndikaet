'use client'

import Image from 'next/image';
import React, { useState } from 'react';

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
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? artists.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6 relative">
            <h2 className="text-3xl font-normal mb-8 text-center">SYNDIKAET ALL-STARS</h2>
            <div className="flex items-center justify-center">
                <button
                    className="absolute left-0 text-3xl text-gray-600 hover:text-gray-800 z-10"
                    onClick={prevSlide}
                >
                    &#10094;
                </button>
                <div className="relative w-full overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {artists.map((artist, index) => (
                            <div key={artist.id} className="min-w-full flex-shrink-0 px-4">
                                <div className={`relative group ${index === currentIndex ? '' : 'blur-sm'}`}>
                                    <div className="overflow-hidden rounded-lg">
                                        <Image
                                            src={artist.imageUrl}
                                            alt={artist.name}
                                            className="w-full h-64 object-cover"
                                            width={100}
                                            height={100}
                                            unoptimized={true}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
                                        <div className="text-white text-center">
                                            <h3 className="text-xl font-bold">{artist.name}</h3>
                                            <p className="mt-2">{artist.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="absolute right-0 text-3xl text-gray-600 hover:text-gray-800 z-10"
                    onClick={nextSlide}
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Artists;
