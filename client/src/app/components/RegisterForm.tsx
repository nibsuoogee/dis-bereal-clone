import { Input, Select, Option, Button, Stack } from "@mui/joy";
import { Continents, User } from "../../../types";
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
    passwordHash: "",
    continent: "",
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
      continent: value || "",
    }));
  };

  async function handleSubmit() {
    if (
      !userdata.username ||
      !userdata.fullname ||
      !userdata.email ||
      !userdata.passwordHash ||
      !userdata.continent
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
          name="passwordHash"
          value={userdata.passwordHash}
          onChange={handleChange}
          required
        />

        <Select
          placeholder="Choose continent"
          name="constinent"
          value={userdata.continent}
          onChange={handleSelectChange}
          required
        >
          {Object.values(Continents).map((continent) => (
            <Option key={continent} value={continent}>
              {continent}
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
