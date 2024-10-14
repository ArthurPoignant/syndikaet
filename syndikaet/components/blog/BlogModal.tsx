import React, { useState, useEffect } from "react";
import { Article, NewArticle } from "../../../types/blog";

interface BlogModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  selectedArticle: Article | null;
  onClose: () => void;
  onSubmit: (article: NewArticle) => void;
}

const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  isEditMode,
  selectedArticle,
  onClose,
  onSubmit,
}) => {
  const [newArticle, setNewArticle] = useState<NewArticle>({
    title: "",
    content: "",
    author: "",
    publishedDate: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (selectedArticle) {
      setNewArticle(selectedArticle);
    } else {
      setNewArticle({
        title: "",
        content: "",
        author: "",
        publishedDate: "",
        imageUrl: "",
      });
    }
  }, [selectedArticle]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newArticle);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">
          {isEditMode ? "Edit Article" : "Add New Article"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          {/* ... (keep the existing form fields) */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {isEditMode ? "Update Article" : "Add Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
