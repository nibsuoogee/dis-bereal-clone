import { useSnackbar } from "@/app/contexts/SnackbarContext";

export const useUserService = () => {
  const { showSnackbar } = useSnackbar();

  const getUsers = async (): Promise<string[]> => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
      });
      const { message, data } = await response.json();

      if (!response.ok) {
        showSnackbar(message);
        throw new Error("Failed to fetch users");
      }

      return data;
    } catch (err) {
      showSnackbar("Failed to fetch users");
    }
    return [];
  };

  return { getUsers };
};
