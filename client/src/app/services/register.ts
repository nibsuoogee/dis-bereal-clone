"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { servicePostRequest } from "@/app/services/requestHandlers";

export const useRegisterService = () => {
  const { showSnackbar } = useSnackbar();

  const register = async (userdata: any): Promise<string[]> => {
    const routePath = "/api/users/";
    const defaultErrorMessage = "Failed to register";

    return await servicePostRequest(
      routePath,
      userdata,
      defaultErrorMessage,
      showSnackbar
    );
  };

  return { register };
};
