import { Typography, Input } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <PageLayoutShell>
      <Typography level="h1">Login</Typography>
      <LoginForm></LoginForm>
    </PageLayoutShell>
  );
}
