"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";

export const usePostService = () => {
  const { showSnackbar } = useSnackbar();

  const getPosts = async (): Promise<string[]> => {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
      });
      const { message, data } = await response.json();

      if (!response.ok) {
        showSnackbar(message);
        throw new Error("Failed to fetch posts");
      }

      return data;
    } catch (err) {
      //showSnackbar("Failed to fetch posts");
    }
    return [];
  };

  return { getPosts };
};
