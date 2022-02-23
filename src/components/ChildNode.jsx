import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Handle } from "react-flow-renderer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useStore from "../store";

const ChildNode = ({ id, data, isConnectable, targetPosition = "left", sourcePosition = "right" }) => {
    const navigate = useNavigate();
    const addChildNode = useStore(state => state.addChildNode);
    const removeNode = useStore(state => state.removeNode);

    const { treeId } = data;

    const onDoubleClickNode = (evt, id) => {
        evt.stopPropagation();
        // FIXME: content id is not necessarily node id
        navigate(`/content/${id}`);
    }

    return (
        <div className="react-flow__node-default" onDoubleClick={(evt) => onDoubleClickNode(evt, id)}>
            <Handle
                type="target"
                position={targetPosition}
                isConnectable={isConnectable}
            />

            {data.label}

            <Grid container justify="space-between">
                <Grid item>
                    <IconButton onClick={e => addChildNode(treeId, id)} size="small" color="success" aria-label="add child node" component="span">
                        <AddIcon />
                    </IconButton>
                </Grid>
                <Grid item sx={{ marginLeft: "auto" }} >
                    <IconButton onClick={e => removeNode(treeId, id)} size="small" color="error" aria-label="delete node" component="span">
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Handle
                type="source"
                position={sourcePosition}
                isConnectable={isConnectable}
            />
        </div >
    );
}

export default memo(ChildNode);