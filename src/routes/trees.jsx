import ReactFlow, { Background } from "react-flow-renderer";
import RootNode from "../components/RootNode";
import ChildNode from "../components/ChildNode";
import RemoveButtonEdge from "../components/RemoveButtonEdge";
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
}

const getRelevantNodeCidStrings = ({ currentCidString, nodes, cidStrings }) => {
    if (cidStrings.includes(currentCidString)) {
        return cidStrings;
    }

    cidStrings.push(currentCidString);

    nodes[currentCidString].sources.forEach(src => {
        cidStrings.push(...getRelevantNodeCidStrings({
            currentCidString: src.toString(),
            nodes,
            cidStrings
        }));
    });
    return cidStrings;
}

const getFlowNode = ({ cidString, head, items, nodes, nodesMetadata }) => {
    // get title
    const titleCidString = nodes[cidString].title;
    const title = items[titleCidString].doc;

    // get type
    let type = "childNode";
    if (cidString === head.toString()) {
        type = "rootNode";
    }

    // get position
    const position = nodesMetadata[cidString].position;

    return {
        id: cidString,
        data: { label: title },
        type: type,
        position: position
    }
}

const getFlowEdges = ({ cidString, nodes }) => {
    var flowEdges = [];
    const targetCidString = cidString;
    const node = nodes[cidString];

    node.sources.forEach(src => {
        var sourceCidString = src.toString();
        flowEdges.push({
            id: "edge:" + sourceCidString + "-" + targetCidString,
            source: sourceCidString,
            target: targetCidString,
            animated: true,
            type: "removeButton",
        });
    });

    return flowEdges;
}

const getTreeElements = ({ head, items, nodes, nodesMetadata }) => {
    // get relevant nodes recursively
    const relevantNodeCidStrings = [...new Set(
        getRelevantNodeCidStrings({ currentCidString: head.toString(), nodes, cidStrings: [] }))
    ];

    var elements = [];
    for (var cidString of relevantNodeCidStrings) {
        // add node
        elements.push(getFlowNode({
            cidString, head, items, nodes, nodesMetadata
        }))
        // add nodes edges
        elements.push(...getFlowEdges({ cidString, nodes }))
    }

    return elements;
}

export default function Tree() {
    const head = useStore(state => state.head);
    const items = useStore(state => state.items);
    const nodes = useStore(state => state.nodes);
    const nodesMetadata = useStore(state => state.nodesMetadata);
    // TODO: only re-render when head or nodesMetadata changes
    const elements = getTreeElements({ head, items, nodes, nodesMetadata });

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