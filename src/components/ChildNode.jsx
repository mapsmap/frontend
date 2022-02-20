import { memo } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Handle } from "react-flow-renderer";
import useStore from "../store";

const ChildNode = ({ id, data, isConnectable, targetPosition = "left", sourcePosition = "right" }) => {
    const addChildNode = useStore(state => state.addChildNode);
    const removeNode = useStore(state => state.removeNode);

    const onDoubleClickNode = (evt, id) => {
        evt.stopPropagation();
        addChildNode(id);
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
                    <IconButton onClick={e => addChildNode(id)} size="small" color="success" aria-label="add child node" component="span">
                        <AddIcon />
                    </IconButton>
                </Grid>
                <Grid item sx={{ marginLeft: "auto" }} >
                    <IconButton onClick={e => removeNode(id)} size="small" color="error" aria-label="delete node" component="span">
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