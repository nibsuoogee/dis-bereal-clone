"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceDeleteRequest,
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { DBPayload, User } from "@types";
import { UUIDTypes } from "uuid";

export const useFriendsService = () => {
  const { showSnackbar } = useSnackbar();

  const getFriends = async (userid: UUIDTypes | null): Promise<User[]> => {
    const routePath = `/api/friends/${userid}`;
    const defaultErrorMessage = "Failed to fetch friends";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  const getNonFriends = async (userid: UUIDTypes | null): Promise<User[]> => {
    const routePath = `/api/friends/nonfriends/${userid}`;
    const defaultErrorMessage = "Failed to fetch non-friends";
    return await serviceGetRequest(routePath, defaultErrorMessage, () => null);
  };

  const addFriend = async (payload: DBPayload): Promise<User[]> => {
    const routePath = "/api/friends";
    const defaultErrorMessage = "Failed to add friend";
    return await servicePostRequest(
      routePath,
      payload,
      defaultErrorMessage,
      showSnackbar
    );
  };

  const removeFriend = async (
    userid1: UUIDTypes | null,
    userid2: UUIDTypes | null
  ): Promise<User[]> => {
    const routePath = `/api/friends/${userid1}/${userid2}`;
    const defaultErrorMessage = "Failed to remove friend";
    return await serviceDeleteRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  return { getFriends, addFriend, getNonFriends, removeFriend };
};
