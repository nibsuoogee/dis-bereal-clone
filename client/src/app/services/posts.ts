"use client";

import { Post } from "../../../../shared/types.js";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceDeleteRequest,
  serviceGetRequest,
  servicePostRequestFormData,
} from "@/app/services/requestHandlers";

export const usePostService = () => {
  const { showSnackbar } = useSnackbar();

  const getPosts = async (showResponseSnackbar: boolean): Promise<Post[]> => {
    const routePath = "/api/posts";
    const defaultErrorMessage = "Failed to fetch posts";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      showResponseSnackbar
    );
  };

  const uploadPost = async (formData: any): Promise<string[]> => {
    const routePath = "/api/posts";
    const defaultErrorMessage = "Failed to upload post";

    return await servicePostRequestFormData(
      routePath,
      formData,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const deletePost = async (id: number): Promise<string[]> => {
    const routePath = `/api/posts/${id}`;
    const defaultErrorMessage = "Failed to delete post";

    return await serviceDeleteRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getPosts, uploadPost, deletePost };
};
