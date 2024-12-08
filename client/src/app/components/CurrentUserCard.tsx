"use client";

import { useDataContext } from "@/app/contexts/DataContext";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  Button,
  Card,
  CardContent,
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
import { useState } from "react";
import { DatabaseOption } from "types";
import { timestampToReadableDate } from "../lib/conversions";

export default function CurrentUserCard() {
  const { currentUser } = useDataContext();
  const [showDetails, setShowDetails] = useState(false);
  function getDatabaseName(database: DatabaseOption) {
    return Object.keys(DatabaseOption)[
      Object.values(DatabaseOption).indexOf(database)
    ];
  }

  return (
    <>
      <Card variant="soft">
        <CardContent orientation="horizontal">
          <div>
            <Typography level="body-xs">Logged in as</Typography>
            <Typography
              maxWidth={"200px"}
              sx={{
                fontSize: "lg",
                fontWeight: "lg",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentUser.username ?? "No username"}
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="md"
            color="neutral"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            onClick={() => setShowDetails(!showDetails)}
          >
            Details
          </Button>
        </CardContent>
        <CardContent orientation="horizontal">
          <AccordionGroup>
            <Accordion
              expanded={showDetails}
              sx={{ minHeight: showDetails ? "auto" : 0 }}
            >
              <AccordionDetails>
                <Typography
                  id="decorated-list-demo"
                  level="body-xs"
                  sx={{ textTransform: "uppercase", fontWeight: "lg", mb: 1 }}
                >
                  Your details
                </Typography>
                <List>
                  <ListItem>
                    <ListItemDecorator>
                      <BadgeIcon />
                    </ListItemDecorator>{" "}
                    {currentUser.userid ?? "No user id"}
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <PersonIcon />
                    </ListItemDecorator>{" "}
                    {currentUser.username ?? "No username"}
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <ContactsIcon />
                    </ListItemDecorator>{" "}
                    {currentUser.fullname ?? "No full name"}
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <AlternateEmailIcon />
                    </ListItemDecorator>{" "}
                    {currentUser.email ?? "No email"}
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <PasswordIcon />
                    </ListItemDecorator>{" "}
                    <Typography level="body-xs">Password private</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <CalendarTodayIcon />
                    </ListItemDecorator>
                    {currentUser.creationdate
                      ? timestampToReadableDate(currentUser.creationdate)
                      : "No creation date"}
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <PublicIcon />
                    </ListItemDecorator>{" "}
                    {getDatabaseName(currentUser.database as DatabaseOption) ??
                      "No database"}
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </CardContent>
      </Card>
    </>
  );
}
