import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Card,
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";

export default function NavigationPanel() {
  return (
    <>
      <AccordionGroup sx={{ maxWidth: 400 }}>
        <Accordion>
          <AccordionSummary>Navigation panel</AccordionSummary>
          <AccordionDetails>
            <Stack
              spacing={1}
              sx={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Link href="/">Default page</Link>
              <Link href="/views/dashboard">Dashboard</Link>
              <Link href="/views/login">login</Link>
              <Link href="/views/profile">profile</Link>
              <Link href="/views/friends">Friends</Link>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </>
  );
}
