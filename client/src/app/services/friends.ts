"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { User } from "@types";

export const useFriendsService = () => {
  const { showSnackbar } = useSnackbar();

  const getFriends = async (): Promise<User[]> => {
    const routePath = "/api/friends";
    const defaultErrorMessage = "Failed to fetch friends";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const getNonFriends = async (data: any): Promise<User[]> => {
    const routePath = "/api/friends/nonFriends";
    const defaultErrorMessage = "Failed to fetch non-friends";
    return await servicePostRequest(
      routePath,
      data,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const addFriend = async (data: any): Promise<User[]> => {
    console.log(data);
    const routePath = "/api/friends";
    const defaultErrorMessage = "Failed to add friend";
    return await servicePostRequest(
      routePath,
      data,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getFriends, addFriend, getNonFriends };
};
