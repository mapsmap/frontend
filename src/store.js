import create from "zustand";
import produce from "immer";
import * as Y from "yjs";
import yjs from "zustand-middleware-yjs";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";


const addChildNode = (state, targetId) => {
    return produce(state, draft => {
        const targetNode = draft.nodes.find(node => node.id === targetId);
        const x = targetNode.position.x - 250;
        const y = targetNode.position.y;

        // TODO: use hash or unique id
        const id = Math.floor(Math.random() * 1000000).toString();
        const newNode = { id: id, data: { label: "New Node" }, type: "childNode", position: { x: x, y: y } };
        const nodes = draft.nodes;
        nodes.push(newNode);

        if (!targetNode.childNodes) {
            targetNode.childNodes = [];
        }
        targetNode.childNodes.push(id);
    })
}

const addEdge = (state, sourceId, targetId) => {
    return produce(state, draft => {
        const targetNode = draft.nodes.find(node => node.id === targetId);
        if (!targetNode.childNodes) {
            targetNode.childNodes = [];
        }
        if (!targetNode.childNodes.includes(sourceId)) {
            targetNode.childNodes.push(sourceId);
        }
    })
}

const removeEdge = (state, sourceId, targetId) => {
    return produce(state, draft => {
        const targetNode = draft.nodes.find(node => node.id === targetId);
        targetNode.childNodes = targetNode.childNodes.filter(id => id !== sourceId);
    });
}

const updateNodePosition = (state, nodeId, newPosition) => {
    return produce(state, draft => {
        const node = draft.nodes.find(node => node.id === nodeId);
        node.position = newPosition;
    })
}

const createStore = (set) => ({
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
    addChildNode: (targetId) =>
        set(state => addChildNode(state, targetId)),
    addEdge: (sourceId, targetId) =>
        set(state => addEdge(state, sourceId, targetId)),
    removeEdge: (sourceId, targetId) =>
        set(state => removeEdge(state, sourceId, targetId)),
    updateNodePosition: (nodeId, newPosition) =>
        set(state => updateNodePosition(state, nodeId, newPosition))
})

// Offline support and collaboration
const roomName = "mapsmap";
const ydoc = new Y.Doc();
const persistence = new IndexeddbPersistence(roomName, ydoc);
const provider = new WebrtcProvider(roomName, ydoc);

const useStore = create(yjs(ydoc, "shared", createStore));

export default useStore;