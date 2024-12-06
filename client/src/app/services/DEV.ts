"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { servicePostRequest } from "@/app/services/requestHandlers";

export const useDEVService = () => {
  const { showSnackbar } = useSnackbar();

  const initDB = async (): Promise<any> => {
    const routePath = "/api/dev";
    const content = { command: "initialize-database" };
    const defaultErrorMessage = "Failed to initialize database";
    return await servicePostRequest(
      routePath,
      content,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { initDB };
};
