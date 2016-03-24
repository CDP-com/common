	var menuarray = new Array();
	var scrolled = false;

// Detetermine if a link is relative to local page 
function getRelativeURL(){
	 var relURL = "";
	 var strhref = document.location.href;
	 var array_url = strhref.split('/');
	 var arraylength = array_url.length;
	 if (arraylength > 2)
	 {
		relURL = "../" + array_url[arraylength - 2] + "/" + array_url[arraylength - 1];
	 }
	 else
	 {
		relURL = document.location.href;
	 }
	 
	 if (relURL.indexOf("#") > -1)
	 {
		relURL = relURL.substring(0, relURL.indexOf("#"));
	 }
	 
	 if (relURL.indexOf("?") > -1)
	 {
		relURL = relURL.substring(0, relURL.indexOf("?"));
	 }

	 return relURL;
}
		 
var treemenu01;

// Load Navigation Outline 
function loadTree(divid,treeName,nodeURL,jv){		
		var str="";
		var tmptree;
	// divid == tree[treeName] == var name for the treemenu
	// jsonVar == eval(treeName);
	// nodeURL = string node url, this is the node that the tree will be opened to and focused on
		tmptree = new cdpTree(divid,treeName,nodeURL);
		tmptree.readScript(jv).renderTree();

		tmptree.setKeyEvent(divid);
		treemenu01=tmptree;
		menuarray[divid]= tmptree;
}

// Needed to reset the page scroll after tab click
function pageScroll(){
	 if ( !scrolled )
	 {
		scrolled = true;
		window.scrollTo(0,top);
		scrolldelay = setTimeout('pageScroll()', 200);
	 }
}

// Place focus with Outline upon page load
window.onload = function(){
	 var treemenuobj = document.getElementById('treemenu01');
	 if (treemenuobj)
	 {
		if (document.getElementById('treemenu01').visible)
		   document.getElementById('treemenu01').focus();
	 }
		
	try {
		GetCurrentUserLastLModifiedDate()	
	}
	catch (err) {
		var Tripped = "<table cellpadding=2 cellspacing=2 width=%50><tr><td colspan=2><h3>Global Settings Buttons Not Enabled - Talk to Your Administrator</h3></td></tr><tr><td width=50%><input type='checkbox' name='radiobtn' disabled='disabled' onclick='ChangeSetGlobal();'>Global Set Current</td><td width=50%><input type='checkbox' name='radiobtn' disabled='disabled' checked='checked' onclick='ChangeGlobalInDefault();'>Global Set Default</td></tr></table>"
	}	
}