import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PickerOverlay  } from 'filestack-react';

export default function TextContent(props) {
    const { label, text } = props;

    return (
        <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
                {label}
            </Typography>
            <PickerOverlay
              apikey="ArlTDWwZTsCWKOl4lISx2z"
              onSuccess={(res) => console.log(res)}
              onUploadDone={(res) => console.log(res)}
            />
            <Divider />
            <div>{text}</div>
        </Grid>
    );
}
