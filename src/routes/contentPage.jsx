import { useParams } from "react-router-dom";
import useStore from "../store";
import TextContentPage from "./textContentPage";
import VideoContentPage from "./videoContentPage";

export default function ContentPage() {
    const { contentId } = useParams();
    const content = useStore(state => state.content);
    const type = content[contentId].type;

    if (type === "text") {
        return (
            <TextContentPage id={contentId} />
        );
    }

    if (type === "video") {
        return (
            <VideoContentPage id={contentId} />
        );
    }

    return (<div>ERROR</div>);
}