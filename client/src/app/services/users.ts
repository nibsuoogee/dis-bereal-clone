"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { User } from "../../../types";

export const useUserService = () => {
  const { showSnackbar } = useSnackbar();

  const getUsers = async (): Promise<string[]> => {
    const routePath = "/api/users";
    const defaultErrorMessage = "Failed to fetch users";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  async function login(userData: any): Promise<User> {
    const routePath = "/api/users/login";
    const defaultErrorMessage = "Failed to login";
    return await servicePostRequest(
      routePath,
      userData,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  }

  return { getUsers, login };
};
