import { Stack } from "@mui/joy";
import { Post } from "../../../../server/types";
import {
  FavoriteBorder,
  ThumbUpOffAlt,
  Mood,
  OutletOutlined,
  SentimentVeryDissatisfiedOutlined,
} from "@mui/icons-material";
import ReactionButton from "./ReactionButton";

/**
 * Display reaction options with total reaction counts.
 */
export default function ReactionArray() {
  return (
    <Stack spacing={1} direction={"row"}>
      <ReactionButton reactionCount={0}>
        <FavoriteBorder />
      </ReactionButton>
      <ReactionButton reactionCount={0}>
        <ThumbUpOffAlt />
      </ReactionButton>
      <ReactionButton reactionCount={0}>
        <Mood />
      </ReactionButton>
      <ReactionButton reactionCount={0}>
        <OutletOutlined />
      </ReactionButton>
      <ReactionButton reactionCount={0}>
        <SentimentVeryDissatisfiedOutlined />
      </ReactionButton>
    </Stack>
  );
}
