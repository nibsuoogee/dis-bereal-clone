import { deleteWrapper, getWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return getWrapper(request);
}

export async function DELETE(request: NextRequest) {
  return deleteWrapper(request);
}