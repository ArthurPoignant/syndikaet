// src/app/api/news/getAll/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import News from '../../../../../db/models/news';

export async function GET() {
  await sequelize.sync();
  try {
    const news = await News.findAll();
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json({ error: 'Error fetching news articles' }, { status: 500 });
  }
}
