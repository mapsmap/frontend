import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import useStore from "../store";

const RootNode = ({ id, data, isConnectable, targetPosition = "left" }) => {
    const addChildNode = useStore(state => state.addChildNode);

    const onDoubleClickNode = (evt, id) => {
        evt.stopPropagation();
        addChildNode(id);
    }

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