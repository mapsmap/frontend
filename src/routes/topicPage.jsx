import Container from "@mui/material/Container";
import Header from "../components/Header";
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



function headerCard(name) {
    return (
        <Card sx={{ height: 100, width: 300 }} style={{ backgroundColor: "#F7F773" }}>
            <Typography sx={{ fontSize: 14 }} align="center"><h2>{name}</h2></Typography>
        </Card>
    )
}

function subtopicCard(name) {
    return (<Card sx={{ height: 100, width: 200 }} style={{ backgroundColor: "#F7F773" }}>
        <Typography sx={{ fontSize: 14 }} align="center"><h2>{name}</h2></Typography>
    </Card>)
}


export default function TopicPage() {
    // const topics = useStore(state => state.topics);
    // const topicName = useParams().topicName
    // let topic = Object.keys(topics).find(topic => topic.name === topicName)
    // const topicValues = Object.keys
    // console.log("topicName", topicName)
    // console.log("topics", topics)
    // console.log("topic", topic)
    // console.log("topics[1].name", topics[1].name)
    // const layer1 = Object.values(topics)
    // const layer2 = Object.values(layer1)
    // console.log("Object.values(topics)", Object.values(topics))
    // console.log("layer 2:", layer2)
    // const names = []
    // const findTopics = (topics)=>{
    //     Object.keys(topics).forEach(key => {
    //         console.log(`key: ${key}, value: ${topics[key]} `)
    //         if (typeof topics[key]==='object'&& topics[key] !== null){
    //             findTopics(topics[key])
    //             names.push(topics[key].name)
    //         }
    //     })
    //     console.log( "names",names)
    // }
    // findTopics(topics)

    return (
        <>
            <Header title="Map The Future" />
            <Container>
                <main>
                    <Container justifyContent="flex" alignItems="flex" maxWidth="lg">
                        <Box display="flex" justifyContent="center" alignItems="flex" sx={{ padding: "2%", height: "150px", border: "1px solid black" }}>
                            <Grid containter
                                spacing={0}
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                style={{ minHeight: '100vh' }}>
                                <Grid item xs={3}>
                                    {headerCard("Topic")}
                                </Grid>
                            </Grid>
                        </Box>

                        <Box justifyContent="flex" alignItems="flex" sx={{ width: '100%', padding: "5%" }}>
                            <Grid container justifyContent="flex" alignItems="flex" spacing={5} rowSpacing={5} columnSpacing={1} direction="row">
                                <Grid item xs={3}>
                                    {subtopicCard("subtopic")}
                                </Grid>
                                <Grid item xs={3}>
                                    {subtopicCard("subtopic")}
                                </Grid>
                                <Grid item xs={3}>
                                    {subtopicCard("subtopic")}
                                </Grid>
                                <Grid item xs={3}>
                                    {subtopicCard("subtopic")}
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </main>
            </Container>
        </>
    );

}