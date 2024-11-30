"use client";

import { post } from "../../../../shared/types.js";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceGetRequest,
  servicePostRequestFormData,
} from "@/app/services/requestHandlers";

export const usePostService = () => {
  const { showSnackbar } = useSnackbar();

  const getPosts = async (): Promise<post[]> => {
    const routeName = "/api/posts";
    const defaultErrorMessage = "Failed to fetch posts";
    return await serviceGetRequest(
      routeName,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const uploadPost = async (formData: any): Promise<string[]> => {
    const routeName = "/api/posts";
    const defaultErrorMessage = "Failed to upload post";

    return await servicePostRequestFormData(
      routeName,
      formData,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getPosts, uploadPost };
};
