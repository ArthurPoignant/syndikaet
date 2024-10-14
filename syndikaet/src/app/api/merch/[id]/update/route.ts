import { NextResponse } from "next/server";
import sequelize from "../../../../../../db/models/index";
import Merch from "../../../../../../db/models/merch";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await sequelize.sync();
  try {
    const { name, description, price, stock, imageUrl } = await req.json();

    const merchItem = await Merch.findByPk(params.id);
    if (!merchItem) {
      return NextResponse.json(
        { error: "Merch item not found" },
        { status: 404 }
      );
    }

    merchItem.name = name || merchItem.name;
    merchItem.description = description || merchItem.description;
    merchItem.price = price || merchItem.price;
    merchItem.stock = stock || merchItem.stock;
    merchItem.imageUrl = imageUrl || merchItem.imageUrl;

    await merchItem.save();

    return NextResponse.json(merchItem, { status: 200 });
  } catch (error) {
    console.error("Error updating merch item:", error);
    return NextResponse.json(
      { error: "Error updating merch item" },
      { status: 500 }
    );
  }
}