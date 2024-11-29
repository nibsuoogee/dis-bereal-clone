"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { serviceGetRequest } from "@/app/services/requestHandlers";

export const useUserService = () => {
  const { showSnackbar } = useSnackbar();

  const getUsers = async (): Promise<string[]> => {
    const routeName = "/api/users";
    const defaultErrorMessage = "Failed to fetch users";
    return await serviceGetRequest(
      routeName,
      defaultErrorMessage,
      showSnackbar
    );
  };

  return { getUsers };
};
