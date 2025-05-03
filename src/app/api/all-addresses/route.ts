/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/dbConnect";
import Address from "@/models/address.model";

export async function GET(req: NextRequest) {
  await dbConnect();

  const addresses = await Address.find({});
  if (!addresses) {
    return NextResponse.json(
      { message: "Find all addresses" },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "Address created succefully", addresses },
    { status: 200 }
  );
}
