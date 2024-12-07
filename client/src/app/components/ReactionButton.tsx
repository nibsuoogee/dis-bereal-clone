import { IconButton, Stack, Tooltip, Typography } from "@mui/joy";

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
  disabled,
  tooltipText,
}: {
  children: React.ReactNode;
  buttonFunction: () => void;
  reactionCount: number;
  disabled: boolean;
  tooltipText: string;
}) {
  return (
    <Stack spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
      <Typography level="body-sm" sx={{ fontWeight: "lg" }}>
        {reactionCount}
      </Typography>
      <Tooltip title={tooltipText} variant="plain">
        <IconButton disabled={disabled} onClick={buttonFunction}>
          {children}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
