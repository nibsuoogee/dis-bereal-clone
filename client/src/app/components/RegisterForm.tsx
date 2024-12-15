"use client";

import { Input, Select, Option, Button, Stack } from "@mui/joy";
import { DatabaseOption, User } from "../../../types";
import { useState } from "react";
import { useRegisterService } from "@/app/services/register";

export default function RegisterForm() {
  const { register } = useRegisterService();
  const [userdata, setUserdata] = useState<
    Partial<Omit<User, "userid" | "photo" | "creationDate">>
  >({
    username: "",
    fullname: "",
    email: "",
    passwordhash: "",
    database: undefined as DatabaseOption | undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserdata((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: string | null
  ) => {
    setUserdata((prevValues) => ({
      ...prevValues,
      database: value as DatabaseOption,
    }));
  };

  async function handleSubmit() {
    if (
      !userdata.username ||
      !userdata.fullname ||
      !userdata.email ||
      !userdata.passwordhash ||
      !userdata.database
    ) {
      return;
    }
    await register(userdata);
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
          placeholder="full name"
          name="fullname"
          value={userdata.fullname}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="e-mail"
          name="email"
          value={userdata.email}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="password"
          name="passwordhash"
          type="password"
          value={userdata.passwordhash}
          onChange={handleChange}
          required
        />

        <Select
          placeholder="Choose database"
          name="database"
          value={userdata.database || ""}
          onChange={handleSelectChange}
          required
        >
          {Object.entries(DatabaseOption).map(([name, code]) => (
            <Option key={code} value={code}>
              {name}
            </Option>
          ))}
        </Select>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
