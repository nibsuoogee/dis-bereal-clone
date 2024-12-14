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
import { DBPayload, FriendRequest, User } from "@types";
import { useDataContext } from "@/app/contexts/DataContext";
import { UUIDTypes } from "uuid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { getDatabaseName } from "@/app/lib/conversions";

export default function AddFriendList() {
  const { addFriend, getNonFriends } = useFriendsService();
  const [users, setUsers] = useState<User[]>([]);
  const { currentUser } = useDataContext();

  async function handleGetNonFriends() {
    if (!currentUser?.userid || !currentUser?.database) return;
    const newUsers = await getNonFriends(currentUser.userid);
    setUsers(newUsers);
  }

  async function handleAddFriend(userid: UUIDTypes | null) {
    if (!currentUser?.userid || !userid) return;
    const friendRequest: FriendRequest = {
      userid1: currentUser.userid,
      userid2: userid,
    };
    const payload: DBPayload = {
      database: currentUser.database,
      obj: friendRequest,
    };
    await addFriend(payload);
    handleGetNonFriends();
  }

  useEffect(() => {
    handleGetNonFriends();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {users && users.length > 0
          ? users.map((user, index) => (
              <Card key={index} variant="soft">
                <CardContent orientation="horizontal">
                  <Tooltip title={"Add friend"} variant="plain">
                    <IconButton
                      variant="plain"
                      color="neutral"
                      onClick={() => handleAddFriend(user.userid)}
                    >
                      <PersonAddIcon />
                    </IconButton>
                  </Tooltip>
                  <div>
                    <Typography level="body-xs">{user.username}</Typography>
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
                      {user.fullname}
                    </Typography>
                    <Typography level="body-xs">
                      Database:{" "}
                      {getDatabaseName(user.database) ?? "No database"}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))
          : ""}
      </Grid>
    </Box>
  );
}
