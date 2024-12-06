"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Card,
  Stack,
} from "@mui/joy";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import { useUserService } from "../services/users";

export default function DEVChangeUser() {
  const { setCurrentUser } = useDataContext();
  const { getUsers } = useUserService();
  const [users, setUsers] = useState<User[]>([]);

  async function handleSetUser(newUser: User) {
    setCurrentUser(newUser);
  }

  async function handleGetUsers() {
    const newUsers = await getUsers();
    setUsers(newUsers);
  }

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <>
      <Card>
        <AccordionGroup>
          <Accordion>
            <AccordionSummary>DEV: Sign in as user</AccordionSummary>
            <AccordionDetails>
              <Stack
                spacing={1}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {users.map((user, index) => {
                  return (
                    <Button
                      key={index}
                      variant="outlined"
                      color="neutral"
                      onClick={() => handleSetUser(user)}
                    >
                      {user.username}
                    </Button>
                  );
                })}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </Card>
    </>
  );
}
