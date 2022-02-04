import create from "zustand";
import produce from "immer";
import * as Y from "yjs";
import yjs from "zustand-middleware-yjs";
import { WebrtcProvider } from "y-webrtc";
//import { IndexeddbPersistence } from "y-indexeddb";

const addChildNode = (state, targetNodeCidString) => {
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

const addEdge = (state, sourceNodeCidString, targetNodeCidString) => {
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

const updateNodePosition = (state, nodeCidString, newPosition) => {
    return produce(state, draft => {
        const node = draft.nodesMetadata[nodeCidString];
        node.position = newPosition;
    });
}

const addItem = (state, itemCidString, item) => {
    return produce(state, draft => {
        if (!(itemCidString in draft.items)) {
            draft.items[itemCidString] = item;
        }
    });
}

const addNode = (state, nodeCidString, node, originNodeCidString, nodeMetadata) => {
    return produce(state, draft => {
        if (originNodeCidString !== undefined) {
            // consider this node as a mutation of an existing one
            // copy metadata of origin node
            draft.nodesMetadata[nodeCidString] = draft.nodesMetadata[originNodeCidString];
        }
        if (nodeMetadata !== undefined) {
            draft.nodesMetadata[nodeCidString] = nodeMetadata;
        }
        if (!draft.nodesMetadata[nodeCidString]) {
            // metadata is required
            // set some default values
            draft.nodesMetadata[nodeCidString] = { position: { x: 0, y: 0 } };
        }
        if (!(nodeCidString in draft.nodes)) {
            draft.nodes[nodeCidString] = node;
        }
    });
}

const setHead = (state, headCidString) => {
    return produce(state, draft => {
        draft.head = headCidString;
    });
}

const createStore = (set) => ({
    head: "bafyreibsdt652t3mm6bigqfe3yi3jbuumxaohhq7ln7ybc62qr5buuywde",
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
            title: "bafyreiczvrojrlg3zjuftbky4a7d6onqnzeehlkxz5sxqd7xozemspca7q",
            content: "bafyreiftel3p7pfepu27tghay2uevewd4gse5pv257owjecrvlwumfjbru",
            sources: [],
        },
        // Shared planetary file system (IPFS)
        "bafyreib27aurgigq6w75fb5mz3auptewnlwi52sfztj636uucleruucc6m": {
            title: "bafyreigpzmjy5wrbsgfoutjolegcoknzwx55mxqj4vi323wrkosd4bb2oy",
            content: "bafyreiftel3p7pfepu27tghay2uevewd4gse5pv257owjecrvlwumfjbru",
            sources: ["bafyreiac5hbqg7cp77j7rolx4qvcdfjni4jsfc4b4ek653vbg7qpipxxfq"],
        },
        // Shared planetary computer
        "bafyreibsdt652t3mm6bigqfe3yi3jbuumxaohhq7ln7ybc62qr5buuywde": {
            title: "bafyreicqb5ejcekuu5in4gt55mumurj6mwx2bme6szhi4k3ike4b6ogsea",
            content: "bafyreiftel3p7pfepu27tghay2uevewd4gse5pv257owjecrvlwumfjbru",
            sources: ["bafyreib27aurgigq6w75fb5mz3auptewnlwi52sfztj636uucleruucc6m"],
        },
    },
    nodesMetadata: {
        "bafyreiac5hbqg7cp77j7rolx4qvcdfjni4jsfc4b4ek653vbg7qpipxxfq": { position: { x: -500, y: 0 } },
        "bafyreib27aurgigq6w75fb5mz3auptewnlwi52sfztj636uucleruucc6m": { position: { x: -250, y: 80 } },
        "bafyreibsdt652t3mm6bigqfe3yi3jbuumxaohhq7ln7ybc62qr5buuywde": { position: { x: 0, y: 0 } }
    },
    addItem: (itemCidString, item) =>
        set(state => addItem(state, itemCidString, item)),
    addNode: (nodeCidString, node, originNodeCidString, nodeMetadata) =>
        set(state => addNode(state, nodeCidString, node, originNodeCidString, nodeMetadata)),
    setHead: (headCidString) =>
        set(state => setHead(state, headCidString)),
    addChildNode: (targetNodeCidString) =>
        set(state => addChildNode(state, targetNodeCidString)),
    addEdge: (sourceNodeCidString, targetNodeCidString) =>
        set(state => addEdge(state, sourceNodeCidString, targetNodeCidString)),
    updateNodePosition: (nodeCidString, newPosition) =>
        set(state => updateNodePosition(state, nodeCidString, newPosition))
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