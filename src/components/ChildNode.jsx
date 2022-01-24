import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import onDoubleClickNode from "./NodeInteractions";

const ChildNode = ({ id, data, isConnectable, targetPosition = "left", sourcePosition = "right" }) => {
    return (
        <div className="react-flow__node-default" onDoubleClick={(evt) => onDoubleClickNode(evt, id)}>
            <Handle
                type="target"
                position={targetPosition}
                isConnectable={isConnectable}
            />
            {data.label}
            <Handle
                type="source"
                position={sourcePosition}
                isConnectable={isConnectable}
            />
        </div>
    );
}

export default memo(ChildNode);