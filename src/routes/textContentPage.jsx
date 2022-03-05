import { useState, useRef } from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import TextContent from "../components/TextContent";
import TextContentSidebar from "../components/TextContentSidebar";
import useStore from "../store";

export default function TextContentPage({ id }) {
    const content = useStore(state => state.content);
    const { text } = content[id];
    const [editing, setEditing] = useState(false);
    const textField = useRef();

    const trees = useStore(state => state.trees);
    const relatedExampleNodes = trees["0"].nodes;

    const updateContent = useStore(state => state.updateContent);
    const onSave = () => {
        updateContent(
            id,
            {
                ...content[id],
                text: textField.current.value
            }
        );
        setEditing(false);
    }

    if (editing) {
        return (
            <>
                <Header title="MapsMap" />
                <Container maxWidth="lg">
                    <main>
                        <Grid container spacing={5} sx={{ mt: 3 }}>
                            <Grid item xs={12} md={12}>
                                <Box
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: 'flex' },
                                    }}
                                >
                                    <TextField
                                        id="text"
                                        label="Content"
                                        defaultValue={text}
                                        inputRef={textField}
                                        multiline
                                        rows={20}
                                        fullWidth
                                    ></TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        onClick={e => setEditing(false)}
                                        variant="outlined"
                                        color="error"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={onSave}
                                        variant="contained"
                                        color="success"
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </main>
                </Container>
            </>);
    }

    return (
        <>
            <Header title="MapsMap" />
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={5} sx={{ mt: 3, color: "white" }}>
                        <TextContent text={text} />
                        <TextContentSidebar relatedNodes={relatedExampleNodes} />
                        <Grid item xs={12} md={8}>
                            <Button
                                onClick={e => setEditing(true)}
                                variant="contained"
                            >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </main>
            </Container>
        </>
    );
}