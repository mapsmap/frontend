import Header from "../components/Header";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import HomeImage from "../components/HomeImage";
import useStore from "../store";
import FormControl from '@mui/material/FormControl'
import ContentTitleForm from "../components/ContentTitleForm";
import ContentBodyForm from "../components/ContentBodyForm";
import { Box } from "@mui/material";
//import { Link, Redirect } from "react-router-dom"
import PostButton from "../components/PostButton";

export default function UploadPage() {
    // function handleSubmitEvent(event){
    //     event.preventDefault()
    //     return (
    //         <Redirect
    //         to={{
    //             pathname:'/topicPage'
    //         }}/>
    //     )
    // }

    return (
    <Container maxwidth = "lg">
        <Header title="Map the Future">
        </Header>
        <main >
        <Box paddingTop = "2%" justifyContent = "center" alignItems = "center">
            <ContentTitleForm>

            </ContentTitleForm>
            <ContentBodyForm>

            </ContentBodyForm>
           <PostButton></PostButton>
        </Box>
        </main>
    </Container>
    );
   
}
