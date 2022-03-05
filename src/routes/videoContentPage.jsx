import useStore from "../store";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import TextContentSidebar from "../components/TextContentSidebar";
import VideoBox from "../components/VideoBox"

export default function VideoContentPage({ id }) {
    const content = useStore(state => state.content);
    const { videoId } = content[id];

    const trees = useStore(state => state.trees);
    const relatedExampleNodes = trees["0"].nodes;

    return (
        <>
            <Header title="Map The Future" />
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                        <Grid item xs={12} md={8}>
                            <VideoBox videoId={videoId} />
                        </Grid>
                        <TextContentSidebar relatedNodes={relatedExampleNodes} />
                    </Grid>
                </main>
            </Container>
        </>
    );
}