"use client";

import { useDataContext } from "@/app/contexts/DataContext";
import { Card, CardContent, Typography } from "@mui/joy";

export default function CurrentUserCard() {
  const { currentUser } = useDataContext();

  return (
    <>
      <Card variant="soft">
        <CardContent orientation="horizontal">
          <div>
            <Typography level="body-xs">Logged in as</Typography>
            <Typography
              maxWidth={"200px"}
              sx={{
                fontSize: "lg",
                fontWeight: "lg",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentUser?.username ?? "No username"}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
