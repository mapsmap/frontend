import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import useStore from "../store";

function TopicCard(props) {
  return <Card sx={{ maxWidth: 300 }} style={{ backgroundColor: "#F7F773" }} key={props.name}>
    <CardContent sx={{ margin: "1rem" }}>
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
              <Link to="/tree" style={{ textDecoration: "none" }}>
                <TopicCard name={topics[key].name} />
              </Link>
            </Grid>
          ))}
          <Grid item xs={4} >
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}