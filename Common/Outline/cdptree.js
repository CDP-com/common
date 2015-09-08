// ------------------------------------------------------------------ 
// Much of this design was taken from
// dTree 2.05 | www.destroydrop.com/javascript/tree
// Copyright (c) 2002-20003 Geir Landro
// This script can be used freely as long as all copyright 
// messages are intact.
// Updated: 17.04.2003
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Some of the variables and functions have been changed
// New functions, variables have been added to support our needs
// We will be reading in our Menu's or Outlines from an XML file
// cdpTree 1.0
//
// Columbia Data Products, Inc - Modified Version 
// Updated: Feb. 28, 2012
//
// ------------------------------------------------------------------
// FOR DEBUGGING (1 is on; 0 is off)
var showids = 0;
var showlvl = 0;
// ---------------------------
// -      Class cdpTree      -
// - a tree is made up of an ordered array of nodes -
// ---------------------------
function Node(id,pid,lptr,rptr, ilvl,name,url,title,comment,target,open){
	// variables
	this.id        = id;           // unique node id 
	this.pid       = pid;          // this nodes parent node id
	this.lptr      = lptr;         // left most child id, 0 if no children
	this.rptr      = rptr;         // right sibling id or parent id if last sibling
    this.ilvl       = ilvl;        // Indent Level
	
	this.name      = name;         // this nodes name - if you want you can just use this field and put in your own html
	this.url      = url;           // the url for the node 
	this.title    = title;         // this is the display title for the node - mouse over
	this.comment  = comment;       // this is the comment to display after the name of the node(optional field)
	this.target   = target;        // this is where the url is to be displayed - _blank (new tab) etc
	this._io      = open;          // this is the state of the node - false if collapsed - true if expanded
	this._is      = false;         // indicates if this node is selected
	this._ai = 0;             // this is the index into the trees array of nodes for this node (aNodes[])

	// METHODS     
	// ================================================================================
	// isLastSibling();  returns true or false (if pid == rs_id) this is last sibling
	// hasChildren();    returns true or false (if lc_id != 0) this node has children
	// isExpanded();
	// toggleExpanded();
	// isNodeSelected();
	// selectNode();
	// unselectNode();
}

Node.prototype.isLastSibling = function(){
   return (this.pid == this.rptr)?true:false;
} 
Node.prototype.hasChildren = function(){
   return (this.lptr == 0 )?false:true;
} 
Node.prototype.isExpanded = function(){
   return (this._io);
} 
Node.prototype.toggleExpanded = function () {
   this._io=(this._io)?false:true;
} 
Node.prototype.isNodeSelected = function (){
   return (this._is);
}
Node.prototype.selectNode = function (){
   this._is=true;
}
Node.prototype.unSelectNode = function (){
   this._is=false; 
}

// create a tree object - 
function cdpTree(divid,menuName,selNodeURL){
    this.config = {};
	this.icon   = {empty: '../common/media/empty.jpg',nlPlus: '../common/media/nolines_plus.jpg',nlMinus: '../common/media/nolines_minus.jpg'};

    this.menu          = menuName;
	this.divid         = divid;          // where to put the tree
	this.aNodes        = [];             // array of nodes
	this.aIndent       = [];             // indent lines of empty lines and icons
	this.root          = new Node(-1);   // initial the tree with a root node for 
	this.selNodeURL     = selNodeURL;      // selected Node for the tree - 
	this.selectedNode  = 0;              // selected Node for the tree - 
	this.inOrder       = true;           // the tree is in-order
	
	
	// METHODS
	// readXMLTree()     - reads in and creates tree from xml file             
	// add()
	// renderTree()
	// moveUp()
	// moveDown()
	// collapseNode()
	// expandNode()
	// openAll()
	// closeAll()
	// closeAllChildren()
	// toggleCollapseStatus()
	// getNodeCount();    // this.aNodes.length;
	
}
// add Node to Tree array
cdpTree.prototype.add = function (id, ilvl, name, url, title, comment, target, open) {

    //Before we create a new node, check to see if the url already exsists, if it does, we need to minpulate it
    var y = this.getNodeCount();
    for (var n = 0; n < y; n++) {
        if (this.aNodes[n].url == url && url != "" && url != "/") {
            var poundIndex = url.search("#");
            if (poundIndex == -1) //No pound
                url = url + "?node=" + id; //Add # cases
            else {
                //var txt2 = txt1.slice(0, 3) + "bar" + txt1.slice(3);
                var newUrl = url.slice(0, poundIndex) + "?node=" + id + url.slice(poundIndex);
                url = newUrl;
            }
        }
    }
    
   var ai = this.aNodes.length;
   this.aNodes[ai] = new Node(id,0,0,0,ilvl,name,url,title,comment,target,open);
   this.aNodes[ai]._ai=ai;  // set the array index for this node.
   if (url == this.selNodeURL){
       this.selectedNode = id; //sets focus
   }
}

