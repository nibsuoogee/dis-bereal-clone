import {
  Card,
  CardCover,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { Post, User } from "@types";
import { API_CONFIG } from "@/app/config/api";
import ClearIcon from "@mui/icons-material/Clear";
import { usePostService } from "@/app/services/posts";
import ReactionArray from "./ReactionArray";
import { useDataContext } from "../contexts/DataContext";
import { useUserService } from "../services/users";
import { useEffect, useState } from "react";
import { timestampToReadableDate } from "../lib/conversions";
import CommentSection from "./CommentSection";

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
  const [poster, setPoster] = useState<User>({} as User);

  const isUsersPost = currentUser?.userid === post?.userid;

  const handleDeletePost = async () => {
    await deletePost(post.postid);
    //handleGetPosts();
  };

  async function handleGetUser() {
    const newUser = await getUser(post.userid);
    if (!newUser) return;
    setPoster(newUser);
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Stack spacing={1} className="py-2 inline-block pr-2">
      <Card sx={{ height: "500px", width: "281px" }}>
        <CardCover>
          <video autoPlay muted controls>
            <source
              src={`${API_CONFIG.baseURL}/api/posts/video/${post.postid}`}
              type="video/mp4"
            />
          </video>
        </CardCover>
      </Card>
      <Card size="sm" sx={{ width: "100%" }}>
        <Stack
          spacing={1}
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography level="body-lg" sx={{ fontWeight: "lg", mt: 12 }}>
            {poster?.username ?? "No username"}
          </Typography>
          <Typography level="body-sm" sx={{ fontWeight: "lg", mt: 12 }}>
            {post.timestamp
              ? timestampToReadableDate(post.timestamp)
              : "No date"}
          </Typography>{" "}
          <Typography level="body-sm" sx={{ fontWeight: "lg", mt: 12 }}>
            {post.islate ? "Posted late" : "Posted on time"}
          </Typography>
          <ReactionArray
            post={post}
            buttonsDisabled={isUsersPost}
          ></ReactionArray>
          {isUsersPost ? (
            <Tooltip title="Delete post" variant="plain">
              <IconButton variant="outlined" onClick={() => handleDeletePost()}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          <CommentSection postid={post.postid} database={poster.database} />
        </Stack>
      </Card>
    </Stack>
  );
}
