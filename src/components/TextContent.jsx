import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function TextContent(props) {
    const { text } = props;

    return (
        <Grid item xs={12} md={8}>
            <Divider />
            <div>{text}</div>
        </Grid>
    );
}
