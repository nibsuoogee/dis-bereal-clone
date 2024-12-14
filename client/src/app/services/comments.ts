"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceGetRequest,
  servicePostRequest,
  serviceDeleteRequest,
} from "@/app/services/requestHandlers";
import { UUIDTypes } from "uuid";
import { Comment } from "@types";

export const useCommentService = () => {
  const { showSnackbar } = useSnackbar();

  const getComments = async (postid: UUIDTypes | null): Promise<Comment[]> => {
    const routePath = `/api/comments/${postid}`;
    const defaultErrorMessage = "Failed to fetch comments";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const uploadComment = async (commentPayload: {
    postid: UUIDTypes | null;
    content: string;
    userid: UUIDTypes; 
  }): Promise<null> => {
    const routePath = "/api/comments";
    const defaultErrorMessage = "Failed to upload comment";

    return await servicePostRequest(
      routePath,
      commentPayload,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const deleteComment = async (commentid: UUIDTypes): Promise<null> => {
    const routePath = `/api/comments/${commentid}`;
    const defaultErrorMessage = "Failed to delete comment";
  
    return await serviceDeleteRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getComments, uploadComment, deleteComment };
};
