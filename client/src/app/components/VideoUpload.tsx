import { Button, Stack } from "@mui/joy";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { usePostService } from "@/app/services/posts";
import { useState } from "react";

export default function VideoUpload({
  handleGetPosts,
}: {
  handleGetPosts: () => void;
}) {
  const { uploadPost } = usePostService();
  const [file, setFile] = useState<File | null>(null);

  async function handleSetFile(event: any) {
    event.preventDefault();

    if (event.target.files?.length > 0) {
      const file = event.target.files[0];

      setFile(file);
    }
  }

  async function handleVideoUpload() {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    await uploadPost(formData);
    handleGetPosts();
  }

  return (
    <>
      <Stack
        spacing={2}
        direction={"row"}
        sx={{
          justifyContent: "flex-center",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          name="video"
          id="video-upload"
          style={{ display: "none" }}
          onChange={(event) => handleSetFile(event)}
        />
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="neutral"
          startDecorator={<VideoCallIcon />}
          htmlFor="video-upload"
        >
          Select a video
        </Button>
        <Button
          disabled={!file}
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="neutral"
          startDecorator={<CloudUploadIcon />}
          onClick={handleVideoUpload}
        >
          {`Upload ${file?.name ?? ""}`}
        </Button>
      </Stack>
    </>
  );
}
