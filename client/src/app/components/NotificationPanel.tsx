import { Card, LinearProgress, Typography } from "@mui/joy";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";

export default function NotificationPanel() {
  const { notificationTimestamp } = useDataContext();
  const MAX_TIME = 120;
  const [secondsLeft, setSecondsLeft] = useState(MAX_TIME);

  useEffect(() => {
    if (notificationTimestamp === null) return;

    const timer = setInterval(() => {
      const timestamp = new Date(notificationTimestamp);
      const now = Date.now();
      const end = timestamp.getTime() + 120000; // 2 minutes in milliseconds
      const remaining = Math.max(0, Math.floor((end - now) / 1000));
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [notificationTimestamp]);

  return (
    <>
      <Card variant="soft" size="sm">
        <LinearProgress
          determinate
          variant="outlined"
          color="neutral"
          size="sm"
          thickness={24}
          value={Number(Math.round(100 - (secondsLeft / MAX_TIME) * 100)!)}
          sx={{
            "--LinearProgress-radius": "20px",
            "--LinearProgress-thickness": "24px",
          }}
        >
          <Typography
            level="body-xs"
            textColor="common.white"
            sx={{ fontWeight: "xl", mixBlendMode: "difference" }}
          >
            {`Time to BeReal ${secondsLeft} s`}
          </Typography>
        </LinearProgress>
      </Card>
    </>
  );
}
