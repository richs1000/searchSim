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
	for (var s = stack.length - 1; s >=0; s--) {
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
//	dfsController.depthFirstSearchStepByStepInit(graph);
//	dfsController.depthFirstSearchStepByStep();
//	dfsController.depthFirstSearch(graph);
});
