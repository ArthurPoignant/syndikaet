import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Merch from '../../../../../db/models/merch';

export async function GET() {
  await sequelize.sync();
  try {
    const merchItems = await Merch.findAll();
    return NextResponse.json(merchItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching merch items:', error);
    return NextResponse.json({ error: 'Error fetching merch items' }, { status: 500 });
  }
}