cdpTree.prototype.getNodeCount = function(){
   return this.aNodes.length - 1;
}

cdpTree.prototype.getNodeai = function(node){
   var y = this.getNodeCount();
   var ai=-1;
   for (var n=0; n<y; n++){
      if(this.aNodes[n].id == node){
	     ai = this.aNodes[n]._ai;
	  }
   }
   return ai;
}

cdpTree.prototype.undoSelectedNode = function(){
   var sn = this.selectedNode;
   var ai = this.getNodeai(this.selectedNode);
   var eDiv = document.getElementById('s' + this.menu + ai);
   if (this.aNodes[ai].url != ""){ 
       eDiv.setAttribute('class', 'nodeurl');
   }
   else{
      eDiv.setAttribute('class','node');
   }
}

cdpTree.prototype.showSelectedNode = function(){
   var sn = this.selectedNode;
   var ai = this.getNodeai(this.selectedNode);
   var eDiv = document.getElementById('s' + this.menu + ai);
   if (this.aNodes[sn].url != ""){ 
      eDiv.setAttribute('class','nodeSelurl');
   }
   else{
      eDiv.setAttribute('class','nodeSel');
   }
}

cdpTree.prototype.moveDown = function(node){
   var newNode = node;
   var ai = this.getNodeai(node);
   var y = this.getNodeCount();
   if (ai == y-1) return node;  // at the bottom
   // assume array is inorder 
   var cn = this.aNodes[ai];  // try node instead of ai
   var nn = this.aNodes[ai + 1];

   if (cn.hasChildren() && cn.isExpanded())
           newNode = cn.lptr;
   else if(cn.hasChildren() && (cn.rptr > cn.id))
       newNode = cn.rptr;
   else {  // go sibling?
       if(cn.rptr == nn.id){
           newNode=cn.rptr;
       }
       else {
           //go to parents next sibling
           if(cn.isLastSibling()){
                         
               var notdone = 1;
               if (cn.pid == 1) notdone=0; // you are at the bottom
               while(notdone){
                   for (var x=0; x<y; x++){
                       // find parent (may still have bug when id is at bottom...

                       if (cn.pid == this.aNodes[x].id){
                           // at node that is parent - check if parent is last sibling or not
                           if(!this.aNodes[x].isLastSibling()){
                               if(this.aNodes[x].rptr == 1) {
                                   newNode=cn.id;
                               }
                               else{
                                   newNode=this.aNodes[x].rptr;
                               }
                               // found it so done
                               notdone=0;x=y+1;
                                              
                           }
					   
					
                           else {
                                          
                               if (x == y) notdone=0; // if at the end then no match - done...
                                   // we need to loop up to find this guys parent
                               else {
                                   // set a new current node to be the pid and reloop from beginning of array...
                                            
                                   ai = this.aNodes[x]._ai;
                                   cn = this.aNodes[ai]; 
                                   nn = this.aNodes[ai+1];
                                   x=y+1;
                               }
                           }
                       }
                   }
               }
           }
       }
   }

   return newNode;
}

