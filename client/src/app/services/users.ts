"use client";

import { useSnackbar } from "@/app/contexts/SnackbarContext";
import {
  serviceDeleteRequest,
  serviceGetRequest,
  servicePatchRequest,
  servicePostRequest,
} from "@/app/services/requestHandlers";
import { DatabaseOption, DBPayload, User } from "@types";
import { UUIDTypes } from "uuid";

export const useUserService = () => {
  const { showSnackbar } = useSnackbar();

  const getUsers = async (): Promise<User[]> => {
    const routePath = "/api/users";
    const defaultErrorMessage = "Failed to fetch users";
    return await serviceGetRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  const getUser = async (userid: UUIDTypes | null): Promise<User> => {
    const routePath = `/api/users/${userid}`;
    const defaultErrorMessage = "Failed to fetch user";
    return await serviceGetRequest(routePath, defaultErrorMessage, () => null);
  };

  async function login(userData: any): Promise<User> {
    const routePath = "/api/users/login";
    const defaultErrorMessage = "Failed to login";
    return await servicePostRequest(
      routePath,
      userData,
      defaultErrorMessage,
      showSnackbar
    );
  }

  const updateUser = async (
    payload: DBPayload,
    userid: UUIDTypes | null
  ): Promise<User> => {
    const routePath = `/api/users/${userid}`;
    const defaultErrorMessage = "Failed to update user";

    return await servicePatchRequest(
      routePath,
      payload,
      defaultErrorMessage,
      showSnackbar
    );
  };

  const deleteUser = async (
    userid: UUIDTypes | null,
    database: DatabaseOption
  ): Promise<null> => {
    const routePath = `/api/users/${userid}/${database}`;
    const defaultErrorMessage = "Failed to delete user";

    return await serviceDeleteRequest(
      routePath,
      defaultErrorMessage,
      showSnackbar
    );
  };

  return { getUsers, getUser, login, updateUser, deleteUser };
};
