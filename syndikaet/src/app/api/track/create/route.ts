// src/app/api/news/create/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Track from '../../../../../db/models/track';

export async function POST(req: Request) {
  await sequelize.sync();
  try {
    const { title, artist, price, releaseDate, url, cover } = await req.json();

    const newTrack = await Track.create({
      title,
      artist,
      price,
      releaseDate,
      url,
      cover
    });

    return NextResponse.json(newTrack, { status: 201 });
  } catch (error) {
    console.error('Error creating merch:', error);
    return NextResponse.json({ error: 'Error creating merch' }, { status: 500 });
  }
}