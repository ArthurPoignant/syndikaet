// src/app/api/news/[id]/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import News from '../../../../../db/models/news';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const newsArticle = await News.findByPk(params.id);
    if (!newsArticle) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }
    return NextResponse.json(newsArticle, { status: 200 });
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json({ error: 'Error fetching news article' }, { status: 500 });
  }
}
