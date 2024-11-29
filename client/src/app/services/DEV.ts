"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import { getErrorMessage } from "../utils/logger";

export const useDEVService = () => {
  const { showSnackbar } = useSnackbar();

  const initDB = async (): Promise<string[]> => {
    try {
      const response = await fetch("/api/dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: "initialize-database" }),
      });
      const { message, data } = await response.json();

      if (!response.ok) {
        throw new Error(message ?? "Failed to initialize database");
      }

      return data;
    } catch (err) {
      showSnackbar(getErrorMessage(err));
    }
    return [];
  };

  return { initDB };
};
