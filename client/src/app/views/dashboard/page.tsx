"use client";

import { CircularProgress, Grid, Stack, Typography } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";
import { usePostService } from "@/app/services/posts";
import VideoUpload from "@/app/components/VideoUpload";
import { Post } from "../../../../../server/types";

export default function Dashboard() {
  const { getPosts } = usePostService();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetPosts(showResponseSnackbar: boolean) {
    setIsLoading(true);
    const newPosts = await getPosts(showResponseSnackbar);

    setPosts(newPosts);
    setIsLoading(false);
  }

  useEffect(() => {
    handleGetPosts(true);
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

      <Typography level="title-md">Posts</Typography>

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
            handleGetPosts={() => handleGetPosts(false)}
          />
        ))}
      </Grid>

      <VideoUpload handleGetPosts={() => handleGetPosts(false)}></VideoUpload>
    </PageLayoutShell>
  );
}
