import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return getWrapper(request);
}
