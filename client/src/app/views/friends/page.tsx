"use client";

import { Typography } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import FriendList from "../../components/FriendList";
import AddFriendList from "../../components/AddFriendList";

export default function Friends() {
  return (
    <PageLayoutShell>
      <Typography level="h1">Friends</Typography>
      <FriendList></FriendList>
      <Typography level="h2">Add friends</Typography>
      <AddFriendList></AddFriendList>
    </PageLayoutShell>
  );
}
