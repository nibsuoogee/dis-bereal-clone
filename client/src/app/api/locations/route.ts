import { getErrorMessage, reportError } from "@/app/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = null;

    // logic

    return NextResponse.json({ message: "Success message", data });
  } catch (err) {
    const errorDescriptor = "Error in locations route";
    reportError({
      message: errorDescriptor + ": " + getErrorMessage(err),
    });
    return NextResponse.json({ message: errorDescriptor }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    //const { searchParams } = new URL(request.url);
    //const tableName = searchParams.get("parameterName") as string;
    //const { key } = await request.json();
    const data = null;

    // logic

    return NextResponse.json({ message: "Success message", data });
  } catch (err) {
    const errorDescriptor = "Error in locations route";
    reportError({
      message: errorDescriptor + ": " + getErrorMessage(err),
    });
    return NextResponse.json({ message: errorDescriptor }, { status: 500 });
  }
}
