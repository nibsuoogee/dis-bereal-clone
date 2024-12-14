"use client";

import { Typography } from "@mui/joy";
import PageLayoutShell from "./components/PageLayoutShell";

export default function Home() {
  return (
    <PageLayoutShell>
      <Typography
        level="h1"
        fontSize={"6rem"}
        sx={{
          animation: "pulse 6s infinite",
          "@keyframes pulse": {
            "0%": {
              opacity: 0.7,
            },
            "50%": {
              opacity: 1,
            },
            "100%": {
              opacity: 0.7,
            },
          },
        }}
      >
        BeReal clone
      </Typography>
    </PageLayoutShell>
  );
}
