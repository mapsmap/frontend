import React from "react";
import useStore from "../store";
import {
    getBezierPath,
    getEdgeCenter,
    getMarkerEnd,
} from "react-flow-renderer";

import "./RemoveButtonEdge.css";

const foreignObjectSize = 20;

const splitEdgeId = (edgeId) => {
    const re = /e([^-]*)-([^-]*)/;
    const idArray = re.exec(edgeId);

    return {
        sourceId: idArray[1],
        targetId: idArray[2]
    }
}

const onEdgeClick = (evt, edgeId, removeEdge) => {
    evt.stopPropagation();
    const { sourceId, targetId } = splitEdgeId(edgeId);
    removeEdge(sourceId, targetId);
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
    const removeEdge = useStore(state => state.removeEdge);

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
                        onClick={(event) => onEdgeClick(event, id, removeEdge)}
                    >
                        ×
                    </button>
                </div>
            </foreignObject>
        </>
    );
}