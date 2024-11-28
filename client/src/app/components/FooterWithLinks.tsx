import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Stack,
} from "@mui/joy";
import Image from "next/image";
import { useDEVService } from "../services/DEV";

export default function FooterWithLinks() {
  const { initDB } = useDEVService();
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <Stack
        spacing={1}
        sx={{
          direction: "row",
        }}
      >
        <AccordionGroup sx={{ maxWidth: 400 }}>
          <Accordion>
            <AccordionSummary>Development links</AccordionSummary>
            <AccordionDetails>
              <Stack
                spacing={1}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://nextjs.org/docs/app/building-your-application"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    aria-hidden
                    src="/file.svg"
                    alt="File icon"
                    width={16}
                    height={16}
                  />
                  NextJS docs for client development
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://mui.com/joy-ui/getting-started/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    aria-hidden
                    src="/file.svg"
                    alt="File icon"
                    width={16}
                    height={16}
                  />
                  MUI joy-ui for styling and components
                </a>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://node-postgres.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    aria-hidden
                    src="/file.svg"
                    alt="File icon"
                    width={16}
                    height={16}
                  />
                  Node Postgres for database integration
                </a>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
        <Button onClick={() => initDB()} variant="outlined" color="neutral">
          DEV: Initialize database
        </Button>
      </Stack>
    </footer>
  );
}
