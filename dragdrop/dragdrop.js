function parsePage() {
	dragbarNodes = getChildrenOfClass(document,'dragbar');
	for(var j=0;j<dragbarNodes.length;j++) {
		dragbarObj = dragbarNodes[j];
		dragbarObj.onmousedown = function(evnt) {
			grabForDragging(this,getEvent(evnt));
		}
	}
}
function getChildrenOfClass(node,className) {
	var childList = new Array();
	getChildrenOfClassRecursive(node,className,childList);
	return childList;
}
function getChildrenOfClassRecursive(node,className,childList) {
	var children = node.childNodes;
	var child;
	for(var i=0;i<children.length;i++) {
		child = children[i];
		if(child.className && child.className.indexOf(className) >
-1) {
			childList.push(child);
		}
		getChildrenOfClassRecursive(child,className,childList);
	}
}

var grabbedForDragging = null;
var topZ = 0;
function grabForDragging(obj,evnt) {
	grabbedForDragging = getParentDraggable(obj);
	xOffset = evnt.clientX -
grabbedForDragging.style.left.replace('px','');
	yOffset = evnt.clientY -
grabbedForDragging.style.top.replace('px','');
	topZ++;
	grabbedForDragging.style.zIndex = topZ;
	grabbedForDragging.insertAdjacentHTML('AfterEnd','<span></span>');
}
function ungrabForDragging() {
	grabbedForDragging = null;
}
function moveForDragging(evnt) {
	if(grabbedForDragging) {
		grabbedForDragging.style.left = evnt.clientX - xOffset +
'px';
		grabbedForDragging.style.top = evnt.clientY - yOffset +
'px';
	}
}
function getParentDraggable(obj) {
	while(!obj.className || obj.className.indexOf('dragdrop') < 0) {
		obj = obj.parentNode;
	}
	return obj;
}

function getEvent(evnt) {
	return evnt ? evnt : window.event;
}

window.onload = parsePage;
document.onmouseup = ungrabForDragging;
document.onmousemove = function(evnt) {
	moveForDragging(getEvent(evnt));
}

// disable highlighting text in IE
document.onselectstart = function() {
	return false;
}
// disable highlighting text in mozilla
document.onmousedown = function() {
	return false;
}
