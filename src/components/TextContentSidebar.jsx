import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function TextContentSidebar(props) {
    const { relatedNodes } = props;

    return (
        <Grid item xs={12} md={4} sx={{ color: "white" }}>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Related Nodes
            </Typography>
            {relatedNodes.map((relatedNode) => (
                <Link display="block" variant="body1" href={relatedNode.url} key={relatedNode.title}>
                    {relatedNode.title}
                </Link>
            ))}
        </Grid>
    );
}