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


function DepthFirstSearchController(graph, startNode, myView) {
	// user interface
	this.myView = myView;

	// stacks used for search
	this.open = [];
	this.closed = [];
	
	// search options
	this.horizon = 0;	// if horizon = 0, then use an infinite horizon	
}


DepthFirstSearchController.prototype.inStack = function(stack, node) {
    for (var s = 0; s < stack.length; s++) {
		if (stack[s].label == node.label) {
			return true;
		}
	}
	
	return false;
}


DepthFirstSearchController.prototype.emptyArray = function(myArray) {
	while (myArray.length > 0) {
		myArray.pop();
	}
}

DepthFirstSearchController.prototype.depthFirstSearch = function(graph) {
	// initialize DFS
	this.graph = graph;				// point to the graph
	this.activeNode = graph.root;	// set the root of the graph

	// reset open and closed stacks
	this.emptyArray(this.open);
	this.emptyArray(this.closed);

	// push the root of the graph onto the stack
	this.open.push(this.activeNode);		
	
	var count = 0;

	while (this.open.length > 0 && count < 100) {
		count++;
		console.log("count = " + count);
		console.log("open: " + this.open);
		console.log("closed: " + this.closed);
		// pop next node off stack
		this.activeNode = this.open.pop();
		console.log('Active Node: ' + this.activeNode.label);
		// push node's children onto open stack (as long as we haven't already seen them)
		var children = this.graph.getChildren(this.activeNode.label);
		for (var c = 0; c < children.length; c++) {
			if (!this.inStack(this.closed, children[c]) &&
                !this.inStack(this.open, children[c])) {
                console.log("pushing: " + children[c].label);
    		    this.open.push(children[c]);    		    
			}
		}
		// push active node onto closed stack
		this.closed.push(this.activeNode);
	}
}


DepthFirstSearchController.prototype.depthFirstSearchStepByStepInit = function(graph) {
	// initialize DFS
	this.graph = graph;				// point to the graph
	this.activeNode = graph.root;	// set the root of the graph

	// reset open and closed stacks
	this.emptyArray(this.open);
	this.emptyArray(this.closed);

	// push the root of the graph onto the stack
	this.open.push(this.activeNode);		
}


DepthFirstSearchController.prototype.dumpStack = function(stack) {
	for (var s=0; s < stack.length; s++) {
		console.log(stack[s].label);
	}
}


DepthFirstSearchController.prototype.depthFirstSearchStepByStep = function() {
	while (this.open.length > 0) {
 		alert("next step");
		this.depthFirstSearchNextStep();
	}
}


DepthFirstSearchController.prototype.depthFirstSearchNextStep = function() {
	if (this.open.length > 0) {
		// pop next node off stack
		this.activeNode = this.open.pop();
		console.log('Active Node: ' + this.activeNode.label);
		// push node's children onto open stack (as long as we haven't already seen them)
		var children = this.graph.getChildren(this.activeNode.label);
		for (var c = 0; c < children.length; c++) {
			if (!this.inStack(this.closed, children[c]) &&
                !this.inStack(this.open, children[c])) {
                // console.log("pushing: " + children[c].label);
    		    this.open.push(children[c]);
			}
		}
		// push active node onto closed stack
		this.closed.push(this.activeNode);

		// update view
		this.myView.showStack(".open-stack", this.open);
		this.myView.showStack(".closed-stack", this.closed);
	}
}


function DepthFirstSearchView() {
}


DepthFirstSearchView.prototype.showStack = function(stackClass, stack) {
	var stackString = "<p></p>";
	for (var s = 0; s < stack.length; s++) {
		stackString += "<p>" + stack[s].label + "</p>";
	}
	$(stackClass).html(stackString);
	console.log("stackString " + stackString);
}


var graph = new Graph();
var dfsView = new DepthFirstSearchView();
var dfsController = new DepthFirstSearchController(graph, graph.root, dfsView);


$(document).ready(function(){
	console.log(graph);
	dfsController.depthFirstSearchStepByStepInit(graph);
	dfsController.depthFirstSearchStepByStep();
//	dfsController.depthFirstSearch(graph);
});
