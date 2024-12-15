"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceGetRequest,
  servicePostRequest,
  serviceDeleteRequest,
} from "@/app/services/requestHandlers";
import { UUIDTypes } from "uuid";
import { Comment, DatabaseOption, DBPayload } from "@types";

export const useCommentService = () => {
  const { showSnackbar } = useSnackbar();

  const getComments = async (
    postid: UUIDTypes | null,
    database: DatabaseOption
  ): Promise<Comment[]> => {
    const routePath = `/api/comments/${postid}/${database}`;
    const defaultErrorMessage = "Failed to fetch comments";
    return await serviceGetRequest(routePath, defaultErrorMessage, () => null);
  };

  const uploadComment = async (payload: DBPayload): Promise<null> => {
    const routePath = "/api/comments";
    const defaultErrorMessage = "Failed to upload comment";

    return await servicePostRequest(
      routePath,
      payload,
      defaultErrorMessage,
      showSnackbar
    );
  };

  const deleteComment = async (
    commentid: UUIDTypes,
    database: DatabaseOption
  ): Promise<null> => {
    const routePath = `/api/comments/${commentid}/${database}`;
    const defaultErrorMessage = "Failed to delete comment";

    return await serviceDeleteRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  return { getComments, uploadComment, deleteComment };
};
