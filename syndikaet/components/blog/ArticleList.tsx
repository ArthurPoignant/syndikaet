import React from "react";
import ArticleItem from "./ArticleItem";
import { Article } from "../../../types/blog";

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-0 border-gray-300 rounded">
      {articles.length > 0 ? (
        articles.map((article) => (
          <ArticleItem
            key={article.id}
            article={article}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="text-center flex justify-center items-center text-gray-500 my-8 min-h-96">No articles available</p>
      )}
    </div>
  );
};

export default ArticleList;
