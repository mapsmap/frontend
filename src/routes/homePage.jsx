import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import HomeImage from "../components/HomeImage";

export default function HomePage() {
    return (
        <>
            <Header title="Map The Future" />
            <Container maxWidth="lg">
                <main>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <HomeImage />
                    </Grid>
                </main>
            </Container>
        </>
    );
}