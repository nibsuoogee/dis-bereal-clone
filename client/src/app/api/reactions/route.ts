import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

const routeName = "reactions";
const routePath = "/api/reactions";

export async function POST(request: NextRequest) {
  const body = await request.json();
  return postWrapper(routeName, routePath, body);
}
export async function GET(request: NextRequest) {
  return getWrapper(routeName, routePath, request);
}
