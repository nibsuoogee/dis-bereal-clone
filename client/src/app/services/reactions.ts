"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { UUIDTypes } from "uuid";
import { DBPayload, ReactionCounts } from "@types";

export const useReactionService = () => {
  const { showSnackbar } = useSnackbar();

  const getReactions = async (
    showResponseSnackbar: boolean,
    postid: UUIDTypes | null
  ): Promise<ReactionCounts> => {
    const routePath = `/api/reactions/${postid}`;
    const defaultErrorMessage = "Failed to fetch reactions";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      showResponseSnackbar
    );
  };

  const getUserReactions = async (
    showResponseSnackbar: boolean,
    postid: UUIDTypes | null,
    userid: UUIDTypes | null
  ): Promise<ReactionCounts> => {
    const routePath = `/api/reactions/${postid}/${userid}`;
    const defaultErrorMessage = "Failed to fetch user reactions";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      showResponseSnackbar
    );
  };

  const postReaction = async (payload: DBPayload): Promise<null> => {
    const routePath = `/api/reactions`;
    const defaultErrorMessage = "Failed to upload reaction";

    return await servicePostRequest(
      routePath,
      payload,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getReactions, getUserReactions, postReaction };
};
