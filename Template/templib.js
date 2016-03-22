// JavaScript Functions Which Are Used to Display Common Page Content or Elements

/*-----------------------------------------------------*/
/*----------- Structural Template Functions -----------*/
/*-----------------------------------------------------*/

function CreateAppJSFile()
{	
	var s="<script type='text/javascript' src='";
	appJSFile="appname";
	s+=eval(appJSFile).toLowerCase();	
	s+=".js'></script>";
	document.write(s);
}

function CreateSidebar1()
{	
	var s="<div id='page'>";
	s+="<nav id='menu' class='panel' role='navigation'>";
	s+="";  
	s+="	<div class='logo'>";
	s+="		<a href='../welcomeoca/main.html' title='Return to the SnapBack Apps Home Page'><img src='../common/media/snapback-apps-logo-open.png' /></a>";  
	s+="	</div><!--End Logo-->";
	s+="";
	s+="	<div class='menu-collapse'>";
	s+="		<a href='#menu' class='menu-link' title='Click to Close the Navigation'>&lArr; Collapse Outline</a>";
	s+="	</div>";
	s+="";
	s+="	<div style='clear: both;'></div>";
	s+="";
	s+="	<div id='secondary'>";
	s+="		<div id='treemenu01' tabindex='0'>";
	document.write(s);
}

function CreateSidebar2()
{	
	var s="</div>";
	s+="		</div><!--End Secondary-->";
	s+="";
	s+="	<div class='help-snapback'><a href='../welcomeoca/main.html' title='Click to Learn How You Can Help SnapBack Apps'>";
	s+="		<span class='help-snapback-header'><img src='../common/media/we-need-you.png' alt='We Need You' />We Need You</span>";
	s+="		<p class='help-snapback-text'>Help make SnapBack Apps by contributing and improving the experience for other users.</p>";
	s+="	</a></div><!--End .help-snapback-->";
	s+="";
	s+="</nav>";
	s+="";
	s+="<div id='collapsed-menu'>";
	s+="	<div class='logo'>";
	s+="		<a href='../welcomeoca/main.html' title='Return to the SnapBack Apps Home Page'><img src='../common/media/snapback-apps-logo-closed.png' /></a>";  
	s+="	</div><!--End Logo-->";
	s+="";
	s+="	<div class='menu-collapse'>";
	s+="		<a href='#menu' class='menu-link' title='Click to Expand the Navigation'>&rArr;</a>";
	s+="	</div>";
	s+="";
	s+="";
	s+="</div>";
	s+="";
	s+="<div id='primary' class='push'>";
	document.write(s);
}

function CreatePageContent1()
{	
	var s="<div id='app-intro'>";
	s+="	<div class='app-name'>";
	appTitle="apptitle";
	s+=eval(appTitle);
	s+="		<br /><span class='app-last-modified'>Last Modified: DD/MM/YYYY</span>";
	s+="	</div><!--End #app-name-->";
	s+="";
	s+="	<div class='producer-credits'>";
	s+="		<img src='../common/media/default-group-icon.png' alt='The Producer of this App'/>";
	s+="		<a id='connect' href='";
	appLink="connect_link";
	s+=eval(appLink);
	s+="' title='Connect with the Developers of this App''>Produced by ";
	appGroup="group_name";
	s+=eval(appGroup);
	s+="<br />Suggest / Contribute / Get Help</a>";
	s+="	</div><!--End #producer-credits--></div><!--End #app-intro-->";
	s+="";
	s+="	<div id='tab-container'>";
	s+="        <div id='tabnav'>";
	document.write(s);
}

function CreatePageContent2(){
	var s="<span></span>";
	s+="	    </div><!--End #tabs-->";
	s+="    </div><!--End #tab-container -->";
	s+="";
	s+="    <div id='content-container'>";
	document.write(s);
}

function CreateFooter(){
	var s="     </div><!--End content-container-->";
	s+="";
	s+="     <div style='clear: both;'></div>"; 
	s+="";    
	s+="    	<div id='footer'>";
	s+="    		<div id='footer-container'>";
	s+="    			<p>Copyright &copy; 2013-2016 <a id='cdp-link' href='http://www.cdp.com/' title='Visit Columbia Data Products on the Web'>Columbia Data Products</a>. All rights reserved.</p>";
	s+="    		</div>";
	s+="    	</div>";
	s+="";								
	s+="	</div><!--End Primary-->";
	s+="";      
	s+="</div><!--End Page-->";
	document.write(s);
}

/*-----------------------------------------------------*/
/*----------- Default Tab Content Functions -----------*/
/*-----------------------------------------------------*/

function CreateStandardTechnical(){
	var s="<p>This area is dedicated to providing technical details about the app.  Provide the mechanics of how the app works.  Generally speaking, if you are making changes to a user\'s computer, it\'s best to detail those changes in a completely transparent manner.</p>";
	s+="";
	s+="<p>Include more details than what would appear on the 'Home' tab and be free to use more technical language in the process.</p>";
	s+="";
	s+="<hr />";
	s+="";
	s+="<h3>Technical Details</h3>";
	s+="<p>Include, in specific wording, what your app does.  Some questions you may want to answer include: What files does your app change?  In what programming language is your app written?  Are there any resources you\'ve used to create your app?  Feel free to include as much detail as you want.</p>";
	s+="";
	s+="<hr />";
	document.write(s);
}

