"use client";

import { Button, Typography } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import UserDetails from "../../components/UserDetails";
import { useDataContext } from "../../contexts/DataContext";
import { User } from "../../../../types";
import Link from "next/link";
import { useUserService } from "../../services/users";

export default function Profile() {
  const { currentUser, setCurrentUser } = useDataContext();
  const { deleteUser } = useUserService();

  async function handleLogOut() {
    setCurrentUser({} as User);
  }

  async function handleDeleteUser() {
    await deleteUser(currentUser.userid, currentUser.database);
    setCurrentUser({} as User);
  }

  return (
    <PageLayoutShell>
      <Typography level="h1">Profile</Typography>

      <UserDetails />

      <Link href={"/views/login"}>
        <Button onClick={handleLogOut} variant="outlined" color="neutral">
          Log out
        </Button>
      </Link>

      <Link href={"/views/login"}>
        <Button onClick={handleDeleteUser} variant="outlined" color="danger">
          Remove account
        </Button>
      </Link>
    </PageLayoutShell>
  );
}
