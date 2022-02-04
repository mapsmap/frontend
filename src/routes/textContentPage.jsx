import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import TextContent from "../components/TextContent";
import TextContentSidebar from "../components/TextContentSidebar";

const title = "New mind substrate";
const doc = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Aenean non nisl quis felis posuere finibus.
    In varius aliquet rutrum.
    Etiam mattis massa nec mauris posuere auctor.
    In at porttitor mi.
    Nulla ultricies magna id metus sollicitudin, eget cursus odio gravida.
    Vivamus tristique consectetur neque sodales aliquam.
    Proin laoreet scelerisque placerat.
    Proin quis facilisis sem.
    Maecenas accumsan sed erat at lacinia.
    Phasellus erat purus, luctus sit amet orci ac, maximus sollicitudin mauris.
    Phasellus gravida quam et nisl eleifend eleifend.
    Fusce egestas nisl euismod bibendum efficitur.
    Vestibulum in tristique velit, sed efficitur lacus.
`;
const sidebar = {
    relatedNodes: [
        { title: "BCI BW > in-brain", url: "#" },
        { title: "Shared planetary computer", url: "#" },
        { title: "DropBox your brain", url: "#" },
        { title: "YouTube your brain", url: "#" },
    ],
};

export default function TextContentPage() {
    return (
        <Container maxWidth="lg">
            <Header title="MapsMap" />
            <main>
                <Grid container spacing={5} sx={{ mt: 3 }}>
                    <TextContent title={title} doc={doc} />
                    <TextContentSidebar relatedNodes={sidebar.relatedNodes} />
                </Grid>
            </main>
        </Container>
    );
}