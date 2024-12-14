import { getWrapper, patchWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return getWrapper(request);
}

export async function PATCH(request: NextRequest) {
  return patchWrapper(request, await request.text());
}
