import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./PathFind.css";
const rows = 13;
const cols = 13;
const startNode = new Array(0, 0);
const endNode = new Array(rows - 1, cols - 1);
const PathFind = () => {
const [Grid, setGrid] = useState([]);

  // similar to componentDidMount
  useEffect(() => {
    initializeGrid();
  }, []);

  const makeNeighborForAll = (grid) => {
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < cols; j++){
        grid[i][j].addNeighbors(grid);
      }
    }  
  }
  const initializeGrid = () => {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
    // spot constructor
    function Spot(i, j) {
      this.x = i;
      this.y = j;
      this.isStartNode = this.x == startNode[0] && this.y == startNode[1];
      this.isEndNode = this.x == endNode[0] && this.y == endNode[1];
      this.edgeCost = 0;// actual cost
      this.heuristicCost = 0;// heuristic cost
      this.totalCost = 0;// (heuristic cost +actual cost)
      this.neighbors = [];
      this.parent;
      this.addNeighbors = function (grid){
        let i = this.x, j = this.y;
        if(i > 0)  this.neighbors.push(grid[i-1][j]);// left neighbor
        if(i < rows-1)  this.neighbors.push(grid[i+1][j])// right neighbor
        if(j > 0)  this.neighbors.push(grid[i][j-1])// upside neighbor
        if(j < cols-1)  this.neighbors.push(grid[i][j+1])// downside neighbor 
      }
    }
    const createSpot = (grid) => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          grid[i][j] = new Spot(i, j);
        }
      }
    };

    createSpot(grid);
    setGrid(grid);
    initializeGrid(grid);
  };

  // grid with node
  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid-row">
            {row.map((col, colIndex) => {
              const { isStartNode, isEndNode } = col;
              return (
                <Node
                  key={colIndex}
                  isStartNode={isStartNode}
                  isEndNode={isEndNode}
                  row = {rowIndex}
                  col = {colIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
  console.log(Grid);
  return (
    <div className="Wrapper">
      <h1>PathFind Component</h1>
      {gridWithNode}
    </div>
  );
};

export default PathFind;
