import Box from "@mui/material/Box"

export default function YoutubeVideoPlayer({ videoId }) {
    const src = `https://www.youtube.com/embed/${videoId}`;

    return (
        <Box sx={{ paddingTop: "2%" }}>
            <iframe width="560" height="315" src={src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Box>
    )
}