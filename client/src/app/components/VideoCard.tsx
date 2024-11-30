import { Card, CardContent, CardCover, Grid, Typography } from "@mui/joy";
import { post } from "../../../../shared/types";
import { API_CONFIG } from "@/app/config/api";

export default function VideoCard({ post }: { post: post }) {
  return (
    <Grid xs={12} sm={6} md={3}>
      <Card sx={{ height: "300px", width: "169px" }}>
        <CardCover>
          <video autoPlay muted controls>
            <source
              src={`${API_CONFIG.baseURL}/api/posts/${post.postid}`}
              type="video/mp4"
            />
          </video>
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: "lg", mt: { xs: 12, sm: 18 } }}
          >
            Video ID: {post.postid}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
