import { getErrorMessage } from "@/app/utils/logger";

/**
 * Make a POST request the the Next.js API route (client/src/app/api/...)
 * @param routePath The path to the API route
 * @param content what to stringify and send in the body
 * @param defaultErrorMessage An error message to display if the request fails
 * @param showSnackbar The function to show a snackbar in the UI
 * @param showResponseSnackbar Whether to show the snackbar (if no error occurs)
 * @returns data from the API
 */
export async function servicePostRequest(
  routePath: string,
  content: unknown,
  defaultErrorMessage: string,
  showSnackbar: (message: string) => void
) {
  try {
    const response = await fetch(routePath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    const { message, data } = await response.json();

    if (!response.ok) {
      throw new Error(message ?? defaultErrorMessage);
    }

    showSnackbar(message);

    return data;
  } catch (err) {
    showSnackbar(getErrorMessage(err));
  }
}

/**
 * Make a GET request the the Next.js API route (client/src/app/api/...)
 * @param routePath The path to the API route
 * @param defaultErrorMessage An error message to display if the request fails
 * @param showSnackbar The function to show a snackbar in the UI
 * @param showResponseSnackbar Whether to show the snackbar (if no error occurs)
 * @returns data from the API
 */
export async function serviceGetRequest(
  routePath: string,
  defaultErrorMessage: string,
  showSnackbar: (message: string) => void
) {
  try {
    const response = await fetch(routePath, {
      method: "GET",
    });
    const { message, data } = await response.json();

    if (!response.ok) {
      throw new Error(message ?? defaultErrorMessage);
    }

    showSnackbar(message);

    return data;
  } catch (err) {
    showSnackbar(getErrorMessage(err));
  }
  return [];
}

/**
 * Make a DELETE request the the Next.js API route (client/src/app/api/...)
 * @param routePath The path to the API route
 * @param defaultErrorMessage An error message to display if the request fails
 * @param showSnackbar The function to show a snackbar in the UI
 * @param showResponseSnackbar Whether to show the snackbar (if no error occurs)
 * @returns data from the API
 */
export async function serviceDeleteRequest(
  routePath: string,
  defaultErrorMessage: string,
  showSnackbar: (message: string) => void
) {
  try {
    const response = await fetch(routePath, {
      method: "DELETE",
    });
    const { message, data } = await response.json();

    if (!response.ok) {
      throw new Error(message ?? defaultErrorMessage);
    }

    showSnackbar(message);

    return data;
  } catch (err) {
    showSnackbar(getErrorMessage(err));
  }
  return [];
}

/**
 * Make a PATCH request the the Next.js API route (client/src/app/api/...)
 * @param routePath The path to the API route
 * @param content what to stringify and send in the body
 * @param defaultErrorMessage An error message to display if the request fails
 * @param showSnackbar The function to show a snackbar in the UI
 * @param showResponseSnackbar Whether to show the snackbar (if no error occurs)
 * @returns data from the API
 */
export async function servicePatchRequest(
  routePath: string,
  content: unknown,
  defaultErrorMessage: string,
  showSnackbar: (message: string) => void
) {
  try {
    const response = await fetch(routePath, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    const { message, data } = await response.json();

    if (!response.ok) {
      throw new Error(message ?? defaultErrorMessage);
    }

    showSnackbar(message);

    return data;
  } catch (err) {
    showSnackbar(getErrorMessage(err));
  }
}
