import { API_CONFIG } from "@/app/config/api";
import { getErrorMessage, reportError } from "@/app/utils/logger";
import { NextRequest, NextResponse } from "next/server";

/**
 * Make a POST request to the Express server.
 * @param request request object
 * @param body what to stringify and send in the body
 * @returns message, data
 */
export async function postWrapper(request: NextRequest, body: any) {
  let urlPathName = "";
  try {
    urlPathName = new URL(request.url).pathname;
    const response = await fetch(`${API_CONFIG.baseURL}${urlPathName}`, {
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
    const errorMessage = `Error in ${urlPathName} route: ${getErrorMessage(
      err
    )}`;
    reportError({
      message: errorMessage,
    });
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

/**
 * Make a GET request to the Express server.
 * @param request request object
 * @returns message, data
 */
export async function getWrapper(request: NextRequest) {
  let urlPathName = "";
  try {
    urlPathName = new URL(request.url).pathname;
    const response = await fetch(`${API_CONFIG.baseURL}${urlPathName}`, {
      method: "GET",
    });
    const { message, data } = await response.json();

    if (response.status !== 200) {
      reportError({
        message: message,
      });
    }

    return NextResponse.json({ message, data }, { status: response.status });
  } catch (err) {
    const errorMessage = `Error in ${request.url} route: ${getErrorMessage(
      err
    )}`;
    reportError({
      message: errorMessage,
    });
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

/**
 * Make a DELETE request to the Express server.
 * @param request request object
 * @returns message, data
 */
export async function deleteWrapper(request: NextRequest) {
  let urlPathName = "";
  try {
    urlPathName = new URL(request.url).pathname;
    const response = await fetch(`${API_CONFIG.baseURL}${urlPathName}`, {
      method: "DELETE",
    });
    const { message, data } = await response.json();

    if (response.status !== 200) {
      reportError({
        message: message,
      });
    }

    return NextResponse.json({ message, data }, { status: response.status });
  } catch (err) {
    const errorMessage = `Error in ${urlPathName} route: ${getErrorMessage(
      err
    )}`;
    reportError({
      message: errorMessage,
    });
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
