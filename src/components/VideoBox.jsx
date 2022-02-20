import Box from "@mui/material/Box"


var mp = new MuiPlayer({
    containter: '#mui-player',
    title:'Title',
    src: './static/media/media.mp4'
})

export default function VideoBox(){
    return(
        <Box sx = {{paddingTop: "2%"}}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/cOubCHLXT6A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Box>
    )
}