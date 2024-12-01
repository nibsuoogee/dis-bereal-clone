import { Button } from "@mui/joy";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { usePostService } from "@/app/services/posts";

export default function VideoUpload({
  handleGetPosts,
}: {
  handleGetPosts: () => void;
}) {
  const { uploadPost } = usePostService();

  async function handleVideoUpload(event: any) {
    event.preventDefault();

    if (event.target.files?.length > 0) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append("file", file);

      await uploadPost(formData);
      handleGetPosts();
    }
  }

  return (
    <>
      <input
        type="file"
        name="video"
        id="video-upload"
        style={{ display: "none" }}
        onChange={(event) => handleVideoUpload(event)}
      />
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={<CloudUploadIcon />}
        htmlFor="video-upload"
      >
        Upload a video
      </Button>
    </>
  );
}
