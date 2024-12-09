"use client";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";
import { usePostService } from "@/app/services/posts";
import VideoUpload from "@/app/components/VideoUpload";
import { Post } from "@types";
import { useDataContext } from "../../contexts/DataContext";

export default function Dashboard() {
  const { currentUser } = useDataContext();
  const { getPosts, getUserPosts } = usePostService();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetPosts(getFunction: Promise<Post[]>) {
    setIsLoading(true);
    const newPosts = await getFunction;

    setPosts(newPosts);
    setIsLoading(false);
  }

  useEffect(() => {
    handleGetPosts(getPosts(true));
  }, []);

  return (
    <PageLayoutShell>
      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          justifyContent: "flex-center",
          alignItems: "center",
        }}
      >
        <Typography level="h1">Dashboard</Typography>
        {isLoading && (
          <CircularProgress thickness={1} size="sm" color="neutral" />
        )}
      </Stack>

      <VideoUpload
        handleGetPosts={() => handleGetPosts(getPosts(false))}
      ></VideoUpload>

      <ButtonGroup
        aria-label="radius button group"
        sx={{ "--ButtonGroup-radius": "40px" }}
      >
        <Button onClick={() => handleGetPosts(getPosts(true))}>For you</Button>
        <Button
          onClick={() => handleGetPosts(getUserPosts(true, currentUser.userid))}
        >
          Your posts
        </Button>
      </ButtonGroup>

      <Grid
        container
        spacing={1}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: "flex-center",
          alignItems: "center",
        }}
      >
        {posts.map((post, index) => (
          <VideoCard
            key={index}
            post={post}
            handleGetPosts={() => handleGetPosts(getPosts(false))}
          />
        ))}
      </Grid>
    </PageLayoutShell>
  );
}
