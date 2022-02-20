import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import TextContent from "../components/TextContent";
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

export default function VideoContentPage() {
    return (
        <Container maxWidth="lg">
            <Header title="Map The Future">
                </Header>
            <main>
                <VideoBox></VideoBox>
                <TextContentSidebar relatedNodes={sidebar.relatedNodes}>

                </TextContentSidebar>

            </main>
        </Container>
    );
}