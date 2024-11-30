"use client";

import { Button, Grid, Typography } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";
import { usePostService } from "@/app/services/posts";
import VideoUpload from "@/app/components/VideoUpload";
import { post } from "../../../../../shared/types";

export default function Dashboard() {
  const { getPosts } = usePostService();
  const [posts, setPosts] = useState<post[]>([]);

  async function handleGetPosts() {
    const newPosts = await getPosts();

    setPosts(newPosts);
  }

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <PageLayoutShell>
      <Typography level="h1">Dashboard</Typography>

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
          <VideoCard key={post.postid} post={post} />
        ))}
      </Grid>

      <VideoUpload></VideoUpload>
    </PageLayoutShell>
  );
}
