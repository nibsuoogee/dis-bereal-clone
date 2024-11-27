"use client";

import { Grid, Typography } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import { useState } from "react";
import VideoCard from "../../components/VideoCard";

export default function Dashboard() {
  const [videoIds, setVideoIds] = useState<string[]>([
    "id1",
    "id2",
    "id3",
    "id4",
  ]);

  return (
    <PageLayoutShell>
      <Typography level="h1">Dashboard</Typography>
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
