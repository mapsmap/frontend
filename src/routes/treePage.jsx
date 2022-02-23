import ReactFlow, { Background } from "react-flow-renderer";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import Header from "../components/Header";
import RootNode from "../components/RootNode";
import ChildNode from "../components/ChildNode";
import RemoveButtonEdge from "../components/RemoveButtonEdge";
import useStore from "../store";
import { save } from "../algorand";

const nodeTypes = {
    rootNode: RootNode,
    childNode: ChildNode
}
const edgeTypes = {
    removeButton: RemoveButtonEdge
}

const fitView = (reactFlowInstance) => {
    // console.log("Flow loaded:", reactFlowInstance);
    reactFlowInstance.fitView();
};

const getNodes = (rawNodes) => {
    let nodes = [];
    rawNodes.forEach(rawNode => {
        let data = { label: rawNode.title };
        const node = {
            ...rawNode,
            data: data,
        };
        nodes.push(node);
    })
    return nodes;
}

const getEdges = (nodes) => {
    let edges = [];
    nodes
        .filter(node => node.childNodes)
        .forEach(node => {
            const targetId = node.id;
            node.childNodes.forEach(sourceId => {
                edges.push({
                    id: "e" + sourceId + "-" + targetId,
                    source: sourceId,
                    target: targetId,
                    animated: true,
                    type: "removeButton",
                });
            });
        });
    return edges;
};

export default function TreePage() {
    const content = useStore(state => state.content);
    const rawNodes = useStore(state => state.nodes);
    const nodes = getNodes(rawNodes); // TODO: only re-run when rawNodes
    const edges = getEdges(nodes);
    const elements = [...nodes, ...edges];

    const addEdge = useStore(state => state.addEdge);
    const onConnectEdge = ({ source, target }) => addEdge(source, target);

    const updateNodePosition = useStore(state => state.updateNodePosition);
    const onNodeDragStop = (event, node) => updateNodePosition(node.id, node.position);

    return (
        <>
            <Header title="MapsMap" />
            <Box
                sx={{
                    height: "calc(100vh - 64px)",
                    backgroundColor: "#282c34",
                    color: "white",
                }}
            >
                <ReactFlow
                    elements={elements}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onLoad={fitView}
                    onConnect={onConnectEdge}
                    onNodeDragStop={onNodeDragStop}
                >
                    <Background color="#aaa" gap={16} />
                </ReactFlow>
                <Fab
                    onClick={e => save(rawNodes, content)}
                    variant="extended"
                    sx={{
                        position: "fixed",
                        zIndex: "10",
                        bottom: "1rem",
                        right: "1rem",
                    }}
                >
                    <SaveIcon sx={{ mr: 1 }} />
                    Save
                </Fab>
            </Box>
        </>
    );
}