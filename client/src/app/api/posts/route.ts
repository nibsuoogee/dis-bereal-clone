import { API_CONFIG } from "@/app/config/api";
import { getErrorMessage, reportError } from "@/app/utils/logger";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // logic

    const response = await axios.get(`${API_CONFIG.baseURL}/api/posts`);
    const data = response.data;
    console.log(data);

    if (response.status !== 200) {
      const errorMessage = data.message;
      reportError({
        message: errorMessage,
      });
    }

    return NextResponse.json({ message: "Success message", data });
  } catch (err) {
    const errorMessage = "Error in posts route" + ": " + getErrorMessage(err);
    reportError({
      message: errorMessage,
    });
    return NextResponse.json({ message: errorMessage }, { status: 500 });
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
    const errorDescriptor = "Error in posts route";
    reportError({
      message: errorDescriptor + ": " + getErrorMessage(err),
    });
    return NextResponse.json({ message: errorDescriptor }, { status: 500 });
  }
}
