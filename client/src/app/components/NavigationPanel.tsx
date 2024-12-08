import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Card,
  CardContent,
  Stack,
} from "@mui/joy";
import Link from "next/link";

export default function NavigationPanel() {
  return (
    <>
      <Card variant="soft">
        <CardContent orientation="horizontal">
          <AccordionGroup sx={{ maxWidth: "200px" }}>
            <Accordion>
              <AccordionSummary>Navigation panel</AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "background.level1" }}>
                <Stack
                  spacing={1}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Link href="/">Front page</Link>
                  <Link href="/views/dashboard">Dashboard</Link>
                  <Link href="/views/login">Login</Link>
                  <Link href="/views/register">Register</Link>
                  <Link href="/views/profile">Profile</Link>
                  <Link href="/views/friends">Friends</Link>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </CardContent>
      </Card>
    </>
  );
}
