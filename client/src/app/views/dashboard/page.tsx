"use client";

import { CircularProgress, Grid, Stack, Typography } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";
import { usePostService } from "@/app/services/posts";
import VideoUpload from "@/app/components/VideoUpload";
import { post } from "../../../../../shared/types";

export default function Dashboard() {
  const { getPosts } = usePostService();
  const [posts, setPosts] = useState<post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetPosts() {
    setIsLoading(true);
    const newPosts = await getPosts();

    setPosts(newPosts);
    setIsLoading(false);
  }

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <PageLayoutShell>
      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          justifyContent: "flex-center",
          alignItems: "flex-center",
        }}
      >
        <Typography level="h1">Dashboard</Typography>
        {isLoading && <CircularProgress thickness={1} color="neutral" />}
      </Stack>

      <Typography level="title-sm">
        The following data has been fetched from the express server:
      </Typography>

      <Grid
        container
        spacing={1}
        sx={{
          justifyContent: "flex-center",
          alignItems: "center",
        }}
      >
        {posts.map((post) => (
          <VideoCard
            key={post.postid}
            post={post}
            handleGetPosts={handleGetPosts}
          />
        ))}
      </Grid>

      <VideoUpload handleGetPosts={handleGetPosts}></VideoUpload>
    </PageLayoutShell>
  );
}
