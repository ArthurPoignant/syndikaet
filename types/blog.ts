export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  imageUrl: string;
}

export type NewArticle = Omit<Article, 'id'>;
