import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function HomeGrid(props){
    return (
            <Box sx={{ width: 300, height: 300 }}>
            <Grid container 
            justifyContent = "right"
            alignItems = "center"
            rowSpacing = {1}
            columnSpacing = {{ xs: 1, sm: 2, md: 3 }}
                spacing={3}>
                <Grid item xs={3}>
                <Item>Topic 1</Item>
                </Grid>
                <Grid item xs={3}>
                <Item>Topic 2</Item>
                </Grid>
                <Grid item xs={3}>
                <Item>Topic 3</Item>
                </Grid>
                <Grid item xs={3}>
                <Item>Topic 4</Item>
                </Grid>
            </Grid>
            </Box>
      );
    }