import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("haloo", request);
  return postWrapper(request, body);
}

export async function GET(request: NextRequest) {
  return getWrapper(request);
}
