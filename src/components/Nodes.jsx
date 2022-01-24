import ReactFlow, { Background } from "react-flow-renderer";
import RootNode from "./RootNode";
import ChildNode from "./ChildNode";
import RemoveButtonEdge from "./RemoveButtonEdge";
import useStore from "../store";

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

export default function Nodes() {
    const nodes = useStore(state => state.nodes);
    const edges = getEdges(nodes);
    const elements = [...nodes, ...edges];

    const addEdge = useStore(state => state.addEdge);
    const onConnectEdge = ({ source, target }) => addEdge(source, target);

    const updateNodePosition = useStore(state => state.updateNodePosition);
    const onNodeDragStop = (event, node) => updateNodePosition(node.id, node.position);

    return (
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
    )
}