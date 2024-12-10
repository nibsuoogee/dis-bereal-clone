"use client";

import { Input, Button, Stack } from "@mui/joy";
import { useState } from "react";
import { useUserService } from "@/app/services/users";
import { useDataContext } from "../contexts/DataContext";

export default function RegisterForm() {
  const { login } = useUserService();
  const { setCurrentUser } = useDataContext();

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

    let user = await login(userdata);
    if (user) {
      setCurrentUser(user);
    }
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
          type="password"
        />

        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
