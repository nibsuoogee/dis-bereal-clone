"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceGetRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { User } from "@types";
import { UUIDTypes } from "uuid";

export const useUserService = () => {
  const { showSnackbar } = useSnackbar();

  const getUsers = async (): Promise<User[]> => {
    const routePath = "/api/users";
    const defaultErrorMessage = "Failed to fetch users";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  };

  const getUser = async (
    showResponseSnackbar: boolean,
    userid: UUIDTypes | null
  ): Promise<User> => {
    const routePath = `/api/users/${userid}`;
    const defaultErrorMessage = "Failed to fetch user";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar,
      showResponseSnackbar
    );
  };

  async function login(userData: any): Promise<User> {
    const routePath = "/api/users/login";
    const defaultErrorMessage = "Failed to login";
    return await servicePostRequest(
      routePath,
      userData,
      defaultErrorMessage,
      showSnackbar,
      true
    );
  }

  return { getUsers, getUser, login };
};
