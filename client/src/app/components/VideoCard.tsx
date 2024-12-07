import {
  Card,
  CardCover,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { Post } from "../../../../server/types";
import { API_CONFIG } from "@/app/config/api";
import ClearIcon from "@mui/icons-material/Clear";
import { usePostService } from "@/app/services/posts";
import ReactionArray from "./ReactionArray";
import { useDataContext } from "../contexts/DataContext";
import { useUserService } from "../services/users";
import { useEffect, useState } from "react";

export default function VideoCard({
  post,
  handleGetPosts,
}: {
  post: Post;
  handleGetPosts: () => void;
}) {
  const { currentUser } = useDataContext();
  const { deletePost } = usePostService();
  const { getUser } = useUserService();
  const [username, setUsername] = useState<string>("");

  const isUsersPost = currentUser?.userid === post?.userid;

  const handleDeletePost = async () => {
    await deletePost(post.postid);
    handleGetPosts();
  };

  async function handleGetUser() {
    const newUser = await getUser(false, post.userid);
    setUsername(newUser?.username);
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Grid>
      <Stack
        spacing={1}
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Card sx={{ height: "600px", width: "338px" }}>
          <CardCover>
            <video autoPlay muted controls>
              <source
                src={`${API_CONFIG.baseURL}/api/posts/${post.postid}`}
                type="video/mp4"
              />
            </video>
          </CardCover>
          {/*<CardContent></CardContent>*/}
        </Card>
        <Card>
          <Stack
            spacing={1}
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Typography
              level="body-lg"
              sx={{ fontWeight: "lg", mt: { xs: 12, sm: 18 } }}
            >
              {username ?? "No username"}
            </Typography>
            <Typography
              level="body-sm"
              sx={{ fontWeight: "lg", mt: { xs: 12, sm: 18 } }}
            >
              Post id: {post.postid ?? "No post id"}
            </Typography>
            <Typography
              level="body-sm"
              sx={{ fontWeight: "lg", mt: { xs: 12, sm: 18 } }}
            >
              {post.isLate ? "Late" : "Not Late"}
            </Typography>
            <ReactionArray
              post={post}
              buttonsDisabled={isUsersPost}
            ></ReactionArray>
            {isUsersPost ? (
              <Tooltip title="Delete post" variant="plain">
                <IconButton
                  variant="outlined"
                  onClick={() => handleDeletePost()}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Stack>
        </Card>
      </Stack>
    </Grid>
  );
}
