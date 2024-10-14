import { NextResponse } from "next/server";
import sequelize from "../../../../../../db/models/index";
import Track from "../../../../../../db/models/track";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await sequelize.sync();
  try {
    const { name, description, price, stock, imageUrl } = await req.json();

    const track = await Track.findByPk(params.id);
    if (!track) {
      return NextResponse.json(
        { error: "Merch item not found" },
        { status: 404 }
      );
    }

    track.title = name || track.title;
    track.price = price || track.price;
    track.url = imageUrl || track.url;

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
