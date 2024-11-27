import { Card, CardContent, Grid, Typography } from "@mui/joy";

export default function VideoCard({ videoId }: { videoId: string }) {
  return (
    <Grid xs={12} md={4} lg={3}>
      <Card variant="outlined" sx={{ height: "300px", width: "169px" }}>
        <CardContent>
          <Typography level="title-md">Video ID: {videoId}</Typography>
          <Typography>A video should be displayed here</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
