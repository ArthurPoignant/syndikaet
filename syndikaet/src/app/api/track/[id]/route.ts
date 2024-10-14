import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Track from '../../../../../db/models/track';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const track = await Track.findByPk(params.id);
    if (!track) {
      return NextResponse.json({ error: 'track not found' }, { status: 404 });
    }
    return NextResponse.json(track, { status: 200 });
  } catch (error) {
    console.error('Error fetching track:', error);
    return NextResponse.json({ error: 'Error fetching track' }, { status: 500 });
  }
}