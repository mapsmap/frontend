import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header(props) {
    const { title } = props;

    return (
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
            >
                {title}
            </Typography>
        </Toolbar>
    );
}