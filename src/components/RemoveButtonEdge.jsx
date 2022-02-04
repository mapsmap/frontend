import React from "react";
import useStore from "../store";
import {
    getBezierPath,
    getEdgeCenter,
    getMarkerEnd,
} from "react-flow-renderer";
import { cloneDeep } from "lodash";
import { getCidString } from "../utils";

import "./RemoveButtonEdge.css";

const foreignObjectSize = 20;

const splitEdgeId = (edgeId) => {
    const re = /edge:([^-]*)-([^-]*)/;
    const idArray = re.exec(edgeId);

    return {
        sourceNodeCidString: idArray[1],
        targetNodeCidString: idArray[2]
    }
}

const updateNodeReference = async ({
    head,
    setHead,
    nodes,
    addNode,
    oldNodeCidString,
    newNodeCidString
}) => {
    if (head === oldNodeCidString) {
        // old reference is root node
        // update head
        setHead(newNodeCidString);
        return;
    }

    Object.entries(nodes).forEach(async ([matchOrigCidString, matchOrig]) => {
        if (matchOrig.sources.includes(oldNodeCidString)) {
            // this is a parent node of the old reference
            // create parent node using new reference
            var matchNew = cloneDeep(matchOrig);
            matchNew.sources = matchOrig.sources.map(
                src => src === oldNodeCidString ? newNodeCidString : src
            );

            const matchNewCidString = await getCidString(matchNew);
            // persist new parent node
            addNode(matchNewCidString, matchNew, matchOrigCidString);
            // recursively update parent nodes parents
            updateNodeReference({
                head, setHead, nodes, addNode,
                oldNodeCidString: matchOrigCidString,
                newNodeCidString: matchNewCidString
            });
        }
    });
}

const onClickEdge = async ({ event, edgeId, head, setHead, nodes, addNode }) => {
    event.stopPropagation();
    const { sourceNodeCidString, targetNodeCidString } = splitEdgeId(edgeId);

    const targetNodeOrig = nodes[targetNodeCidString];
    let targetNodeNew = cloneDeep(targetNodeOrig);
    targetNodeNew.sources = targetNodeOrig.sources.filter(src => src !== sourceNodeCidString);

    const targetNodeNewCidString = await getCidString(targetNodeNew);
    addNode(targetNodeNewCidString, targetNodeNew, targetNodeCidString);
    updateNodeReference({
        head, setHead, nodes, addNode,
        oldNodeCidString: targetNodeCidString,
        newNodeCidString: targetNodeNewCidString
    });
}

export default function RemoveButtonEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    arrowHeadType,
    markerEndId,
}) {
    const head = useStore(state => state.head);
    const setHead = useStore(state => state.setHead);
    const nodes = useStore(state => state.nodes);
    const addNode = useStore(state => state.addNode);

    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - foreignObjectSize / 2}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div>
                    <button
                        className="edgebutton"
                        onClick={(event) => onClickEdge({ event, edgeId: id, head, setHead, nodes, addNode })}
                    >
                        ×
                    </button>
                </div>
            </foreignObject>
        </>
    );
}