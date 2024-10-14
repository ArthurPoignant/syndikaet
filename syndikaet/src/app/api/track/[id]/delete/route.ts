import { NextResponse } from 'next/server';
import sequelize from '../../../../../../db/models/index';
import Track from '../../../../../../db/models/track';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const track = await Track.findByPk(params.id);
    if (!track) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 });
    }

    await track.destroy();
    return NextResponse.json({ message: 'Track deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting Track:', error);
    return NextResponse.json({ error: 'Error deleting Track' }, { status: 500 });
  }
}