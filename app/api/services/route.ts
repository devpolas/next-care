import dbConnect from "@/lib/dbConnect";
import Service from "@/models/services-modal";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

type QueryType = {
  _id?: Types.ObjectId;
  category?: { $in: string[] };
  $or?: { [key: string]: RegExp }[];
};

const CATEGORY_MAP: Record<string, string> = {
  "baby-care": "Baby Care",
  "elderly-care": "Elderly Care",
  "emergency-care": "Emergency Care",
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 8);
    const skip = (page - 1) * limit;

    const query: QueryType = {};

    if (id) {
      query._id = new Types.ObjectId(id);
    }

    if (filter) {
      const categories = filter
        .split(",")
        .map((slug) => CATEGORY_MAP[slug])
        .filter(Boolean);

      if (categories.length > 0) {
        query.category = { $in: categories };
      }
    }

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ name: regex }, { shortDescription: regex }];
    }

    const cares = await Service.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

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
