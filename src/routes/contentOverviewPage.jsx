//import useStore from "../store";
import Header from "../components/Header";
import Container from "@mui/material/Container";

export default function ContentOverviewPage() {
    //const content = useStore(state => state.content);

    return (
        <>
            <Header title="MapsMap" />
            <Container maxWidth="lg">
                <main>
                    <h1>Content</h1>
                </main></Container>
        </>
    );
}