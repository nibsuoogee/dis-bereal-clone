import FooterWithLinks from "@/app/components/FooterWithLinks";
import NavigationPanel from "@/app/components/NavigationPanel";
import { Stack, Typography } from "@mui/joy";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_80px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start">
        <Stack
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography level="h1">Default page</Typography>
          <NavigationPanel />
        </Stack>
      </main>
      <FooterWithLinks />
    </div>
  );
}
