import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

const routeName = "dev";
const routePath = "/api/dev";

export async function POST(request: NextRequest) {
  return postWrapper(routeName, routePath, request);
}

export async function GET(request: NextRequest) {
  return getWrapper(routeName, routePath, request);
}
