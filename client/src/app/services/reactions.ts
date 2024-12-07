"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceDeleteRequest,
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { UUIDTypes } from "uuid";
import { ReactionCounts } from "../../../types";

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

  const postReaction = async (content: any): Promise<string[]> => {
    const routePath = "/api/reactions";
    const defaultErrorMessage = "Failed to upload reaction";

    return await servicePostRequest(
      routePath,
      content,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const deleteReaction = async (
    reactionid: UUIDTypes | null
  ): Promise<string[]> => {
    const routePath = `/api/reactions/${reactionid}`;
    const defaultErrorMessage = "Failed to delete reaction";

    return await serviceDeleteRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getReactions, postReaction, deleteReaction };
};
