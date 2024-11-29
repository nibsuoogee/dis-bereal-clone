import { getErrorMessage } from "@/app/utils/logger";

export async function servicePostRequest(
  routePath: string,
  content: any,
  defaultErrorMessage: string,
  showSnackbar: (message: string) => void,
  showResponseSnackbar: boolean,
  operation?: () => Promise<any>
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

    if (showResponseSnackbar) {
      showSnackbar(message);
    }

    return data;
  } catch (err) {
    showSnackbar(getErrorMessage(err));
  }
}

export async function serviceGetRequest(
  routePath: string,
  defaultErrorMessage: string,
  showSnackbar: (message: string) => void,
  showResponseSnackbar: boolean,
  operation?: () => Promise<any>
) {
  try {
    const response = await fetch(routePath, {
      method: "GET",
    });
    const { message, data } = await response.json();

    if (!response.ok) {
      throw new Error(message ?? defaultErrorMessage);
    }

    if (showResponseSnackbar) {
      showSnackbar(message);
    }

    return data;
  } catch (err) {
    showSnackbar(getErrorMessage(err));
  }
  return [];
}
