import React from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import useStore from "../store";

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
                    animated: true,
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
        >
            <Background color="#aaa" gap={16} />
        </ReactFlow>
    )
}