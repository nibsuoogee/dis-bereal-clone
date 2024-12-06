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

  const initMultiDB = async (): Promise<any> => {
    const routePath = "/api/dev";
    const content = { command: "initialize-multi-database" };
    const defaultErrorMessage = "Failed to initialize multi-database";
    return await servicePostRequest(
      routePath,
      content,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const populateMultiDB = async (): Promise<any> => {
    const routePath = "/api/dev";
    const content = { command: "populate-multi-database" };
    const defaultErrorMessage = "Failed to populate multi-database";
    return await servicePostRequest(
      routePath,
      content,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const resetMultiDB = async (): Promise<any> => {
    const routePath = "/api/dev";
    const content = { command: "reset-multi-database" };
    const defaultErrorMessage = "Failed to reset multi-database";
    return await servicePostRequest(
      routePath,
      content,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return { initDB, initMultiDB, populateMultiDB, resetMultiDB };
};
