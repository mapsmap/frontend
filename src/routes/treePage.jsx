import ReactFlow, { Background } from "react-flow-renderer";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import Header from "../components/Header";
import RootNode from "../components/RootNode";
import ChildNode from "../components/ChildNode";
import RemoveButtonEdge from "../components/RemoveButtonEdge";
import useStore from "../store";
import { save, roamimport } from "../algorand";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import * as filestack from 'filestack-js';
const client = filestack.init('ArlTDWwZTsCWKOl4lISx2z');

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

const getNodes = (treeId, rawNodes) => {
    let nodes = [];
    rawNodes.forEach(rawNode => {
        let data = {
            label: rawNode.title,
            treeId: treeId,
        };
        const node = {
            ...rawNode,
            data: data,
        };
        nodes.push(node);
    })
    return nodes;
}



const getEdges = (treeId, nodes) => {
    let edges = [];
    nodes
        .filter(node => node.childNodes)
        .forEach(node => {
            const targetId = node.id;
            node.childNodes.forEach(sourceId => {
                edges.push({
                    id: "e" + sourceId + "-" + targetId,
                    data: {
                        treeId: treeId,
                    },
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
    const { treeId } = useParams();
    const content = useStore(state => state.content);
    const trees = useStore(state => state.trees);
    const rawNodes = trees[treeId].nodes;
    // TODO: only re-run when treeId or rawNodes changed
    const nodes = getNodes(treeId, rawNodes);
    const edges = getEdges(treeId, nodes);
    const elements = [...nodes, ...edges];

    const addEdge = useStore(state => state.addEdge);
    const onConnectEdge = ({ source, target }) => addEdge(source, target);

    const updateNodePosition = useStore(state => state.updateNodePosition);
    const onNodeDragStop = (event, node) => updateNodePosition(treeId, node.id, node.position);

    return (
        <>
            <Header title="MapsMap" />
            <Box
                id="sans-header"
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
                    onClick={e => save(treeId, rawNodes, content)}
                    variant="extended"
                    sx={{
                        position: "fixed",
                        zIndex: "10",
                        bottom: "1rem",
                        right: "2rem",
                    }}
                >
                    <SaveIcon sx={{ mr: 1 }} />
                    Save
                </Fab>
                <Fab
                    onClick={e => client.picker().open()}
                    variant="extended"
                    sx={{
                        position: "fixed",
                        zIndex: "10",
                        bottom: "5rem",
                        right: "1rem",
                    }}
                >
                    <SaveIcon sx={{ mr: 1 }} />
                    Impost
                </Fab>
               
                    


            </Box>
        </>
    );
}