"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { servicePostRequest } from "@/app/services/requestHandlers";
import { UUIDTypes } from "uuid";

export const useDEVService = () => {
  const { showSnackbar } = useSnackbar();

  const initMultiDB = async (): Promise<null> => {
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

  const populateMultiDB = async (): Promise<null> => {
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

  const resetMultiDB = async (): Promise<null> => {
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

  const requestNotification = async (
    userid: UUIDTypes | null
  ): Promise<null> => {
    const routePath = "/api/dev";
    const content = { command: "request-notification", userid: userid };
    const defaultErrorMessage = "Failed to request notification";
    return await servicePostRequest(
      routePath,
      content,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  return {
    initMultiDB,
    populateMultiDB,
    resetMultiDB,
    requestNotification,
  };
};
