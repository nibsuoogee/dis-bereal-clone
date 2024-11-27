"use client";

import { Grid, Typography } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard";
import { usePostService } from "@/app/services/posts";

export default function Dashboard() {
  const { getPosts } = usePostService();
  const [videoIds, setVideoIds] = useState<string[]>([]);

  async function handleGetPosts() {
    const newIds = await getPosts();
    setVideoIds(newIds);
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
        {videoIds.map((videoId) => (
          <VideoCard key={videoId} videoId={videoId} />
        ))}
      </Grid>
    </PageLayoutShell>
  );
}
