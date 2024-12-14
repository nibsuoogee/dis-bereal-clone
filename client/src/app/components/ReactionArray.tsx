import { Stack } from "@mui/joy";
import {
  FavoriteBorder,
  ThumbUpOffAlt,
  OutletOutlined,
  SentimentVeryDissatisfiedOutlined,
  Favorite,
  ThumbUpAlt,
  MoodOutlined,
  Outlet,
  EmojiEmotions,
  Sick,
} from "@mui/icons-material";
import ReactionButton from "./ReactionButton";
import { useReactionService } from "../services/reactions";
import { useEffect, useState } from "react";
import {
  Post,
  DatabaseOption,
  DBPayload,
  Reaction,
  ReactionCounts,
  ReactionOption,
} from "@types";
import { useDataContext } from "../contexts/DataContext";

/**
 * Display reaction options buttons.
 */
export default function ReactionArray({
  post,
  buttonsDisabled,
}: {
  post: Post;
  buttonsDisabled: boolean;
}) {
  const { currentUser } = useDataContext();
  const { getReactions, getUserReactions, postReaction } = useReactionService();
  const [totalReactions, setTotalReactions] = useState<ReactionCounts>(
    () =>
      Object.fromEntries(
        Object.values(ReactionOption).map((reaction) => [reaction, 0])
      ) as ReactionCounts
  );
  const [userReactions, setUserReactions] = useState<ReactionCounts>(
    () =>
      Object.fromEntries(
        Object.values(ReactionOption).map((reaction) => [reaction, 0])
      ) as ReactionCounts
  );

  async function handleGetReactions() {
    const newReactions = await getReactions(post.postid);
    setTotalReactions(newReactions);
  }

  async function handleGetUserReactions() {
    if (!currentUser?.userid) return;
    const newReactions = await getUserReactions(
      post.postid,
      currentUser.userid
    );
    setUserReactions(newReactions);
  }

  useEffect(() => {
    handleGetReactions();
    handleGetUserReactions();
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
    handleGetUserReactions();
  }

  return (
    <Stack spacing={1} direction={"row"}>
      {Object.values(ReactionOption).map((reaction) => {
        const buttonConfig = {
          love: {
            tooltipText: "I love this",
            IconOutlined: FavoriteBorder,
            IconFilled: Favorite,
          },
          like: {
            tooltipText: "I like this",
            IconOutlined: ThumbUpOffAlt,
            IconFilled: ThumbUpAlt,
          },
          haha: {
            tooltipText: "This made me laugh",
            IconOutlined: MoodOutlined,
            IconFilled: EmojiEmotions,
          },
          wow: {
            tooltipText: "This surprised me",
            IconOutlined: OutletOutlined,
            IconFilled: Outlet,
          },
          angry: {
            tooltipText: "This made me angry",
            IconOutlined: SentimentVeryDissatisfiedOutlined,
            IconFilled: Sick,
          },
        };

        const config = buttonConfig[reaction];
        const IconOutlined = config.IconOutlined;
        const IconFilled = config.IconFilled;

        return (
          <ReactionButton
            key={reaction}
            buttonFunction={() => handlePostReaction(reaction)}
            reactionCount={totalReactions[reaction]}
            disabled={buttonsDisabled}
            tooltipText={config.tooltipText}
          >
            {userReactions[reaction] === 0 ? <IconOutlined /> : <IconFilled />}
          </ReactionButton>
        );
      })}{" "}
    </Stack>
  );
}
