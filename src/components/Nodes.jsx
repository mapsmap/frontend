import React from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import RemoveButtonEdge from "./RemoveButtonEdge";
import useStore from "../store";

const edgeTypes = {
    removeButton: RemoveButtonEdge
}

const fitView = (reactFlowInstance) => {
    // console.log('Flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
};

const getEdges = (nodes) => {
    let edges = [];
    nodes
        .filter(node => node.childNodes)
        .forEach(node => {
            const sourceId = node.id;
            node.childNodes.forEach(targetId => {
                edges.push({
                    id: "e" + sourceId + "-" + targetId,
                    source: sourceId,
                    target: targetId,
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

    return (
        <ReactFlow
            elements={elements}
            onLoad={fitView}
            edgeTypes={edgeTypes}
        >
            <Background color="#aaa" gap={16} />
        </ReactFlow>
    )
}