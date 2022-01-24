import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import onDoubleClickNode from "./NodeInteractions";

const RootNode = ({ id, data, isConnectable, sourcePosition = "left" }) => {
    return (
        <div className="react-flow__node-output" onDoubleClick={(evt) => onDoubleClickNode(evt, id)}>
            <Handle
                type="source"
                position={sourcePosition}
                isConnectable={isConnectable}
            />
            {data.label}
        </div>
    );
}

export default memo(RootNode);