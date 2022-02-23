import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { PickerOverlay } from 'filestack-react';

export default function TextContent(props) {
    const { text } = props;

    return (
        <Grid item xs={12} md={8}>
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
