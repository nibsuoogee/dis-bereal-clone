import { Box, Button, Card, Grid, Typography } from "@mui/joy";
import { useFriendsService } from "../services/friends";
import { useUserService } from "../services/users";
import { useState, useEffect, Fragment } from "react";
import { User } from "@types";
import { useDataContext } from "@/app/contexts/DataContext";

export default function AddFriendList() {
  const { addFriend, getNonFriends } = useFriendsService();
  const [users, setUsers] = useState<User[]>([]);
  const { currentUser } = useDataContext();

  async function handleGetNonFriends() {
    let data = { userid: currentUser.userid, database: currentUser.database };
    console.log(data);
    if (currentUser.userid) {
      const newUsers = await getNonFriends(data);
      setUsers(newUsers);
    }
  }

  async function handleAddFriend(user: User) {
    if (currentUser.userid) {
      await addFriend({
        userid1: currentUser.userid,
        userid2: user.userid,
        database: currentUser.database,
      });
    }
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
      <Card
        variant="soft"
        sx={{
          maxHeight: "400px",
          overflow: "auto",
          padding: "16px",
          borderRadius: "8px",
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
          {users && users.length > 0 ? (
            users.map((user) => (
              <Box
                key={user.userid.toString()}
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
                <Typography>{user.username}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAddFriend(user)}
                >
                  Add friend
                </Button>
              </Box>
            ))
          ) : (
            <Typography>No friends to add!</Typography>
          )}
        </Grid>
      </Card>
    </Box>
  );
}