cdpTree.prototype.moveUp = function(node){
   var newNode=node;
   var ai = this.getNodeai(node);
   var y = this.getNodeCount();
   var cn = this.aNodes[ai];
   if (ai==1) {return node; } // at the top
   var nn = this.aNodes[ai-1];
   // is cn a sibling or child of previous node
   if (nn.rptr == cn.id  || nn.lptr == cn.id){
	    newNode = nn.id;
	} 
	else {
		// next one is either top. or another child set - need to find next displayed node to move to...
		var done=0;
		while(!done){
			var cndNode = nn;
			var cndPIDai = this.getNodeai(cndNode.pid);
			if (cndPIDai == cndNode._ai) {
				newNode = node;
				done=1;
			}
			else{
				if (this.aNodes[cndPIDai].isExpanded()){
					newNode = cndNode.id;
					done=1;
				}
				else
				   nn=this.aNodes[cndPIDai];
			}
		}
		for (i=ai-2; i>1; i--){
		   // find parent of cndNode and see if this node is visible
		   // will need to make this a recursive function - just go one level right now.
		   if (this.aNodes[i].id == cndNode.pid){
		      if (this.aNodes[i].isExpanded()){
			     newNode = cndNode.id;
			   }
			   else{
				  newNode=this.aNodes[i].id;
			   }
		   }
		}
	}
   return newNode;
}

cdpTree.prototype.setKeyEvent = function(){
   var keyDiv = '#'+this.divid;   
   var d=this.divid;

   $(keyDiv).keydown(function(event){
      switch(event.keyCode){

	     case 13:   // the enter key
			        var d=menuarray[this.id];
					var ai = d.getNodeai(d.selectedNode);
					var theURL = d.aNodes[ai].url;
					var theTarget = d.aNodes[ai].target;
					if (theURL !="") {
					   window.open(theURL,theTarget);
					}
					return(false);
					break;
          case 35:  //end key (Jump to top node)
                      var d = menuarray[this.id];
                      var y = d.getNodeCount();
                      for (var n = 0; n < y; n++) {
                          var oldNode = d.selectedNode;
                          d.undoSelectedNode();
                          d.selectedNode = d.moveDown(oldNode);
                          d.showSelectedNode();
                      }
                      return (false);
                      break;

          case 36:  //home key (Jump to bottom node)
                      var d = menuarray[this.id];
                      var y = d.getNodeCount();
                      for (var n = 0; n < y; n++) {
                          var oldNode = d.selectedNode;
                          d.undoSelectedNode();
                          d.selectedNode = d.moveUp(oldNode);
                          d.showSelectedNode();
                      }
                      return (false);
                      break;
		 case 37:   // left arrow key (collapse)
			        var d=menuarray[this.id];
					var ai = d.getNodeai(d.selectedNode);

					if (d.aNodes[ai].isExpanded() && d.aNodes[ai].hasChildren()) {
					    d.o(ai);
                        //TODO Update mouse click event to call this also
					    d.closeAllSiblings(ai);		
					}
					return(false);
		 		    break;
		 case 38:   // up arrow key 
		            //alert("Up arrow key recognized");
					var d=menuarray[this.id];
					var oldNode = d.selectedNode;
					d.undoSelectedNode();
					d.selectedNode = d.moveUp(oldNode);
					d.showSelectedNode();
					return(false);
		 		    break;
		 case 39:   // right arrow key (expand and move down one)
			        var d=menuarray[this.id];
					var ai = d.getNodeai(d.selectedNode);
					if (!d.aNodes[ai].isExpanded() && d.aNodes[ai].hasChildren()){
					   d.o(ai);
					}
					return(false);
		 		    break;
		 case 40:   // down arrow key
					var d=menuarray[this.id];
					var oldNode = d.selectedNode;
					d.undoSelectedNode();
					d.selectedNode = d.moveDown(oldNode);
					d.showSelectedNode();
					return(false);
		 		    break;
		 default:
		            break;
	  }
   });
}

