// src/app/api/news/[id]/update/route.ts
import { NextResponse } from "next/server";
import sequelize from "../../../../../../db/models/index";
import Artist from "../../../../../../db/models/artist";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await sequelize.sync();
  try {
    const { name, description, imageUrl } = await req.json();

    const artist = await Artist.findByPk(params.id);
    if (!artist) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    artist.name = name || artist.name;
    artist.description = description || artist.description;
    artist.imageUrl = imageUrl || artist.imageUrl;

    await artist.save();

    return NextResponse.json(artist, { status: 200 });
  } catch (error) {
    console.error("Error updating news article:", error);
    return NextResponse.json(
      { error: "Error updating news article" },
      { status: 500 }
    );
  }
}
