// src/app/api/news/[id]/delete/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../../db/models/index';
import Artist from '../../../../../../db/models/artist';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const artist = await Artist.findByPk(params.id);
    if (!artist) {
      return NextResponse.json({ error: 'artist not found' }, { status: 404 });
    }

    await artist.destroy();
    return NextResponse.json({ message: 'artist deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting artist:', error);
    return NextResponse.json({ error: 'Error deleting artist' }, { status: 500 });
  }
}
