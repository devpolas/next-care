import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { name, image } = reqBody;
  if (!name || !image) {
    return NextResponse.json(
      { message: "please provide name and image" },
      { status: 400 }
    );
  }

  const formData = new FormData();
  formData.append("image", image);
  formData.append("name", name);

  try {
    const key = process.env.IMGBB_API_KEY;

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${key}`,
      formData,
      { headers: formData.getHeaders() }
    );

    if (!res.data) {
      return NextResponse.json(
        { message: "Failed to upload image" },
        { status: 500 }
      );
    }
    const url = res.data.data.url;
    return NextResponse.json(
      { url, message: "successfully upload image" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
