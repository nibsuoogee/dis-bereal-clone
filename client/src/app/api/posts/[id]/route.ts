import { deleteWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

const routeName = "posts";
const routePath = "/api/posts";

export async function DELETE(request: NextRequest) {
  return deleteWrapper(routeName, request);
}
