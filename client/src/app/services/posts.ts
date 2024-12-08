"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceDeleteRequest,
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { UUIDTypes } from "uuid";
import { DBPayload, Post } from "@types";

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

  const getUserPosts = async (
    showResponseSnackbar: boolean,
    userid: UUIDTypes | null
  ): Promise<Post[]> => {
    const routePath = `/api/posts/${userid}`;
    const defaultErrorMessage = "Failed to fetch user posts";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      showResponseSnackbar
    );
  };

  const uploadPost = async (payload: DBPayload): Promise<string[]> => {
    const routePath = "/api/posts";
    const defaultErrorMessage = "Failed to upload post";

    return await servicePostRequest(
      routePath,
      payload,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const deletePost = async (postid: UUIDTypes | null): Promise<string[]> => {
    const routePath = `/api/posts/${postid}`;
    const defaultErrorMessage = "Failed to delete post";

    return await serviceDeleteRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getPosts, getUserPosts, uploadPost, deletePost };
};
