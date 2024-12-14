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
    postid: UUIDTypes | null
  ): Promise<ReactionCounts> => {
    const routePath = `/api/reactions/${postid}`;
    const defaultErrorMessage = "Failed to fetch reactions";
    return await serviceGetRequest(routePath, defaultErrorMessage, () => null);
  };

  const getUserReactions = async (
    postid: UUIDTypes | null,
    userid: UUIDTypes | null
  ): Promise<ReactionCounts> => {
    const routePath = `/api/reactions/${postid}/${userid}`;
    const defaultErrorMessage = "Failed to fetch user reactions";
    return await serviceGetRequest(routePath, defaultErrorMessage, () => null);
  };

  const postReaction = async (payload: DBPayload): Promise<null> => {
    const routePath = `/api/reactions`;
    const defaultErrorMessage = "Failed to upload reaction";

    return await servicePostRequest(
      routePath,
      payload,
      defaultErrorMessage,
      showSnackbar
    );
  };

  return { getReactions, getUserReactions, postReaction };
};
