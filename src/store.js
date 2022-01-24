import create from "zustand";

const removeEdge = (state, sourceId, targetId) => {
    return {
        ...state,
        nodes: state.nodes.map(node => {
            if (node.id !== targetId) return node
            return {
                ...node,
                childNodes: node.childNodes.filter(id => id !== sourceId)
            }
        })
    }
}

const useStore = create(set => ({
    nodes: [
        {
            id: "0",
            data: { label: "Root" },
            childNodes: ["1", "2"],
            type: "output",
            targetPosition: "left",
            position: { x: 0, y: 0 }
        },
        {
            id: "1",
            data: { label: "Child 1" },
            childNodes: ["3"],
            sourcePosition: "right",
            targetPosition: "left",
            position: { x: -250, y: 80 }
        },
        {
            id: "2",
            data: { label: "Child 2" },
            sourcePosition: "right",
            targetPosition: "left",
            position: { x: -250, y: -80 }
        },
        {
            id: "3",
            data: { label: "Child 1.1" },
            sourcePosition: "right",
            targetPosition: "left",
            position: { x: -500, y: 80 }
        },
    ],
    addNode: (node, targetId) =>
        set(state => ({ nodes: [...state.nodes, node] })),
    removeEdge: (sourceId, targetId) =>
        set(state => removeEdge(state, sourceId, targetId))
}));

export default useStore;