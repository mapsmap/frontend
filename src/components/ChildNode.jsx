import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Handle } from "react-flow-renderer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useStore from "../store";
import useStoreLocal from "../storeLocal";

const ChildNode = ({ id, data, isConnectable, targetPosition = "left", sourcePosition = "right" }) => {
    const navigate = useNavigate();
    const removeNode = useStore(state => state.removeNode);
    const openDialog = useStoreLocal(state => state.openDialog);

    const { treeId } = data;
    const trees = useStore(state => state.trees);
    const nodes = trees[treeId].nodes;

    const onDoubleClickNode = (evt, id) => {
        evt.stopPropagation();
        const contentId = nodes.find(node => node.id === id).contentId;
        navigate(`/content/${contentId}`);
    }

    const handleCreate = (treeId, id) => {
        openDialog("createNode", { treeId: treeId, id: id });
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
                    <IconButton onClick={e => handleCreate(treeId, id)} size="small" color="success" aria-label="add child node" component="span">
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