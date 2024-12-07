"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { serviceGetRequest } from "@/app/services/requestHandlers";
import { User } from "../../../types";
import { UUIDTypes } from "uuid";

export const useUserService = () => {
  const { showSnackbar } = useSnackbar();

  const getUsers = async (): Promise<User[]> => {
    const routePath = "/api/users";
    const defaultErrorMessage = "Failed to fetch users";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const getUser = async (
    showResponseSnackbar: boolean,
    userid: UUIDTypes | null
  ): Promise<User> => {
    const routePath = `/api/users/${userid}`;
    const defaultErrorMessage = "Failed to fetch user";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      showResponseSnackbar
    );
  };

  return { getUsers, getUser };
};
