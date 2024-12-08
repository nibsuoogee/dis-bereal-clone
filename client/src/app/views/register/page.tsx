"use client";

import { Typography } from "@mui/joy";
import PageLayoutShell from "../../components/PageLayoutShell";
import RegisterForm from "../../components/RegisterForm";

export default function Register() {
  return (
    <PageLayoutShell>
      <Typography level="h1">Register</Typography>
      <RegisterForm></RegisterForm>
    </PageLayoutShell>
  );
}
