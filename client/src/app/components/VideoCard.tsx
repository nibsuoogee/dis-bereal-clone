import { Card, CardCover, Grid, IconButton, Stack, Typography } from "@mui/joy";
import { Post } from "../../../../server/types";
import { API_CONFIG } from "@/app/config/api";
import ClearIcon from "@mui/icons-material/Clear";
import { usePostService } from "@/app/services/posts";
import ReactionArray from "./ReactionArray";

export default function VideoCard({
  post,
  handleGetPosts,
}: {
  post: Post;
  handleGetPosts: () => void;
}) {
  const { deletePost } = usePostService();

  const handleDeletePost = async () => {
    await deletePost(post.postid);
    handleGetPosts();
  };

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
              {
                "Username" /*TODO get username from database based on post.userid*/
              }
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
            <IconButton variant="outlined" onClick={() => handleDeletePost()}>
              <ClearIcon />
            </IconButton>
            <ReactionArray></ReactionArray>
          </Stack>
        </Card>
      </Stack>
    </Grid>
  );
}
