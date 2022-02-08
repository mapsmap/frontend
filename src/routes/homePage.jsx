import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import HomeImage from "../components/HomeImage";
import gif from "../assets/earth.jpeg"


const homeGif = <img src = {gif} />


export default function HomePage(){
    return (
        <Container maxWidth = "lg">
            <Header title = "Map The Future">
             
            </Header>
            <main>
                <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                    <HomeImage earth = {homeGif}/>
                </Grid>
            </main>   
        </Container>
    );
}
