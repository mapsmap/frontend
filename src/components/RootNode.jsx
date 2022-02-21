import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import useStore from "../store";

const RootNode = ({ id, data, isConnectable, targetPosition = "left" }) => {
    const navigate = useNavigate();
    const addChildNode = useStore(state => state.addChildNode);

    const onDoubleClickNode = (evt, id) => {
        evt.stopPropagation();
        navigate(`/content/${id}`);
    }

    return (
        <div className="react-flow__node-output" onDoubleClick={(evt) => onDoubleClickNode(evt, id)}>
            <Handle
                type="target"
                position={targetPosition}
                isConnectable={isConnectable}
            />

            {data.label}

            <Grid container justify="space-between">
                <Grid item>
                    <IconButton onClick={e => addChildNode(id)} size="small" color="success" aria-label="add child node" component="span">
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}

export default memo(RootNode);