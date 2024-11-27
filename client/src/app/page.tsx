import { Typography } from "@mui/joy";
import PageLayoutShell from "./components/PageLayoutShell";

export default function Home() {
  return (
    <PageLayoutShell>
      <Typography level="h1" fontSize={"6rem"}>
        BeReal clone
      </Typography>
    </PageLayoutShell>
  );
}
