"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";

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

  const login = async (userData: any): Promise<string[]> => {
    const routePath = "/api/users/login";
    const defaultErrorMessage = "Failed to login";
    return await servicePostRequest(
      routePath,
      userData,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { getUsers, login };
};
