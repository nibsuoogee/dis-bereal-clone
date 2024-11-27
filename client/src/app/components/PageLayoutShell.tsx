import { Stack } from "@mui/joy";
import NavigationPanel from "./NavigationPanel";
import FooterWithLinks from "./FooterWithLinks";

export default function PageLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[20px_1fr_80px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-center row-start-1 w-full">
        <NavigationPanel />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start">
        <Stack
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {children}
        </Stack>
      </main>
      <FooterWithLinks />
    </div>
  );
}
