"use client";

import { Input, Button, Stack } from "@mui/joy";
import { useState } from "react";
import { useUserService } from "@/app/services/users";

export default function RegisterForm() {
  const { login } = useUserService();
  const [userdata, setUserdata] = useState({ username: "", passwordHash: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserdata((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  async function handleSubmit() {
    if (!userdata.username || !userdata.passwordHash) {
      return;
    }

    await login(userdata);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
      }}
    >
      <Stack spacing={1}>
        <Input
          placeholder="username"
          name="username"
          value={userdata.username}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="password"
          name="passwordHash"
          value={userdata.passwordHash}
          onChange={handleChange}
          required
        />

        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
