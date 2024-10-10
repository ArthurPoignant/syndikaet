// src/app/api/news/[id]/update/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../../db/models/index';
import News from '../../../../../../db/models/news';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const { title, content, author, publishedDate, imageUrl } = await req.json();

    const newsArticle = await News.findByPk(params.id);
    if (!newsArticle) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    newsArticle.title = title || newsArticle.title;
    newsArticle.content = content || newsArticle.content;
    newsArticle.author = author || newsArticle.author;
    newsArticle.publishedDate = publishedDate || newsArticle.publishedDate;
    newsArticle.imageUrl = imageUrl || newsArticle.imageUrl;

    await newsArticle.save();

    return NextResponse.json(newsArticle, { status: 200 });
  } catch (error) {
    console.error('Error updating news article:', error);
    return NextResponse.json({ error: 'Error updating news article' }, { status: 500 });
  }
}
