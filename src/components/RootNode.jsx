import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import onDoubleClickNode from "./NodeInteractions";

const RootNode = ({ id, data, isConnectable, targetPosition = "left" }) => {
    return (
        <div className="react-flow__node-output" onDoubleClick={(evt) => onDoubleClickNode(evt, id)}>
            <Handle
                type="target"
                position={targetPosition}
                isConnectable={isConnectable}
            />
            {data.label}
        </div>
    );
}

export default memo(RootNode);