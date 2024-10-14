// src/app/api/news/create/route.ts
import { NextResponse } from 'next/server';
import sequelize from '../../../../../db/models/index';
import Merch from '../../../../../db/models/merch';

export async function POST(req: Request) {
  await sequelize.sync();
  try {
    const { name, description, price, stock, imageUrl } = await req.json();

    const newMerch = await Merch.create({
      name,
      description,
      price,
      stock,
      imageUrl,
    });

    return NextResponse.json(newMerch, { status: 201 });
  } catch (error) {
    console.error('Error creating merch:', error);
    return NextResponse.json({ error: 'Error creating merch' }, { status: 500 });
  }
}