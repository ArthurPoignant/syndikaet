"use client";

import { useState } from "react";
import Image from "next/image";

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Aexhy's new EP out!",
    content:
      "We're pleased to announce this release.",
    imageUrl: "/Aexhy.jpeg",
  },
  {
    id: 2,
    title: "Syndikaet and GIB are teaming up",
    content:
      "Tailwind CSS is a utility-first CSS framework that makes styling easy and efficient.",
    imageUrl: "/pico.jpeg",
  },
  {
    id: 3,
    title: "Sonny Smiles releases a new podcast",
    content:
      "JavaScript continues to dominate as the most popular language for web development.",
    imageUrl: "/sonnysmiles.jpg",
  },
];

const Blog: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="marquee">
        <div className="track">
          <div className="content">
            &nbsp;NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS
            NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS NEWS
            NEWS NEWS NEWS
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 ">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white h-29 cursor-pointer flex hover:bg-gray-100 border-b-2 border-black rounded-br-xl"
            onClick={() => openArticle(article)}
          >
            <Image
              src={article.imageUrl}
              alt={article.title}
              className="object-cover w-28 h-28"
              width={160}
              height={160}
              unoptimized={true}
              /* fill */
            />
            <div className="ml-3 flex flex-col justify-around">
              <h3 className="text-xl">{article.title}</h3>
              <p className="mt-2 text-gray-600 font-light">
                {article.content.substring(0, 50)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <Image
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover"
              width={100}
              height={100}
              unoptimized={true}
            />
            <h3 className="text-2xl font-bold mb-4">{selectedArticle.title}</h3>
            <p className="text-gray-700">{selectedArticle.content}</p>
            <button
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={closeArticle}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
