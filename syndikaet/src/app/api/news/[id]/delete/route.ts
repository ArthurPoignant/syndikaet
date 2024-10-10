// src/app/api/news/[id]/delete/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../../db/models/index';
import News from '../../../../../../db/models/news';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const newsArticle = await News.findByPk(params.id);
    if (!newsArticle) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    await newsArticle.destroy();
    return NextResponse.json({ message: 'News article deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json({ error: 'Error deleting news article' }, { status: 500 });
  }
}
