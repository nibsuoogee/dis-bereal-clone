"use client";

import { useState, useEffect } from "react";
import {
  Textarea,
  Button,
  Stack,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Sheet,
} from "@mui/joy";
import { useCommentService } from "../services/comments";
import { useDataContext } from "../contexts/DataContext";
import ClearIcon from "@mui/icons-material/Clear";
import { UUIDTypes } from "uuid";
import { Comment, DatabaseOption, DBPayload } from "@types";

export default function CommentSection({
  postid,
  database,
}: {
  postid: UUIDTypes | null;
  database: DatabaseOption;
}) {
  const { getComments, uploadComment, deleteComment } = useCommentService();
  const { currentUser } = useDataContext();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  async function fetchComments() {
    if (!postid || !database) return;
    const fetchedComments = await getComments(postid, database);
    setComments(fetchedComments);
  }

  useEffect(() => {
    fetchComments();
  }, [postid, database]);

  const handleSubmit = async () => {
    if (newComment.trim() === "") return;
    if (!postid || !database) return;

    const comment = {
      postid,
      text: newComment,
      userid: currentUser?.userid as UUIDTypes,
    };
    const payload: DBPayload = {
      database: database,
      obj: comment,
    };
    await uploadComment(payload);
    setNewComment("");
    const updatedComments = await getComments(postid, database);
    setComments(updatedComments);
  };

  const handleDelete = async (commentid: UUIDTypes) => {
    if (!postid || !commentid || !database) return;
    await deleteComment(commentid, database);
    const updatedComments = await getComments(postid, database);
    setComments(updatedComments);
  };

  return (
    <>
      <div className="max-h-[600px] overflow-auto w-full">
        {comments.map((comment: Comment & { username?: string }) => (
          <Box
            key={comment.commentid.toString()}
            sx={{
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              mb: 1,
              maxHeight: "200px",
            }}
          >
            <Typography level="body-md" sx={{ fontWeight: "bold" }}>
              {comment.username ?? "Anonymous"}
            </Typography>

            <Typography level="body-md" sx={{ mt: 1 }}>
              {comment.text}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                {new Date(comment.timestamp)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", " at")}
              </Typography>

              {currentUser?.userid === comment.userid && (
                <Tooltip title="Delete comment">
                  <IconButton
                    onClick={() => handleDelete(comment.commentid)}
                    size="sm"
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>
        ))}
      </div>
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        minRows={3}
        maxRows={5}
        sx={{
          resize: "none",
          border: "1px solid #ccc",
          borderRadius: "2px",
          p: 1,
          width: "100%",
        }}
      />
      <Button
        color="neutral"
        variant="outlined"
        onClick={handleSubmit}
        disabled={!newComment.trim()}
      >
        Post Comment
      </Button>
    </>
  );
}
