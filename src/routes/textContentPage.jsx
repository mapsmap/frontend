import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import TextContent from "../components/TextContent";
import TextContentSidebar from "../components/TextContentSidebar";
import useStore from "../store";

const sidebar = {
    relatedNodes: [
        { title: "BCI BW > in-brain", url: "#" },
        { title: "Shared planetary computer", url: "#" },
        { title: "DropBox your brain", url: "#" },
        { title: "YouTube your brain", url: "#" },
    ],
};

export default function TextContentPage({ id }) {
    const content = useStore(state => state.content);
    const { label, text } = content[id];

    return (
        <>
            <Header title="MapsMap" />
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={5} sx={{ mt: 3 }}>
                        <TextContent label={label} text={text} />
                        <TextContentSidebar relatedNodes={sidebar.relatedNodes} />
                    </Grid>
                </main>
            </Container>
        </>
    );
}