import create from "zustand";
import produce, { produceWithPatches } from "immer";

const removeEdge = (state, sourceId, targetId) => {
    return produce(state, draft => {
        const targetNode = draft.nodes.find(node => node.id === targetId);
        targetNode.childNodes = targetNode.childNodes.filter(id => id !== sourceId);
    });
}

const useStore = create(set => ({
    nodes: [
        {
            id: "0",
            data: { label: "Root" },
            childNodes: ["1", "2"],
            type: "rootNode",
            position: { x: 0, y: 0 }
        },
        {
            id: "1",
            data: { label: "Child 1" },
            childNodes: ["3"],
            type: "childNode",
            position: { x: -250, y: 80 }
        },
        {
            id: "2",
            data: { label: "Child 2" },
            type: "childNode",
            position: { x: -250, y: -80 }
        },
        {
            id: "3",
            data: { label: "Child 1.1" },
            type: "childNode",
            position: { x: -500, y: 80 }
        },
    ],
    addNode: (node, targetId) =>
        set(state => ({ nodes: [...state.nodes, node] })),
    removeEdge: (sourceId, targetId) =>
        set(state => removeEdge(state, sourceId, targetId))
}));

export default useStore;