"use client";

import { useDataContext } from "@/app/contexts/DataContext";
import {
  IconButton,
  Input,
  List,
  ListItem,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";
import BadgeIcon from "@mui/icons-material/Badge";
import PublicIcon from "@mui/icons-material/Public";
import PasswordIcon from "@mui/icons-material/Password";
import SaveIcon from "@mui/icons-material/Save";
import { DatabaseOption, DBPayload, User } from "types";
import { timestampToReadableDate } from "../lib/conversions";
import { useUserService } from "../services/users";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { currentUser, setCurrentUser } = useDataContext();
  const { updateUser } = useUserService();

  const [newDetails, setNewDetails] = useState<
    Partial<Omit<User, "photo" | "creationDate" | "database">>
  >({
    userid: currentUser.userid,
    username: "",
    fullname: "",
    email: "",
    passwordhash: "",
  });

  function getDatabaseName(database: DatabaseOption) {
    return Object.keys(DatabaseOption)[
      Object.values(DatabaseOption).indexOf(database)
    ];
  }

  async function handleChangeDetails(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewDetails((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleUpdateUser() {
    const newUser = await updateUser(
      { database: currentUser.database, obj: newDetails } as DBPayload,
      currentUser.userid
    );
    if (newUser) {
      setCurrentUser(newUser);
    }
  }

  useEffect(() => {
    setNewDetails((prevValues) => ({
      ...prevValues,
      userid: currentUser.userid,
    }));
  }, [currentUser]);

  return (
    <>
      <List>
        <ListItem>
          <ListItemDecorator>
            <IconButton disabled>
              <BadgeIcon />
            </IconButton>
          </ListItemDecorator>
          {currentUser?.userid ?? "No user id"}
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <IconButton disabled>
              <PersonIcon />
            </IconButton>
          </ListItemDecorator>
          {currentUser?.username ?? "No username"}
          <Input
            placeholder="new username"
            value={newDetails.username}
            name="username"
            onChange={handleChangeDetails}
          />
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <IconButton disabled>
              <ContactsIcon />
            </IconButton>
          </ListItemDecorator>
          {currentUser?.fullname ?? "No full name"}
          <Input
            placeholder="new full name"
            value={newDetails.fullname}
            name="fullname"
            onChange={handleChangeDetails}
          />
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <IconButton disabled>
              <AlternateEmailIcon />
            </IconButton>
          </ListItemDecorator>
          {currentUser?.email ?? "No email"}
          <Input
            placeholder="new email"
            value={newDetails.email}
            name="email"
            onChange={handleChangeDetails}
          />
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <IconButton disabled>
              <PasswordIcon />
            </IconButton>
          </ListItemDecorator>
          <Typography level="body-xs">Password private</Typography>
          <Input
            placeholder="new password"
            value={newDetails.passwordhash}
            name="passwordhash"
            onChange={handleChangeDetails}
          />
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <IconButton disabled>
              <CalendarTodayIcon />
            </IconButton>
          </ListItemDecorator>
          {currentUser?.creationdate
            ? timestampToReadableDate(currentUser.creationdate)
            : "No creation date"}
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <IconButton disabled>
              <PublicIcon />
            </IconButton>
          </ListItemDecorator>
          {getDatabaseName(currentUser?.database as DatabaseOption) ??
            "No database"}
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <IconButton onClick={handleUpdateUser}>
              <SaveIcon />
            </IconButton>
          </ListItemDecorator>

          <Typography level="body-sm">Save changes</Typography>
        </ListItem>
      </List>
    </>
  );
}
