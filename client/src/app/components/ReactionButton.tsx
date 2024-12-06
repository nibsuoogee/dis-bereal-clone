import { IconButton, Stack, Typography } from "@mui/joy";

export default function ReactionButton({
  children,
  reactionCount,
}: {
  children: React.ReactNode;
  reactionCount: number;
}) {
  return (
    <Stack spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
      <Typography level="body-sm" sx={{ fontWeight: "lg" }}>
        {reactionCount}
      </Typography>
      <IconButton>{children}</IconButton>
    </Stack>
  );
}
