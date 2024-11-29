import { API_CONFIG } from "@/app/config/api";
import { getErrorMessage, reportError } from "@/app/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${API_CONFIG.baseURL}/api/dev`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const { message, data } = await response.json();

    if (response.status !== 200) {
      const errorMessage = message;
      reportError({
        message: errorMessage,
      });
    }

    return NextResponse.json({ data });
  } catch (err) {
    const errorDescriptor = "Error in dev route";
    reportError({
      message: errorDescriptor + ": " + getErrorMessage(err),
    });
    return NextResponse.json({ message: errorDescriptor }, { status: 500 });
  }
}
