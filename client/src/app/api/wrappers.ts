import { API_CONFIG } from "@/app/config/api";
import { getErrorMessage, reportError } from "@/app/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function postWrapper(
  routeName: string,
  routePath: string,
  body: any,
  operation?: () => Promise<any>
) {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}${routePath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const { message, data } = await response.json();

    if (response.status !== 200) {
      reportError({
        message: message,
      });
    }

    return NextResponse.json({ message, data }, { status: response.status });
  } catch (err) {
    const errorMessage = `Error in ${routeName} route: ${getErrorMessage(err)}`;
    reportError({
      message: errorMessage,
    });
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function postWrapperFormData(
  routeName: string,
  routePath: string,
  operation: () => Promise<any>
) {
  try {
    const content = await operation();

    const response = await fetch(`${API_CONFIG.baseURL}${routePath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    const { message, data } = await response.json();

    if (response.status !== 200) {
      reportError({
        message: message,
      });
    }

    return NextResponse.json({ message, data }, { status: response.status });
  } catch (err) {
    const errorMessage = `Error in ${routeName} route: ${getErrorMessage(err)}`;
    reportError({
      message: errorMessage,
    });
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function getWrapper(
  routeName: string,
  routePath: string,
  request: NextRequest,
  operation?: () => Promise<any>
) {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}${routePath}`, {
      method: "GET",
    });
    const { message, data } = await response.json();

    if (response.status !== 200) {
      reportError({
        message: message,
      });
    }

    // An optional operation could be passed in to this wrapper
    // const result = await operation();

    return NextResponse.json({ message, data }, { status: response.status });
  } catch (err) {
    const errorMessage = `Error in ${routeName} route: ${getErrorMessage(err)}`;
    reportError({
      message: errorMessage,
    });
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
