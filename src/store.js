import create from "zustand";
import produce from "immer";
import * as Y from "yjs";
import yjs from "zustand-middleware-yjs";
import { WebrtcProvider } from "y-webrtc";
//import { IndexeddbPersistence } from "y-indexeddb";

import { generateRandomId } from "./utils";


const addChildNode = (state, targetId) => {
    return produce(state, draft => {
        const targetNode = draft.nodes.find(node => node.id === targetId);
        const x = targetNode.position.x - 250;
        const y = targetNode.position.y;

        const id = generateRandomId();
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
            data: { label: "Shared planetary computer" },
            childNodes: ["1", "2", "3"],
            type: "rootNode",
            position: { x: 0, y: 0 }
        },
        {
            id: "1",
            data: { label: "Shared planetary file system (IPFS)" },
            childNodes: ["4"],
            type: "childNode",
            position: { x: -250, y: 80 }
        },
        {
            id: "2",
            data: { label: "Shared planetary database (IPDB)" },
            childNodes: ["4"],
            type: "childNode",
            position: { x: -250, y: 0 }
        },
        {
            id: "3",
            data: { label: "Shared planetary processing (ETH)" },
            childNodes: ["4"],
            type: "childNode",
            position: { x: -250, y: -80 }
        },
        {
            id: "4",
            data: { label: "\"Blockchain\"" },
            childNodes: ["4"],
            type: "childNode",
            position: { x: -500, y: 0 }
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

const removeLocalData = async () => {
    try {
        const dbs = await window.indexedDB.databases()
        dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) })
    } catch (err) {
        console.log("unable to clear Indexed DB");
    }
}

// Offline support and collaboration
const roomName = "mapsmap";
const ydoc = new Y.Doc();
// eslint-disable-next-line no-unused-vars
//const persistence = new IndexeddbPersistence(roomName, ydoc);
removeLocalData();
// eslint-disable-next-line no-unused-vars
const provider = new WebrtcProvider(roomName, ydoc);

const useStore = create(yjs(ydoc, "shared", createStore));

export default useStore;