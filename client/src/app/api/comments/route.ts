import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

const routeName = "comments";
const routePath = "/api/comments";

export async function POST(request: NextRequest) {
  return postWrapper(routeName, routePath, request);
}

export async function GET(request: NextRequest) {
  return getWrapper(routeName, routePath, request);
}