cdpTree.prototype.nodestatus = function(status,n) {
   // change node status in document
   eDiv = document.getElementById('d' + this.menu + n);
   eJoin = document.getElementById('j' + this.menu + n);
   try
   {   
      eJoin.src=(status)?this.icon.nlMinus:this.icon.nlPlus;
      eDiv.style.display = (status)?'block':'none';
   } catch (e)
   {
      //do nothing
   }
}

// close all children
cdpTree.prototype.closeAllChildren = function(node){
   //alert("In closeAllChildren()");
   var y = this.getNodeCount();
   for (var n=0; n<y; n++){
      if (this.aNodes[n].pid == node.id && this.aNodes[n].hasChildren()){
	     if (this.aNodes[n]._io) this.nodeStatus(false,n);
		 this.aNodes[n]._io=false;
		 this.closeAllChildren(this.aNodes[n]);
	  }
   }
}

// close all nested branches
cdpTree.prototype.closeAllSiblings = function (id) {
    var cn = this.aNodes[id];
    var y = this.getNodeCount();
    var n = this.aNodes[id].id;

    for (n; n < y; n++)
    {
        if (this.aNodes[n].ilvl == cn.ilvl)
        n = y;
        if (this.aNodes[n].isExpanded() && (this.aNodes[n].ilvl > cn.ilvl))
        {
            var nn = this.aNodes[n];
            nn.toggleExpanded();
            this.nodestatus(nn._io, n);
        }
    }
}

// open or close a node
cdpTree.prototype.o = function(id){
    var cn = this.aNodes[id];
   cn.toggleExpanded();
   this.nodestatus(cn._io, id);
}

// open or close all nodes
cdpTree.prototype.oAll = function (status) {
   var y = this.getNodeCount();
   for (n=0; n<y; n++){
      // close or open all - but ignore the root node - it smust always be open
	  if (this.aNodes[n].hasChildren() && this.aNodes[n].pid != this.root.id){
	     this.nodestatus(status,n);  // change icon if has children
	     this.aNodes[n]._io = status;
	  }  
   }
}

cdpTree.prototype.openAll = function () {
   this.oAll(true);
}

cdpTree.prototype.closeAll = function () {
   this.oAll(false);
}

cdpTree.prototype.indent = function (node, ai){
   var str='';

   if (this.root.id != node.pid){
      for (var n=0; n<this.aIndent.length; n++){
	     str+= ' <img src="'+this.icon.empty+'" alt="" />';
	  }
	  node.isLastSibling() ? this.aIndent.push(0) : this.aIndent.push(1);
	  if (node.hasChildren()){
	     str+='<a href="javascript: ' +this.divid + '.o(' + ai + ')"><img id="j'+this.menu+ai+'" src="';
	     str+= node.isExpanded() ? this.icon.nlMinus : this.icon.nlPlus;
		 str+='" alt="" /></a>';
	  }
	  else {
	     str+= ' <img src="'+this.icon.empty+'" alt="" />';
	  }
   }
   return str;
}

cdpTree.prototype.showNode = function(node, ai){   // node and array index for node (which should be same for now)
   //alert("In showNode() for NodeName: "+node.name);
   var str = '<div class="dTreeNode">' + this.indent (node, ai);
   
   if (node.url != ""){
	  str += ' <a id="s'+this.menu+ai+ '"';
	  // if selected node
	  if (this.selectedNode == node.id) str+=' class="nodeSelurl" ';
	  else str += ' class="nodeurl"';
      str += '	  href="' + node.url + '"';
	  if(node.title !="") str+=' title="' +node.title+ '"';
	  if(node.target != "") str+=' target="'+node.target+'"';
	  str += '>';
	  str += node.name;
	  str += ' </a>';
	  if(node.comment != "") str+=' '+node.comment;   
   }
   else{
      str += ' <a id="s'+this.menu+ai+'" href="javascript: ' + this.divid + '.o(' + ai + ')"';
	  if (this.selectedNode == node.id) str+=' class="nodeSel" ';
	  else str += ' class="node"';
	  str += '>'+node.name;
	  str += ' </a>';
	  if(node.comment != "") str+=' '+node.comment;   
   }
   if (node.hasChildren()) {
      str += '<div id="d' + this.menu + ai + '" class = "clip" style="display:' + ((this.root.id == node.pid || node.isExpanded()) ?'block':'none')+';">';
	  str += this.showTree(node);    
	  str+='</div>';
   }
   str += ' </div>';
   this.aIndent.pop();
   return str;
}

