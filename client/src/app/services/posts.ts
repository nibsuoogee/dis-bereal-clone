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
      showResponseSnackbar ? showSnackbar : () => null
    );
  };

  const getUserPosts = async (userid: UUIDTypes | null): Promise<Post[]> => {
    const routePath = `/api/posts/${userid}`;
    const defaultErrorMessage = "Failed to fetch user posts";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  const uploadPost = async (payload: DBPayload): Promise<null> => {
    const routePath = "/api/posts";
    const defaultErrorMessage = "Failed to upload post";

    return await servicePostRequest(
      routePath,
      payload,
      defaultErrorMessage,
      showSnackbar
    );
  };

  const deletePost = async (postid: UUIDTypes | null): Promise<null> => {
    const routePath = `/api/posts/${postid}`;
    const defaultErrorMessage = "Failed to delete post";

    return await serviceDeleteRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  const getFriendsPosts = async (userid: UUIDTypes | null): Promise<Post[]> => {
    const routePath = `/api/posts/friends/${userid}`;
    const defaultErrorMessage = "Failed to fetch friend posts";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  return { getPosts, getUserPosts, uploadPost, deletePost, getFriendsPosts };
};
