// src/app/api/news/create/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Artist from '../../../../../db/models/artist';

export async function POST(req: Request) {
  await sequelize.sync();
  try {
    const { name, description, imageUrl } = await req.json();

    const newArtist = await Artist.create({
      name,
      description,
      imageUrl,
    });

    return NextResponse.json(newArtist, { status: 201 });
  } catch (error) {
    console.error('Error creating artist:', error);
    return NextResponse.json({ error: 'Error creating artist' }, { status: 500 });
  }
}
