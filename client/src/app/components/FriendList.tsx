import { Box, Button, Card, Grid, Typography } from "@mui/joy";
import { useFriendsService } from "../services/friends";
import { useUserService } from "../services/users";
import { useState, useEffect, Fragment } from "react";
import { User } from "@types";
import { useDataContext } from "@/app/contexts/DataContext";

export default function FriendList() {
  const { getFriends } = useFriendsService();
  const [friends, setFriends] = useState<User[]>([]);
  const { currentUser } = useDataContext();
  const [removedFriend, setRemovedFriend] = useState<User[]>([]);

  async function handleGetFriends() {
    const friends = await getFriends();
    setFriends(friends);
  }

  async function handleRemoveFriend(user: User) {
    //await removeFriend({ userid1: currentUser.userid, userid2: user.userid });
  }

  useEffect(() => {
    //handleGetFriends();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Card
        variant="soft"
        sx={{
          maxHeight: "400px", // Set a fixed height for the card
          overflow: "auto", // Enable scrolling if content exceeds height
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two columns layout
            gap: "16px",
          }}
        >
          {friends.map((friend) => (
            <Box
              key={friend.userid.toString()}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                backgroundColor: "lightgray",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <Typography>{friend.username}</Typography>
              <Button variant="outlined" color="primary">
                Remove friend
              </Button>
            </Box>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
