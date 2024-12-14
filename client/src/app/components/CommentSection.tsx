import { useState, useEffect } from "react";
import { Textarea, Button, Stack, Typography, Box, IconButton, Tooltip } from "@mui/joy";
import { useCommentService } from "../services/comments";
import { useDataContext } from "../contexts/DataContext";
import { UUIDTypes } from "@types";
import ClearIcon from "@mui/icons-material/Clear";

export default function CommentSection({ postid }: { postid: UUIDTypes | null }) {
  const { getComments, uploadComment, deleteComment } = useCommentService();
  const { currentUser } = useDataContext();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      try {
        const fetchedComments = await getComments(postid);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, [postid]);

  const handleSubmit = async () => {
    if (newComment.trim() === "") return;

    const commentPayload = {
      postid,
      content: newComment,
      userid: currentUser?.userid as UUIDTypes,
    };

    try {
      await uploadComment(commentPayload);
      setNewComment("");
      const updatedComments = await getComments(postid);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDelete = async (commentid: UUIDTypes) => {
    try {
      await deleteComment(commentid); 

      const updatedComments = await getComments(postid);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          maxHeight: "600px",
          overflowY: "auto",
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: "2px",
          backgroundColor: "#f9f9f9",
          scrollbarWidth: "none",
        }}
      >
        {comments.map((comment: { content: string; username: string; timestamp: string; commentid: UUIDTypes, userid: UUIDTypes }) => (
          <Box
            key={comment.commentid.toString()}
            sx={{
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              mb: 1,
            }}
          >
            <Typography level="body-md" sx={{ fontWeight: "bold" }}>
              {comment.username ?? "Anonymous"}
            </Typography>

            <Typography level="body-md" sx={{ mt: 1 }}>
              {comment.content}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                {new Date(comment.timestamp).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }).replace(",", " at")}
              </Typography>

              {currentUser?.userid === comment.userid && (
                <Tooltip title="Delete comment">
                  <IconButton onClick={() => handleDelete(comment.commentid)} size="sm">
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>
        ))}
      </Box>
      
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        minRows={3}
        maxRows={5}
        sx={{ resize: "none", border: "1px solid #ccc", borderRadius: "2px", p: 1 }}
      />
      <Button onClick={handleSubmit} disabled={!newComment.trim()}>
        Post Comment
      </Button>
    </Stack>
  );
}