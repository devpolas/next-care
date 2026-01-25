import dbConnect from "@/lib/dbConnect";
import Service from "@/models/services-modal";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

type QueryType = {
  _id?: Types.ObjectId;
  category?: string;
  $or?: { [key: string]: RegExp }[];
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const filter = searchParams.get("filter");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 8);

    console.log(id);

    const skip = (page - 1) * limit;

    const query: QueryType = {};

    if (id) {
      query._id = new Types.ObjectId(id);
    }

    if (filter) {
      const regex = new RegExp(filter, "i");
      query.$or = [
        { category: regex },
        { name: regex },
        { shortDescription: regex },
      ];
    }

    console.log(query);

    const cares = await Service.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    console.log(cares);

    const total = await Service.countDocuments(query);
    const totalPae = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        totalPae,
        page,
        limit,
        cares,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /services error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 },
    );
  }
}
