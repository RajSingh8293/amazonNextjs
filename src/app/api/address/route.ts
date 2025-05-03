import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/dbConnect";
import Address from "@/models/address.model";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { userId, fullName, street, city, state, postalCode, country, phone } =
    await req.json();

  if (
    !userId ||
    !fullName ||
    !street ||
    !city ||
    !state ||
    !postalCode ||
    !country ||
    !phone
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const newAddress = await Address.create({
    userId,
    fullName,
    street,
    city,
    state,
    postalCode,
    country,
    phone,
  });

  return NextResponse.json(
    { message: "Address created succefully", addresses: newAddress },
    { status: 200 }
  );
}
