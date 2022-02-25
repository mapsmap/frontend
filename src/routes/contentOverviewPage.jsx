import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useStore from "../store";

export default function TreeOverviewPage() {
    const content = useStore(state => state.content);

    const getText = (content) => {
        if (content.text === "") {
            return "Empty content"
        }
        if (content.text != null) {
            return content.text;
        }

        return `Video: ${content.videoId}`
    }

    return (
        <>
            <Header title="MapsMap" />
            <Container maxWidth="lg">
                <main>
                    <Typography variant="h4" color="white" gutterBottom sx={{ mt: 3 }}>Content</Typography>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <List>
                            {
                                Object.keys(content).map(contentId => (
                                    <Link to={`/content/${contentId}`} key={contentId} >
                                        <ListItem>
                                            <ListItemButton sx={{ maxWidth: "100%" }}>
                                                <ListItemText
                                                    primary={getText(content[contentId])}
                                                    primaryTypographyProps={{
                                                        variant: 'subtitle2',
                                                        style: {
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        }
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                ))
                            }
                        </List>
                    </Box>
                </main>
            </Container>
        </>
    );
}