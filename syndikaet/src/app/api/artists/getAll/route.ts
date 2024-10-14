// src/app/api/news/getAll/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Artist from '../../../../../db/models/artist';

export async function GET() {
  await sequelize.sync();
  try {
    const artists = await Artist.findAll();
    return NextResponse.json(artists, { status: 200 });
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json({ error: 'Error fetching artists' }, { status: 500 });
  }
}
