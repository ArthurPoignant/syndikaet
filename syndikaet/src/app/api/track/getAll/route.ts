import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Track from '../../../../../db/models/track';

export async function GET() {
  await sequelize.sync();
  try {
    const tracks = await Track.findAll();
    return NextResponse.json(tracks, { status: 200 });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json({ error: 'Error fetching tracks' }, { status: 500 });
  }
}