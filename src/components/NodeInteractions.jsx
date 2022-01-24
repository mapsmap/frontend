const onDoubleClickNode = (evt, nodeId) => {
    evt.stopPropagation();
    console.log("Double cicked node", nodeId);
}

export default onDoubleClickNode;