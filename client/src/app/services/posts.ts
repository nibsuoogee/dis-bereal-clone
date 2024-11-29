"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { serviceGetRequest } from "@/app/services/requestHandlers";

export const usePostService = () => {
  const { showSnackbar } = useSnackbar();

  const getPosts = async (): Promise<string[]> => {
    const routeName = "/api/posts";
    const defaultErrorMessage = "Failed to fetch posts";
    return await serviceGetRequest(
      routeName,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getPosts };
};