// div id's are d[this.menu][ai]   - these are for nodes with children  and can have display of block or none
// url nodes have a id's that are s[this.menu][ai]   have a class of nodeurl
// non-url nodes do not have id's class of node

cdpTree.prototype.showTree= function(pNode){
   var str=''; 
   var n;
   var y = this.getNodeCount();

   // assume nodes in Order for now all the Tree 
   if (pNode.id == -1) n=0;
   else n=pNode.id-1;   // set to the index of the passed in node
   
   // loop to process all nodes for the Tree
   for (n; n<y; n++){
      if(this.aNodes[n].pid == pNode.id){   // is this nodes parent the passed in node? process its children
         var cn = this.aNodes[n];  // set current node in structure 
         str += this.showNode(cn ,n);
		 if(cn.isLastSibling()) break;         // processed a last sibling
	  }   
   }
   return str;
}

// takes object cdpTree and outputs to page via document.write(d);
cdpTree.prototype.toString = function(){
   var str = '<div class="dtree">\n';
       str+= '<p><a href="javascript: '+this.divid+'.openAll();"><img src="../common/media/nolines_plus.jpg"><b>Open all</b></a> | ';
       str+= '   <a href="javascript: '+this.divid+'.closeAll();"><img src="../common/media/nolines_minus.jpg"><b>Close all</b></a></p>';
   if(document.getElementById){
	 // this.root allows me to later start at a node other than the real root
	 var rn=this.aNodes[0];
	 str+=this.showTree(this.root);
   } else str+= 'Browser not supported.';
   str+='</div>';
   // more selected node processing
   this.completed=true;
   return str;
}

cdpTree.prototype.renderTree = function(){
 var str = this.toString();
 // alert(str);
 // append to div
 document.getElementById(this.divid).innerHTML =  str;
}

