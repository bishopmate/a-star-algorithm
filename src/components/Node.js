import React from "react";
import "./Node.css";
const Node = ({ isStartNode, isEndNode, row, col}) => {
    const classes = isStartNode ? "start-node" : isEndNode ? "end-node" : "";
    return (
        <div className = {`node ${classes}`} id = {`node-${row}-${col}`}>
        </div>
    );
}

export default Node; 