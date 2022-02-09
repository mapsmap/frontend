import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import {display} from '@mui/system'


function card(name) {return(
  <Card sx={{height:100, width:100}} style ={{backgroundColor: "#F7F773"}}>
    <CardContent sx={{padding: 4}}>
      <Typography sx={{ fontSize: 14}} align="center">{name}</Typography>
    </CardContent>
  </Card>)
}


export default function HomeGrid(props){
    return (
      <Container maxWidth="sm">
          <Box sx={{ width: '100%', padding: "5%"}}>
            <Grid container spacing = {5} rowSpacing = {5} columnSpacing={1} direction="row">
                <Grid item xs={4}>
                  {card("topic 1")}
                </Grid>
                <Grid item xs={4}>
                  {card("topic 2")}
                </Grid>
                <Grid item xs={4}>
                  {card("topic 3")}
                </Grid>
                <Grid item xs={4}>
                  {card("topic 4")}
                </Grid>
                <Grid item xs={4}>
                  {card("topic 5")}
                </Grid>
                <Grid item xs={4}>
                  {card("topic 6")}
                </Grid>
            </Grid>
            </Box>
      </Container>
      );
    }