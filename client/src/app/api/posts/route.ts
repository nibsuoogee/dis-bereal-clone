import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { getErrorMessage } from "@/app/utils/logger";
import { NextRequest, NextResponse } from "next/server";
import { DBPayload, Post } from "../../../../types";

export async function POST(request: NextRequest) {
  try {
    const payload: DBPayload = await request.json();
    const post = payload.obj as Post;

    if (!post.video) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    return postWrapper(request, payload);
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
