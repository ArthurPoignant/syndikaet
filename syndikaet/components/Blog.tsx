'use client'
import { useState } from 'react';

interface Article {
    id: number;
    title: string;
    content: string;
}

const articles: Article[] = [
    {
        id: 1,
        title: "Breaking News: Next.js is awesome!",
        content: "Next.js is a powerful React framework for building fast, modern web applications."
    },
    {
        id: 2,
        title: "Tailwind CSS: Utility-First Styling",
        content: "Tailwind CSS is a utility-first CSS framework that makes styling easy and efficient."
    },
    {
        id: 3,
        title: "JavaScript: The Language of the Web",
        content: "JavaScript continues to dominate as the most popular language for web development."
    }
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
        <div className="max-w-4xl mx-auto p-1">
            <h2 className="text-2xl font-bold mb-4">News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="bg-white p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => openArticle(article)}
                    >
                        <h3 className="text-xl font-semibold">{article.title}</h3>
                        <p className="mt-2 text-gray-600">{article.content.substring(0, 50)}...</p>
                    </div>
                ))}
            </div>

            {selectedArticle && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-lg w-full">
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
