// Constructor for graph
function Graph() {
    this.nodes = {
		     A:{label:'A', weight:0},
		     B:{label:'B', weight:1},
		     C:{label:'C', weight:2},
		     D:{label:'D', weight:3},
		     E:{label:'E', weight:4},
		     F:{label:'F', weight:5},
		     G:{label:'G', weight:6},
		     H:{label:'H', weight:7},
		     I:{label:'I', weight:8}	     
		   };
	
	this.edges = {
		     A:{ B:{cost: 4}, H:{cost: 8} },
		     B:{ A:{cost: 4}, C:{cost: 8} },
		     C:{ B:{cost: 8}, D:{cost: 7}, F:{cost: 4}, I:{cost: 2} },
		     D:{ E:{cost: 9}, F:{cost: 14} },
		     E:{ D:{cost: 9}, F:{cost: 10} },
		     F:{ C:{cost: 4}, E:{cost: 10}, G:{cost: 2} },
		     G:{ F:{cost: 2}, H:{cost: 1}, I:{cost:6} },
		     H:{ A:{cost: 8}, G:{cost: 1}, I:{cost: 7} },
		     I:{ C:{cost: 2}, H:{cost: 7}, G:{cost: 6} }
		   };

	// pointer to root node
	this.root = this.nodes.A;
}


Graph.prototype.getNode = function(nodeLabel) {
	// loop through nodes until nodeLabel = node.label
	for (var node in this.nodes) {
		if (this.nodes[node].label == nodeLabel) {
			return this.nodes[node];
		}
	}
	
	// return something if we didn't find the target node
	return null;
}


Graph.prototype.getChildren = function(parentNodeLabel) {
	var children = [];	// start with an empty array
	var parentEdgeNode = null;	// haven't found the node yet
	
	// loop through edges until edgeLabel = parentNodeLabel
	for (var nodeLabel in this.edges) {
		if (nodeLabel == parentNodeLabel) {
			parentEdgeNode = this.edges[nodeLabel];
			break;
		}
	}
	
	// loop through edge object to extract children
	if (parentEdgeNode != null) {
		for (var nodeLabel in parentEdgeNode) {
			children.push(graph.getNode(nodeLabel));
		}
		return children;
	
	// return something if we didn't find the target node
	} else {
		return null;
	}
}




