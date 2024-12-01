import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { getErrorMessage } from "@/app/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Read the file as a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer()).toString("base64");

    return postWrapper(request, { content: fileBuffer });
  } catch (err) {
    const errorMessage = `Error in /api/posts route: ${getErrorMessage(err)}`;
    reportError({
      message: errorMessage,
    });
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return getWrapper(request);
}
