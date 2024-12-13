import { useState, useEffect } from "react";
import { Textarea, Button, Stack, Typography } from "@mui/joy";
import { useCommentService } from "../services/comments";
import { useDataContext } from "../contexts/DataContext";
import { UUIDTypes } from "@types"; 

export default function CommentSection({ postid }: { postid: UUIDTypes | null}) {
  const { getComments, uploadComment } = useCommentService();
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

  return (
    <Stack spacing={2}>
      {comments ? comments.map((comment)=>(<Typography
          level="body-md"
        >
          {comment?.text}
      </Typography>)) : ""}

      <Stack spacing={1}>
        {comments.map((comment: { content: string; commentid: UUIDTypes }) => (
          <div key={comment.commentid.toString()}>
            {comment.content}
          </div>
        ))}
      </Stack>
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <Button onClick={handleSubmit} disabled={!newComment.trim()}>
        Post Comment
      </Button>
    </Stack>
  );
}