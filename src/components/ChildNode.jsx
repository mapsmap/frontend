import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import useStore from "../store";

const ChildNode = ({ id, data, isConnectable, targetPosition = "left", sourcePosition = "right" }) => {
    const addChildNode = useStore(state => state.addChildNode);

    const onDoubleClickNode = (evt, id) => {
        evt.stopPropagation();
        addChildNode(id);
    }

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