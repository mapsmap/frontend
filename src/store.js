import create from "zustand";
import produce from "immer";
import * as Y from "yjs";
import yjs from "zustand-middleware-yjs";
//import { WebrtcProvider } from "y-webrtc";
//import { IndexeddbPersistence } from "y-indexeddb";

import { generateRandomId } from "./utils";
import { Topic } from "./Models/Topic";
import { exampleText } from "./exampleContent";


const addChildNode = (state, treeId, targetId) => {
    return produce(state, draft => {
        const targetNode = draft.trees[treeId].nodes.find(node => node.id === targetId);
        const x = targetNode.position.x - 250;
        const y = targetNode.position.y;

        const id = generateRandomId();
        const newContent = {
            type: "text",
            text: "",
        };
        draft.content[id] = newContent;

        const newNode = {
            id: id,
            title: "",
            contentId: id,
            childNodes: [],
            type: "childNode",
            position: { x: x, y: y },
            contractAddress: "0x0000000000000000000000000000000000000000",
        };
        draft.trees[treeId].nodes.push(newNode);

        if (!targetNode.childNodes) {
            targetNode.childNodes = [];
        }
        targetNode.childNodes.push(id);
    })
}

const removeNode = (state, treeId, nodeId) => {
    return produce(state, draft => {
        // remove edges pointing to the node
        draft.trees[treeId].nodes.forEach(node => {
            if (node.childNodes) {
                node.childNodes = node.childNodes.filter(id => id !== nodeId);
            }
        });

        const contentId = draft.trees[treeId].nodes.find(node => node.id === nodeId).contentId;

        // remove node
        draft.trees[treeId].nodes = draft.trees[treeId].nodes.filter(node => node.id !== nodeId);

        // remove content
        delete draft.content[contentId];
    });
}

const addEdge = (state, treeId, sourceId, targetId) => {
    return produce(state, draft => {
        const targetNode = draft.trees[treeId].nodes.find(node => node.id === targetId);
        if (!targetNode.childNodes) {
            targetNode.childNodes = [];
        }
        if (!targetNode.childNodes.includes(sourceId)) {
            targetNode.childNodes.push(sourceId);
        }
    })
}

const removeEdge = (state, treeId, sourceId, targetId) => {
    return produce(state, draft => {
        const targetNode = draft.trees[treeId].nodes.find(node => node.id === targetId);
        targetNode.childNodes = targetNode.childNodes.filter(id => id !== sourceId);
    });
}

const updateNodePosition = (state, treeId, nodeId, newPosition) => {
    return produce(state, draft => {
        const node = draft.trees[treeId].nodes.find(node => node.id === nodeId);
        node.position = newPosition;
    })
}

const addTopic = (state, name) => {
    return produce(state, draft => {
        const id = generateRandomId();
        const newTopic = new Topic(id, name, 0);
        draft.topics[id] = newTopic;
    })
}

const updateContent = (state, contentId, newContent) => {
    return produce(state, draft => {
        draft.content[contentId] = newContent;
    })
}

const a = new Topic(1, "Environment", 100);
const b = new Topic(2, "Longevity", 50000);

const createStore = (set) => ({
    trees: {
        "0": {
            title: "Shared Planetary Computer",
            nodes: [
                {
                    id: "0",
                    title: "Shared planetary computer",
                    contentId: "0",
                    childNodes: ["1", "2", "3"],
                    type: "rootNode",
                    position: { x: 0, y: 0 },
                    contractAddress: "0x0000000000000000000000000000000000000000",
                },
                {
                    id: "1",
                    title: "Shared planetary file system (IPFS)",
                    contentId: "1",
                    childNodes: ["4"],
                    type: "childNode",
                    position: { x: -250, y: 100 },
                    contractAddress: "0x0000000000000000000000000000000000000000",
                },
                {
                    id: "2",
                    title: "Shared planetary database (IPDB)",
                    contentId: "2",
                    childNodes: ["4"],
                    type: "childNode",
                    position: { x: -250, y: 0 },
                    contractAddress: "0x0000000000000000000000000000000000000000",
                },
                {
                    id: "3",
                    title: "Shared planetary processing (ETH)",
                    contentId: "3",
                    childNodes: ["4"],
                    type: "childNode",
                    position: { x: -250, y: -100 },
                    contractAddress: "0x0000000000000000000000000000000000000000",
                },
                {
                    id: "4",
                    title: "\"Blockchain\"",
                    contentId: "4",
                    type: "childNode",
                    position: { x: -500, y: 0 },
                    contractAddress: "0x0000000000000000000000000000000000000000",
                },
            ],
        },
    },
    content: {
        "0": {
            type: "text",
            text: exampleText,
        },
        "1": {
            type: "text",
            text: exampleText,
        },
        "2": {
            type: "text",
            text: exampleText,
        },
        "3": {
            type: "text",
            text: exampleText,
        },
        "4": {
            type: "video",
            videoId: "hYip_Vuv8J0",
        },
    },
    topics: {
        1: a,
        2: b
    },
    addChildNode: (treeId, targetId) =>
        set(state => addChildNode(state, treeId, targetId)),
    removeNode: (treeId, nodeId) =>
        set(state => removeNode(state, treeId, nodeId)),
    addEdge: (treeId, sourceId, targetId) =>
        set(state => addEdge(state, treeId, sourceId, targetId)),
    removeEdge: (treeId, sourceId, targetId) =>
        set(state => removeEdge(state, treeId, sourceId, targetId)),
    updateNodePosition: (treeId, nodeId, newPosition) =>
        set(state => updateNodePosition(state, treeId, nodeId, newPosition)),
    addTopic: (name) =>
        set(state => addTopic(state, name)),
    updateContent: (contentId, newContent) =>
        set(state => updateContent(state, contentId, newContent)),
});

// Offline support and collaboration
//const roomName = "mapsmap";
const ydoc = new Y.Doc();
// eslint-disable-next-line no-unused-vars
//const persistence = new IndexeddbPersistence(roomName, ydoc);
// eslint-disable-next-line no-unused-vars
//const provider = new WebrtcProvider(roomName, ydoc);

const useStore = create(yjs(ydoc, "shared", createStore));

export default useStore;