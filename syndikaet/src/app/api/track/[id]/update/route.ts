import { NextResponse } from "next/server";
import sequelize from "../../../../../../db/models/index";
import Track from "../../../../../../db/models/track";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await sequelize.sync();
  try {
    const { title, artist, price, releaseDate, url, cover } = await req.json();

    const track = await Track.findByPk(params.id);
    if (!track) {
      return NextResponse.json(
        { error: "Merch item not found" },
        { status: 404 }
      );
    }

    track.title = title || track.title;
    track.artist = artist || track.artist;
    track.price = price || track.price;
    track.url = url || track.url;
    track.releaseDate = releaseDate || track.releaseDate;
    track.cover = cover || track.cover;

    await track.save();

    return NextResponse.json(track, { status: 200 });
  } catch (error) {
    console.error("Error updating merch item:", error);
    return NextResponse.json(
      { error: "Error updating merch item" },
      { status: 500 }
    );
  }
}
