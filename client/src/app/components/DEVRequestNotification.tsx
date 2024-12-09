"use client";

import { Card, IconButton, Stack, Typography } from "@mui/joy";
import AlarmIcon from "@mui/icons-material/Alarm";
import { useDEVService } from "../services/DEV";
import { useDataContext } from "../contexts/DataContext";

export default function DEVRequestNotification() {
  const { currentUser } = useDataContext();
  const { requestNotification } = useDEVService();

  return (
    <>
      <Card variant="soft" size="sm">
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography level="body-md">DEV: Request notification</Typography>
          <IconButton onClick={() => requestNotification(currentUser.userid)}>
            <AlarmIcon />
          </IconButton>
        </Stack>
      </Card>
    </>
  );
}
