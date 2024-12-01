import { Stack } from "@mui/joy";
import NavigationPanel from "./NavigationPanel";
import FooterWithLinks from "./FooterWithLinks";
import CurrentUserCard from "@/app/components/CurrentUserCard";

export default function PageLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[40px_1fr_80px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-center row-start-1 w-full">
        <Stack
          spacing={2}
          direction={"row"}
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            zIndex: 10,
          }}
        >
          <NavigationPanel />
          <CurrentUserCard />
        </Stack>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start">
        <Stack
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          minWidth={{ xs: "400px", sm: "800px" }}
        >
          {children}
        </Stack>
      </main>
      <FooterWithLinks />
    </div>
  );
}
