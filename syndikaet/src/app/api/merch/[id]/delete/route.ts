import { NextResponse } from 'next/server';
import sequelize from '../../../../../../db/models/index';
import Merch from '../../../../../../db/models/merch';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await sequelize.sync();
  try {
    const merchItem = await Merch.findByPk(params.id);
    if (!merchItem) {
      return NextResponse.json({ error: 'Merch item not found' }, { status: 404 });
    }

    await merchItem.destroy();
    return NextResponse.json({ message: 'Merch item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting merch item:', error);
    return NextResponse.json({ error: 'Error deleting merch item' }, { status: 500 });
  }
}