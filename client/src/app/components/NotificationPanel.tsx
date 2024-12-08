"use client";

import { Card, LinearProgress, Typography } from "@mui/joy";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";
import { TIME_TO_BEREAL_MS, TIME_TO_BEREAL_S } from "../config/constants";
import { useNotificationService } from "../services/notifications";
import { Notification } from "@types";

export default function NotificationPanel() {
  const { currentUser, notificationTimestamp, setNotificationTimestamp } =
    useDataContext();
  const { getUserNotifications } = useNotificationService();

  const MAX_TIME = TIME_TO_BEREAL_S;
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  async function handleGetNotification() {
    const notifications = (await getUserNotifications(
      false,
      currentUser?.userid
    )) as Notification[];

    if (notifications[0]?.wasdismissed) {
      setNotificationTimestamp(null);
    } else {
      setNotificationTimestamp(notifications[0]?.senttimestamp);
    }
  }

  useEffect(() => {
    if (!currentUser?.userid) return;
    handleGetNotification();
  }, []);

  useEffect(() => {
    if (notificationTimestamp === null) {
      setSecondsLeft(null);
      return;
    }

    const timer = setInterval(() => {
      const timestamp = new Date(notificationTimestamp);
      const now = Date.now();
      const end = timestamp.getTime() + TIME_TO_BEREAL_MS;
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
      {secondsLeft ? (
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
              level="body-md"
              textColor="common.white"
              sx={{ mixBlendMode: "difference" }}
            >
              {`Time to BeReal ${secondsLeft} s`}
            </Typography>
          </LinearProgress>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}
