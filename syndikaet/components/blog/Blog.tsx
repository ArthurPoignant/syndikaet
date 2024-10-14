"use client";
import { useEffect, useState, useCallback } from "react";
import ArticleList from "./ArticleList";
import BlogModal from "./BlogModal";
import { Article, NewArticle } from "../../../types/blog";

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/news/getAll");
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSubmit = async (newArticle: NewArticle) => {
    const apiUrl = isEditMode
      ? `/api/news/${selectedArticle?.id}/update`
      : "/api/news/create";

    try {
      const res = await fetch(apiUrl, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      if (res.ok) {
        const updatedArticleResponse = await res.json();
        if (isEditMode) {
          setArticles((prev) =>
            prev.map((article) =>
              article.id === updatedArticleResponse.id
                ? updatedArticleResponse
                : article
            )
          );
        } else {
          setArticles((prev) => [...prev, updatedArticleResponse]);
        }
        closeModal();
      } else {
        console.error("Failed to create or update article");
      }
    } catch (error) {
      console.error("Error creating or updating article:", error);
    }
  };

  const handleDelete = useCallback(async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
  
    if (!confirmed) {
      return;
    }
  
    try {
      const res = await fetch(`/api/news/${id}/delete`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setArticles((prev) => prev.filter((article) => article.id !== id));
      } else {
        console.error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  }, []);

  const openEditModal = (article: Article) => {
    setIsEditMode(true);
    setIsModalOpen(true);
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedArticle(null);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">News</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-500"
          onClick={() => setIsModalOpen(true)}
        >
          + Add News
        </button>
      </div>

      <ArticleList
        articles={articles}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <BlogModal
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        selectedArticle={selectedArticle}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BlogPage;