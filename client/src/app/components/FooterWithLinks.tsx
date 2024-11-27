import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Stack,
} from "@mui/joy";
import Image from "next/image";

export default function FooterWithLinks() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
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
            </Stack>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </footer>
  );
}
