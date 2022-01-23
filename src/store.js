import create from "zustand";

const useStore = create(set => ({
    nodes: [
        {
            id: "0",
            data: { label: "Root" },
            childNodes: ["1", "2"],
            type: "input",
            sourcePosition: "left",
            position: { x: 0, y: 0 }
        },
        {
            id: "1",
            data: { label: "Child 1" },
            childNodes: ["3"],
            sourcePosition: "left",
            targetPosition: "right",
            position: { x: -250, y: 80 }
        },
        {
            id: "2",
            data: { label: "Child 2" },
            sourcePosition: "left",
            targetPosition: "right",
            position: { x: -250, y: -80 }
        },
        {
            id: "3",
            data: { label: "Child 1.1" },
            sourcePosition: "left",
            targetPosition: "right",
            position: { x: -500, y: 80 }
        },
    ],
    addNode: (node, source) =>
        set(state => ({ nodes: [...state.nodes, node] })),
}));

export default useStore;