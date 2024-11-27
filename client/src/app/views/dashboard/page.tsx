import FooterWithLinks from "@/app/components/FooterWithLinks";
import NavigationPanel from "@/app/components/NavigationPanel";
import { Card, Stack, Typography } from "@mui/joy";

export default function Dashboard() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Stack
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography level="h1">Dashboard</Typography>
          <NavigationPanel />

          <Card sx={{ width: 320 }}></Card>
        </Stack>
      </main>
      <FooterWithLinks />
    </div>
  );
}
