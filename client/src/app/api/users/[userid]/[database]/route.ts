import { deleteWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  return deleteWrapper(request);
}
