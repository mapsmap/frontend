//import useStore from "../store";
import Header from "../components/Header";
import Container from "@mui/material/Container";

export default function TreeOverviewPage() {
    //const content = useStore(state => state.content);

    return (
        <>
            <Header title="MapsMap" />
            <Container maxWidth="lg">
                <main>
                    <h1>Trees</h1>
                </main></Container>
        </>
    );
}