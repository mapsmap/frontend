import useStore from "../store";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import TextContentSidebar from "../components/TextContentSidebar";
import VideoBox from "../components/VideoBox"

const sidebar = {
    relatedNodes: [
        { title: "BCI BW > in-brain", url: "#" },
        { title: "Shared planetary computer", url: "#" },
        { title: "DropBox your brain", url: "#" },
        { title: "YouTube your brain", url: "#" },
    ],
};

export default function VideoContentPage({ id }) {
    const content = useStore(state => state.content);
    const { label, videoId } = content[id];

    return (
        <>
            <Header title="Map The Future" />
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                {label}
                            </Typography>
                            <Divider />
                            <VideoBox videoId={videoId} />
                        </Grid>
                        <TextContentSidebar relatedNodes={sidebar.relatedNodes} />
                    </Grid>
                </main>
            </Container>
        </>
    );
}