function CreateStandardPricing(){
	var s="<p><strong>No Cost to You.</strong></p>";
	s+="";
	s+="<p>All SnapBack Apps are free for both business and personal use, provided that the SnapBack Platform is 'hand installed', by a user and not 'mass installed'.    However, for some apps they may be working with or modify another application, such as Microsoft Word, which is obviously not free.  Sometimes we might independently offer that application to you with a link to a separate page.  If and when we offer you the software, we warrant that to our best ability, we have fully disclosed which products in that category are best, the least cost prices with links, along with any dissenting opinions from contributors like you. </p>";
	s+="";
	s+="<p>For all our users, contributors, attributable sources, and other companies, we have prepared an easy to understand page that explains all our <a id='policiesterms' href='#' >Policies, Complete Terms, and Conditions of our SnapBack Apps, Platform, website, and our SnapBack Apps Factory</a> where they are produced.  Together, this page, the FAQ, and the discussions of users, contributors, and CDP should convince you that this project is worthy of your full support.</p>";
	document.write(s);
}

function CreateStandardCertification(){
	var s="<p>Each Committee has signed off on their part.  For more detail of each committees\' policies and procedures, visit their home pages.</p>";
	s+="";
	s+="<table class='certification-table'>";
	s+="";
	s+="<tr>";
	s+="	<th>Certification Committee</th>";
	s+="	<th>Certification Details</th>";
	s+="</tr>";
	s+="";
	s+="<tr>";
	s+="	<td class='committee-name'>CDP Certification</td>";
	s+="	<td>";
	s+="		<p>Released = [Date] | Version = [Version] | First Released = [Date] | Manifest Name = [Name] | By = [Author/Group]</p>";
	s+="		<p>NOTE: CDP will include any notes directed at the user here.</p>";
	s+="	</td>";
	s+="</tr>";
	s+="";
	s+="<tr>";
	s+="	<td class='committee-name'>Performance / System Impact</td>";
	s+="	<td>";
	s+="		<p>RAM = [Details] | DISK = [Details] | Runtime/CPU = [Details]</p>";
	s+="		<p>NOTE: the Performance/System Impact Committee will include any notes directed at the user here.</p>";
	s+="	</td>";
	s+="</tr>";
	s+="";
	s+="<tr>";
	s+="	<td class='committee-name'>Security/Logging/User Rights/Locations</td>";
	s+="	<td>";
	s+="		<p>Security:[Details]<br />Logging: [Details]<br />Users: [Details]<br />Rights required: [Details]<br />Locations: [Details]<br /></p>";
	s+="		<p>NOTE: the Security/Logging/User Rights/Locations Committee will include any notes directed at the user here.</p>";
	s+="	</td>";
	s+="</tr>";
	s+="";
	s+="<tr>";
	s+="	<td class='committee-name'>Safety/Conflicts/Compatibility/Expertise</td>";
	s+="	<td>";
	s+="		<p>Safe = [Details] | Conflicts = [Details] | Compatibility = [Details] | UserType = [Details]</p>";
	s+="		<p>NOTE: the Safety/Conflicts/Compatibility/Expertise Committee will include any notes directed at the user here.</p>";
	s+="	</td>";
	s+="</tr>";
	s+="";
	s+="<tr>";
	s+="	<td class='committee-name'>Legal/Attribution/Liability</td>";
	s+="	<td>";
	s+="		<p>Attributed = [Details] | DMCA Issues = [Details] | Damage = [Details]</p>";
	s+="		<p>NOTE: the Legal/Attribution/Liability Committee will include any notes directed at the user here.</p>";
	s+="	</td>";
	s+="</tr>";
	s+="";
	s+="<tr>";
	s+="	<td class='committee-name'>Monetization/Privacy</td>";
	s+="	<td>";
	s+="		<p>Monetization = [Details] | Privacy Issues = [Details]</p>";
	s+="		<p>NOTE: the Monetization/Privacy Committee will include any notes directed at the user here.</p>";
	s+="	</td>";
	s+="</tr>";
	s+="";
	s+="</table>";
	document.write(s);
}

/*-----------------------------------------------------*/
/*------------- Specific Content Elements -------------*/
/*-----------------------------------------------------*/

function CreateSrcCodeIframes()
{	
	var s="<h3>Source Code of Scripts</h3>";
	s+="<div class='accordion'>";
	for (i=0; i<btncount; i++){
		s+="<h3>Button "+i+" - ";
		btnTitle="btn"+i+"_Title";
		s+=eval(btnTitle);
		s+="</h3>";
		s+="<div>";
		s+="<iframe id='srccode"+i+"' name='srccode"+i+"' width='80%' frameborder='0' scrolling='auto' src='";
		btnSrc="btn"+i+"_Source";
		s+=eval(btnSrc);
		s+="' seamless sandbox=''></iframe>";
		s+="</div>";
	}
    s+="</div>";
	document.write(s);
}
