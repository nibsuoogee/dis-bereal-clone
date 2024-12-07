"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { serviceGetRequest } from "@/app/services/requestHandlers";
import { UUIDTypes } from "uuid";

export const useNotificationService = () => {
  const { showSnackbar } = useSnackbar();

  const getUserNotifications = async (
    showResponseSnackbar: boolean,
    userid: UUIDTypes | null
  ): Promise<string> => {
    const routePath = `/api/notifications/${userid}`;
    const defaultErrorMessage = "Failed to fetch notification";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      showResponseSnackbar
    );
  };

  return { getUserNotifications };
};
