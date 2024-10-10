// src/app/api/news/create/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import News from '../../../../../db/models/news';

export async function POST(req: Request) {
  await sequelize.sync();
  try {
    const { title, content, author, publishedDate, imageUrl } = await req.json();

    const newArticle = await News.create({
      title,
      content,
      author,
      publishedDate,
      imageUrl,
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json({ error: 'Error creating news article' }, { status: 500 });
  }
}