// create Tree - read in the xml file
// this works for firefox
cdpTree.prototype.readScript = function(jv){
   var myTree = this;  // my Tree Menu or cdpTree
   
   var UniqueID = 1;
   //$.parseJSON(jv);   //mytree is included vmtyree.js - not passed in...
   $.each(jv.nodes, function (i, s) {
       if (showlvl) myTree.add(UniqueID, s.ilvl, (s.ilvl+=")"+s.name), s.url, s.title, s.comment, s.target, s.expanded);
       else myTree.add(UniqueID, s.ilvl, s.name, s.url, s.title, s.comment, s.target, s.expanded);
       UniqueID++;
   });

    //Set up the HEAD node
       this.aNodes[0].id = 1;
       this.aNodes[0].pid = -1;
       this.aNodes[0].lptr = 2;
       this.aNodes[0].rptr = -1;

  

    //Loop through and generate the pid, lptr, and rptr
   var y = this.getNodeCount();
   for (var n = 1; n < y -1 ; n++) {  // test

       //set up the pid
       if (this.aNodes[n].ilvl == 0)
           this.aNodes[n].pid = 1;
       else {
           if (this.aNodes[n].ilvl > this.aNodes[n - 1].ilvl)
               this.aNodes[n].pid = this.aNodes[n - 1].id;
           else if(this.aNodes[n].ilvl == this.aNodes[n - 1].ilvl)
               this.aNodes[n].pid = this.aNodes[n - 1].pid; 
           else if (this.aNodes[n].ilvl < this.aNodes[n - 1].ilvl) {
               //Loop backwards...?
               for(var i = 1; i < this.getNodeCount(); i++) {
                   if (this.aNodes[n].ilvl == this.aNodes[n - i].ilvl) {
                       this.aNodes[n].pid = this.aNodes[n - i].pid;
                       i = this.getNodeCount();
                   }
               }
           }
       }    
        
     
       //Set up the lptr
       if (this.aNodes[n].ilvl < this.aNodes[n+1].ilvl) //hasChildren?
           this.aNodes[n].lptr = this.aNodes[n].id + 1;//Yes, left most child id
       else
           this.aNodes[n].lptr = 0;
      
       //Set up the rptr
       if (this.aNodes[n].ilvl > this.aNodes[n + 1].ilvl)//isLastSibling?
           this.aNodes[n].rptr = this.aNodes[n].pid;//Yes, parent ID
       else //no
       {
           // check if last entry
           if (this.aNodes[n].id == y-1) {
              this.aNodes[n].rptr = this.aNodes[n].pid;
           }
         else{
           
           //now check if he has children
           if (this.aNodes[n].ilvl == this.aNodes[n + 1].ilvl)
               this.aNodes[n].rptr = this.aNodes[n].id + 1; //no, next sibling's ID
           else {
               // need to check if node has children but no sibling
               // FIX FIX FIX
               for (var h = n+1; h <= y; h++) {
                   if (this.aNodes[n].ilvl == this.aNodes[h].ilvl) {
                       this.aNodes[n].rptr = this.aNodes[h].id; 
                       h=y+3;
                   }
                   else {
                      if(this.aNodes[n].ilvl > this.aNodes[h].ilvl) {
                        this.aNodes[n].rptr = this.aNodes[n].pid;
                        h=y;
                      }
                   }
               }
           }
         }
       }
       
            
       //TestPrint:
    if (showids)
       this.aNodes[n].comment = "u " + this.aNodes[n].id + ", p " + this.aNodes[n].pid + ", l " + this.aNodes[n].lptr + ", r " + this.aNodes[n].rptr + ",ai " + this.aNodes[n]._ai;

   }
   // Handle last Node
   this.aNodes[n].id=y;
       this.aNodes[n].pid = 1;
       this.aNodes[n].lptr = 0;
       this.aNodes[n].rptr = 1;
     if(showids)
        this.aNodes[n].comment = "uid: " + this.aNodes[n].id + ", pid: " + this.aNodes[n].pid + ", lptr: " + this.aNodes[n].lptr + ", rptr: " + this.aNodes[n].rptr + ",ai: " + this.aNodes[n]._ai;

     this.openTo(this.selNodeURL);
   return this;
}

// If push and pop is not implemented by the browser
if(!Array.prototype.push){
   Array.prototype.push = function array_push(){
      for (var i=0; i<arguments.length; i++)
	     this[this.length]=arguments[i];
	  return this.length;
   }
}

if(!Array.prototype.pop){
   Array.prototype.pop = function array_pop(){
      lastElement = this[this.length-1];
	  this.length = Math.max(this.length-1,0);
	  return lastElement;
   }
}

// Opens the tree to a specific node

cdpTree.prototype.openTo = function (nUrl) {

    this.closeAll(); //make sure everything is closed first

    var y = this.getNodeCount();
    var id = null;
    for (var n = 0; n < y; n++) {
        if (this.aNodes[n].url == nUrl)
            id = this.aNodes[n].id;
    }
    if (id == null)
        id = this.aNodes[1].id; //set to root/Home
    else
        id--;//offset for root node
         //still feels "hackish", I need to work on a way to get everything alligned better -Joe
        
    
    if (this.aNodes[id].hasChildren())
        this.o(id);

        var x = this.aNodes[id].pid;

        while (x > 1) {
            this.o(x - 1);
            x = this.aNodes[x - 1].pid;
        }
}

// End of file cdptree.js
