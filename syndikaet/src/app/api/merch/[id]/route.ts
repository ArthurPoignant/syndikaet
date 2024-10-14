import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Merch from '../../../../../db/models/merch';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const merchItem = await Merch.findByPk(params.id);
    if (!merchItem) {
      return NextResponse.json({ error: 'Merch item not found' }, { status: 404 });
    }
    return NextResponse.json(merchItem, { status: 200 });
  } catch (error) {
    console.error('Error fetching merch item:', error);
    return NextResponse.json({ error: 'Error fetching merch item' }, { status: 500 });
  }
}