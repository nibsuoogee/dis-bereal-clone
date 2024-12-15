import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/joy";
import { useFriendsService } from "../services/friends";
import { useState, useEffect } from "react";
import { User } from "@types";
import { useDataContext } from "@/app/contexts/DataContext";
import CloseIcon from "@mui/icons-material/Close";
import { UUIDTypes } from "uuid";
import { getDatabaseName } from "@/app/lib/conversions";

export default function FriendList() {
  const { getFriends, removeFriend } = useFriendsService();
  const [friends, setFriends] = useState<User[]>([]);
  const { currentUser } = useDataContext();

  async function handleGetFriends() {
    if (!currentUser?.userid || !currentUser?.database) return;
    const friends = await getFriends(currentUser.userid);
    if (!friends) return;
    setFriends(friends);
  }

  async function handleRemoveFriend(friendid: UUIDTypes | null) {
    if (!currentUser?.database || !currentUser?.userid || !friendid) return;
    await removeFriend(currentUser.userid, friendid);
    handleGetFriends();
  }

  useEffect(() => {
    handleGetFriends();
  }, []);

  return (
    <Grid container spacing={2}>
      {friends && friends.length > 0
        ? friends.map((friend, index) => (
            <Grid key={index}>
              <Card variant="soft">
                <CardContent orientation="horizontal">
                  <Tooltip title={"Remove friend"} variant="plain">
                    <IconButton
                      size="lg"
                      variant="plain"
                      color="neutral"
                      onClick={() => handleRemoveFriend(friend.userid)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                  <div>
                    <Typography level="body-xs">{friend.username}</Typography>
                    <Typography
                      width={"150px"}
                      sx={{
                        fontSize: "lg",
                        fontWeight: "lg",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {friend.fullname}
                    </Typography>
                    <Typography level="body-xs">
                      Database:
                      {getDatabaseName(friend.database) ?? "No database"}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        : ""}
    </Grid>
  );
}
