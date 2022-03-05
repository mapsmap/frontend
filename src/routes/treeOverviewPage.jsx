import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent'
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
                    <Typography variant="h4" color="white" gutterBottom sx={{ mt: 3 }}>Trees</Typography>
                    {
                        Object.keys(trees).map(treeId => {
                            return (
                                <Card sx={{ maxWidth: 325, maxHeight: 400 }} key={treeId}>
                                    <CardContent sx={{ padding: "1rem", alignItems: "center", justifyContent: "center" }}>
                                        <Link display="block" variant="body1" color="inherit" to={`/tree/${treeId}`} key={trees[treeId].title} >
                                            <div><iframe src={`/tree/${treeId}#sans-header`} title={`${trees[treeId].title}`}></iframe></div>
                                            <div>{trees[treeId].title}</div>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </main>
            </Container>
        </>
    );
}