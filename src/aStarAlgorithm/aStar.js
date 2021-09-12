function aStar(startNode, endNode){
    let openSet = [], closed = [], path = [];
    let closedSet = [];
    let path = [];
    
    openSet.push(startNode);
    while(openSet.length > 0){
        let leastIndex = 0;
        for(let i=0; i<openSet.length; i++){
            if(openSet[i].f < openSet[leastIndex].f){
                leastIndex = i;
            }
        }
    
    
        let currentNode = openSet[leastIndex];
        if(currentNode === endNode){
            //Path found
            console.log("Done! Path Found");
        }

        openSet = openSet.filter(node => node != currentNode);
        closedSet.push(currentNode);

        let neighbors = currentNode.neighbors;
        for(let i=0; i<neighbors.length; i++){
            let currentNodeNeighbor = neighbors[i];
            if(!closedSet.includes(currentNodeNeighbor)){
                let newG = currentNode.g+1;
                let newNeighborAccepted = false;
                if(openSet.includes(currentNodeNeighbor)){
                    if(newG < currentNodeNeighbor.g){
                        currentNodeNeighbor.g = newG;
                        newNeighborAccepted = true;
                    }
                }else{  
                    currentNodeNeighbor.g = newG;
                    newNeighborAccepted = true;
                    openSet.push(currentNodeNeighbor);
                }

                if(newPath){
                    currentNodeNeighbor.h = heuristic(currentNodeNeighbor, endNode);
                    currentNodeNeighbor.f = currentNodeNeighbor.g + currentNodeNeighbor.h
                    currentNodeNeighbor.parent = currentNode;
                }

            }
        }
    }


}

function heuristic(a, b){
    let d = Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
    return d;
}

export default aStar;