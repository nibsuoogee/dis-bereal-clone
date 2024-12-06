"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceDeleteRequest,
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { UUIDTypes } from "uuid";
import { Post } from "../../../types";

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

  const uploadPost = async (content: any): Promise<string[]> => {
    const routePath = "/api/posts";
    const defaultErrorMessage = "Failed to upload post";

    return await servicePostRequest(
      routePath,
      content,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const deletePost = async (id: UUIDTypes | null): Promise<string[]> => {
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
