import {
  deleteWrapper,
  getWrapper,
  postWrapperFormData,
} from "@/app/api/wrappers";
import { NextRequest, NextResponse } from "next/server";

const routeName = "posts";
const routePath = "/api/posts";

export async function POST(request: NextRequest, response: Response) {
  return postWrapperFormData(routeName, routePath, async () => {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Read the file as a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    return { content: fileBuffer.toString("base64") };
  });
}

export async function GET(request: NextRequest) {
  return getWrapper(routeName, routePath, request);
}
