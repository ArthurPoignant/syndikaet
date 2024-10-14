// src/app/api/news/[id]/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Artist from '../../../../../db/models/artist';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const artist = await Artist.findByPk(params.id);
    if (!artist) {
      return NextResponse.json({ error: 'artist not found' }, { status: 404 });
    }
    return NextResponse.json(artist, { status: 200 });
  } catch (error) {
    console.error('Error fetching artist:', error);
    return NextResponse.json({ error: 'Error fetching artist' }, { status: 500 });
  }
}
