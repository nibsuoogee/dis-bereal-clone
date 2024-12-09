import { getWrapper, postWrapper } from "@/app/api/wrappers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
<<<<<<< HEAD
  const body = await request.json();
  console.log("haloo", request);
  return postWrapper(request, body);
=======
  return postWrapper(request, await request.text());
>>>>>>> main
}

export async function GET(request: NextRequest) {
  return getWrapper(request);
}
