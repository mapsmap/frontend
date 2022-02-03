import create from "zustand";
import produce from "immer";
import * as Y from "yjs";
import yjs from "zustand-middleware-yjs";
import { WebrtcProvider } from "y-webrtc";
import { IndexeddbPersistence } from "y-indexeddb";
import { CID } from "multiformats/cid";

const addChildNode = (state, targetId) => {
    return produce(state, draft => {
        console.log("TODO: add child node");
        //const targetNode = draft.nodes.find(node => node.id === targetId);
        //const x = targetNode.position.x - 250;
        //const y = targetNode.position.y;

        //// TODO: use hash or unique id
        //const id = Math.floor(Math.random() * 1000000).toString();
        //const newNode = { id: id, data: { label: "New Node" }, type: "childNode", position: { x: x, y: y } };
        //const nodes = draft.nodes;
        //nodes.push(newNode);

        //getCidString(newNode).then(cid => console.log(cid));

        //if (!targetNode.childNodes) {
        //    targetNode.childNodes = [];
        //}
        //targetNode.childNodes.push(id);
    });
}

const addEdge = (state, sourceId, targetId) => {
    return produce(state, draft => {
        console.log("TODO: add edge");
        //const targetNode = draft.nodes.find(node => node.id === targetId);
        //if (!targetNode.childNodes) {
        //    targetNode.childNodes = [];
        //}
        //if (!targetNode.childNodes.includes(sourceId)) {
        //    targetNode.childNodes.push(sourceId);
        //}
    });
}

const removeEdge = (state, sourceId, targetId) => {
    return produce(state, draft => {
        console.log("TODO: remove edge");
        //const targetNode = draft.nodes.find(node => node.id === targetId);
        //targetNode.childNodes = targetNode.childNodes.filter(id => id !== sourceId);
    });
}

const updateNodePosition = (state, nodeCidString, newPosition) => {
    return produce(state, draft => {
        const node = draft.nodesMetadata[nodeCidString];
        node.position = newPosition;
    });
}


const createStore = (set) => ({
    head: CID.parse("bafyreibsdt652t3mm6bigqfe3yi3jbuumxaohhq7ln7ybc62qr5buuywde"),
    items: {
        "bafyreiftel3p7pfepu27tghay2uevewd4gse5pv257owjecrvlwumfjbru": { type: "text/plain", doc: "" },
        "bafyreicqb5ejcekuu5in4gt55mumurj6mwx2bme6szhi4k3ike4b6ogsea": { type: "text/plain", doc: "Shared planetary computer" },
        "bafyreigpzmjy5wrbsgfoutjolegcoknzwx55mxqj4vi323wrkosd4bb2oy": { type: "text/plain", doc: "Shared planetary file system (IPFS)" },
        "bafyreibnozdw62hcg6qnhpruyx7ldykys4fbshiputmunmxzxyhlpo27q4": { type: "text/plain", doc: "Shared planetary database (IPDB)" },
        "bafyreig5rkavam7e7snyolg357gu6qjcmfcu46hpmsrkxdlu3yfmnxtkwu": { type: "text/plain", doc: "Shared planetary processing (ETH)" },
        "bafyreiczvrojrlg3zjuftbky4a7d6onqnzeehlkxz5sxqd7xozemspca7q": { type: "text/plain", doc: "\"Blockchain\"" },
    },
    nodes: {
        // Blockchain
        "bafyreiac5hbqg7cp77j7rolx4qvcdfjni4jsfc4b4ek653vbg7qpipxxfq": {
            title: CID.parse("bafyreiczvrojrlg3zjuftbky4a7d6onqnzeehlkxz5sxqd7xozemspca7q"),
            content: CID.parse("bafyreiftel3p7pfepu27tghay2uevewd4gse5pv257owjecrvlwumfjbru"),
            sources: [],
        },
        // Shared planetary file system (IPFS)
        "bafyreib27aurgigq6w75fb5mz3auptewnlwi52sfztj636uucleruucc6m": {
            title: CID.parse("bafyreigpzmjy5wrbsgfoutjolegcoknzwx55mxqj4vi323wrkosd4bb2oy"),
            content: CID.parse("bafyreiftel3p7pfepu27tghay2uevewd4gse5pv257owjecrvlwumfjbru"),
            sources: [CID.parse("bafyreiac5hbqg7cp77j7rolx4qvcdfjni4jsfc4b4ek653vbg7qpipxxfq")],
        },
        // Shared planetary computer
        "bafyreibsdt652t3mm6bigqfe3yi3jbuumxaohhq7ln7ybc62qr5buuywde": {
            title: CID.parse("bafyreicqb5ejcekuu5in4gt55mumurj6mwx2bme6szhi4k3ike4b6ogsea"),
            content: CID.parse("bafyreiftel3p7pfepu27tghay2uevewd4gse5pv257owjecrvlwumfjbru"),
            sources: [CID.parse("bafyreib27aurgigq6w75fb5mz3auptewnlwi52sfztj636uucleruucc6m")],
        },
    },
    nodesMetadata: {
        "bafyreiac5hbqg7cp77j7rolx4qvcdfjni4jsfc4b4ek653vbg7qpipxxfq": { position: { x: -500, y: 0 } },
        "bafyreib27aurgigq6w75fb5mz3auptewnlwi52sfztj636uucleruucc6m": { position: { x: -250, y: 80 } },
        "bafyreibsdt652t3mm6bigqfe3yi3jbuumxaohhq7ln7ybc62qr5buuywde": { position: { x: 0, y: 0 } }
    },
    addChildNode: (targetId) =>
        set(state => addChildNode(state, targetId)),
    addEdge: (sourceId, targetId) =>
        set(state => addEdge(state, sourceId, targetId)),
    removeEdge: (sourceId, targetId) =>
        set(state => removeEdge(state, sourceId, targetId)),
    updateNodePosition: (nodeCidString, newPosition) =>
        set(state => updateNodePosition(state, nodeCidString, newPosition))
})

// Offline support and collaboration
const roomName = "mapsmap";
const ydoc = new Y.Doc();
// eslint-disable-next-line no-unused-vars
const persistence = new IndexeddbPersistence(roomName, ydoc);
// eslint-disable-next-line no-unused-vars
const provider = new WebrtcProvider(roomName, ydoc);

const useStore = create(yjs(ydoc, "shared", createStore));

export default useStore;