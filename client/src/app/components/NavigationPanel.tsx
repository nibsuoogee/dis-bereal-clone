import { Card, CardContent, Stack } from "@mui/joy";
import {
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  AccountCircleOutlined,
  GroupsOutlined,
} from "@mui/icons-material";
import LinkIconButton from "./LinkIconButton";

/**
 * A navigation panel that displays a list of links to app pages.
 */
export default function NavigationPanel() {
  return (
    <>
      <Card variant="soft">
        <CardContent orientation="horizontal">
<<<<<<< HEAD
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
=======
          <Stack
            spacing={1}
            direction={"row"}
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <LinkIconButton linkPath="/" tooltipText="Home page">
              <HomeOutlined />
            </LinkIconButton>
            <LinkIconButton linkPath="/views/dashboard" tooltipText="Dashboard">
              <DashboardOutlined />
            </LinkIconButton>
            <LinkIconButton linkPath="/views/login" tooltipText="login">
              <LoginOutlined />
            </LinkIconButton>
            <LinkIconButton linkPath="/views/profile" tooltipText="Profile">
              <AccountCircleOutlined />
            </LinkIconButton>
            <LinkIconButton linkPath="/views/friends" tooltipText="Friends">
              <GroupsOutlined />
            </LinkIconButton>
          </Stack>
>>>>>>> main
        </CardContent>
      </Card>
    </>
  );
}
