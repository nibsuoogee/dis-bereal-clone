import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return postWrapper(request, await request.text());
}
