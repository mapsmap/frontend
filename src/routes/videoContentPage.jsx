import Container from "@mui/material/Container";
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

export default function VideoContentPage() {
    return (
        <>
            <Header title="Map The Future" />
            <Container maxWidth="lg">
                <main>
                    <VideoBox></VideoBox>
                    <TextContentSidebar relatedNodes={sidebar.relatedNodes}>

                    </TextContentSidebar>

                </main>
            </Container>
        </>
    );
}