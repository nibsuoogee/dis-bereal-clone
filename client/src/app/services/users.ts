"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { serviceGetRequest } from "@/app/services/requestHandlers";

export const useUserService = () => {
  const { showSnackbar } = useSnackbar();

  const getUsers = async (): Promise<string[]> => {
    const routePath = "/api/users";
    const defaultErrorMessage = "Failed to fetch users";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  return { getUsers };
};
