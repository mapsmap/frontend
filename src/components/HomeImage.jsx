import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import useStore from "../store";
import VideoBox from './VideoBox';

function TopicCard(props) {
  return <Card sx={{ height: 100, width: 100 }} style={{ backgroundColor: "#F7F773" }} key={props.name}>
    <CardContent sx={{ padding: 4 }}>
      <Typography sx={{ fontSize: 14 }} align="center">{props.name}</Typography>
    </CardContent>
  </Card>
}

export default function HomeGrid(props) {
  const topics = useStore(state => state.topics);

  return (
    <Container maxWidth="sm">
      <Box sx={{ width: '100%', padding: "5%" }}>
        <Grid container spacing={5} rowSpacing={5} columnSpacing={1} direction="row">
          {Object.keys(topics).map(key => (
            <Grid item xs={4} key={topics[key].id} >
              <TopicCard name={topics[key].name} />
            </Grid>
          ))}
          <Grid item xs={4} >
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}