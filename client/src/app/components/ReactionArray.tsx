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
import { useReactionService } from "../services/reactions";
import { useEffect, useState } from "react";
import {
  DatabaseOption,
  DBPayload,
  Reaction,
  ReactionCounts,
  ReactionOption,
} from "../../../types";
import { useDataContext } from "../contexts/DataContext";

/**
 * Display reaction options buttons.
 */
export default function ReactionArray({ post }: { post: Post }) {
  const { currentUser } = useDataContext();
  const { getReactions, postReaction } = useReactionService();
  const [reactions, setReactions] = useState<ReactionCounts>(
    Object.fromEntries(
      Object.values(ReactionOption).map((reaction) => [reaction, 0])
    ) as ReactionCounts
  );

  async function handleGetReactions() {
    const newReactions = await getReactions(false, post.postid);

    setReactions(newReactions);
  }

  useEffect(() => {
    handleGetReactions();
  }, []);

  async function handlePostReaction(type: ReactionOption) {
    const reaction: Reaction = {
      reactionid: null,
      postid: post.postid,
      userid: currentUser.userid,
      type: type,
      timestamp: null,
    };
    const payload: DBPayload = {
      database: currentUser.database as DatabaseOption,
      obj: reaction,
    };

    await postReaction(payload);
    handleGetReactions();
  }

  return (
    <Stack spacing={1} direction={"row"}>
      <ReactionButton
        buttonFunction={() => handlePostReaction(ReactionOption.love)}
        reactionCount={reactions[ReactionOption.love]}
      >
        <FavoriteBorder />
      </ReactionButton>
      <ReactionButton
        buttonFunction={() => handlePostReaction(ReactionOption.like)}
        reactionCount={reactions[ReactionOption.like]}
      >
        <ThumbUpOffAlt />
      </ReactionButton>
      <ReactionButton
        buttonFunction={() => handlePostReaction(ReactionOption.haha)}
        reactionCount={reactions[ReactionOption.haha]}
      >
        <Mood />
      </ReactionButton>
      <ReactionButton
        buttonFunction={() => handlePostReaction(ReactionOption.wow)}
        reactionCount={reactions[ReactionOption.wow]}
      >
        <OutletOutlined />
      </ReactionButton>
      <ReactionButton
        buttonFunction={() => handlePostReaction(ReactionOption.angry)}
        reactionCount={reactions[ReactionOption.angry]}
      >
        <SentimentVeryDissatisfiedOutlined />
      </ReactionButton>{" "}
    </Stack>
  );
}
