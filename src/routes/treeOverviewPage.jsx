import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useStore from "../store";

export default function TreeOverviewPage() {
    const trees = useStore(state => state.trees);

    return (
        <>
            <Header title="MapsMap" />
            <Container maxWidth="lg">
                <main>
                    <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Trees</Typography>
                    {
                        Object.keys(trees).map(treeId => {
                            return (
                                <Link display="block" variant="body1" to={`/tree/${treeId}`} key={trees[treeId].title} >
                                    {trees[treeId].title}
                                </Link>
                            )
                        })
                    }
                </main>
            </Container>
        </>
    );
}