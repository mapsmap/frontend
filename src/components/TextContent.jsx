import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function TextContent(props) {
    const { title, doc } = props;

    return (
        <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Divider />
            <div>{doc}</div>
        </Grid>
    );
}