import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return postWrapper(request, JSON.stringify(body));
}
