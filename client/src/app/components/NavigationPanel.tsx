import { Card, CardContent, Stack } from "@mui/joy";
import {
  HomeOutlined,
  DashboardOutlined,
  LoginOutlined,
  AccountCircleOutlined,
  GroupsOutlined,
  HowToReg,
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
            <LinkIconButton linkPath="/views/profile" tooltipText="Profile">
              <AccountCircleOutlined />
            </LinkIconButton>
            <LinkIconButton linkPath="/views/friends" tooltipText="Friends">
              <GroupsOutlined />
            </LinkIconButton>
            <LinkIconButton linkPath="/views/login" tooltipText="login">
              <LoginOutlined />
            </LinkIconButton>
            <LinkIconButton linkPath="/views/register" tooltipText="Register">
              <HowToReg />
            </LinkIconButton>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
