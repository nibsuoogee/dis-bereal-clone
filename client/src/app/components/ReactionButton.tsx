import { IconButton, Stack, Typography } from "@mui/joy";

/**
 * A reaction button that displays the number of reactions.
 * @param children The icon to display in the button.
 * @param buttonFunction The function to call when the button is clicked.
 * @param reactionCount The number of reactions of this type.
 */
export default function ReactionButton({
  children,
  buttonFunction,
  reactionCount,
}: {
  children: React.ReactNode;
  buttonFunction: () => void;
  reactionCount: number;
}) {
  return (
    <Stack spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
      <Typography level="body-sm" sx={{ fontWeight: "lg" }}>
        {reactionCount}
      </Typography>
      <IconButton onClick={buttonFunction}>{children}</IconButton>
    </Stack>
  );
}
