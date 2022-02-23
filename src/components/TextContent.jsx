import Grid from '@mui/material/Grid';

export default function TextContent(props) {
    const { text } = props;

    return (
        <Grid item xs={12} md={8}>
            <div>{text}</div>
        </Grid>
    );
}