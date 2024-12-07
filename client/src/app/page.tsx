import { Typography } from "@mui/joy";
import PageLayoutShell from "./components/PageLayoutShell";
import { useNotificationService } from "./services/notifications";

export default function Home() {
  const { getUserNotifications } = useNotificationService();
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
      </Typography>{" "}
    </PageLayoutShell>
  );
}
