// Common Registry functions
// COMMON REGISTRY DEFAULT PERMISSIONS
//        Author: SnapBack Development Team   
// Last Modified: 03/15/16

/*-----------------------------------------------------*/
/*-------------------- Set Globals --------------------*/
/*-----------------------------------------------------*/

var globalDefaultPermissionVal = 0;
//var Root = "HKEY_CURRENT_USER\\SOFTWARE\\CDP\\SnapBack\\Apps\\";  
var currentUserDefaultCaution = "0";    // this is the global Throw caution to the wind flag for the current use

var GlobalPathDefaultValName = "DefaultCaution";
var GlobalCurrentCautionValName = "CurrentCaution";
var GlobalLastModifiedCautionValName = "LastModifiedCaution";	
var GlobalLastModifiedCautionVal = "";

///////////////////////////////////////////////////////////////////////////////
// Function Name : IsAdmin
// Purpose : Check a user is in Administrator Group or Not
// Parameters : DName (Domain name or Local computer name)
//              UName (Current User Name)
// Return : Function return 1 if user is in Administrator Group and 0 if not
///////////////////////////////////////////////////////////////////////////////
function IsAdmin()
{
	var oTest = new ActiveXObject("wscript.shell");
	DName = oTest.ExpandEnvironmentStrings("%COMPUTERNAME%") 
	UName = oTest.ExpandEnvironmentStrings("%USERNAME%") 
	oTest = null;
    var objWMIService = GetObject("winmgmts:\\\\" + DName + "\\root\\CIMV2");
    var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_GroupUser");
    var enumItems = new Enumerator(colItems);
	
    for (; !enumItems.atEnd(); enumItems.moveNext()) {
        var objItem = enumItems.item();
        var gc = objItem.GroupComponent;
        var pc = objItem.PartComponent;  
        var pos = pc.search("Name=");
		var res = pc.slice(pos);
		
        if (res.indexOf(UName) != -1) {	  
            if (gc.indexOf("Administrators") != -1) {	  
                 return 1;
	        }
        }
    }
    return 0; 
}

// checks to see if the user is running as administrator
// returns true or false.
function IsAdministrator()
{
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\test";
	var WshShell = new ActiveXObject("WScript.Shell");
	try
	{
		var ret = WshShell.RegWrite(AppRoot, 1, "REG_DWORD");
		//alert("Running as administrator");
	    return true;
	}
	catch(e)
	{
		//alert("Not Running as administrator");
		return false;
	}

}

/* This function launches the platform running as administrator and shuts down this hta */
/* */
	function SBAdmin()
	{
		var shell = new ActiveXObject ( "WScript.Shell" );
		var theCommand = shell.ExpandEnvironmentStrings("%PROGRAMDATA%\\CDP\\SnapBack\\Apps\\common\\misc\\SBAdmin.bat");

		// tried running as .lnk and through .bat - works through .bat
		var ret = shell.Run(theCommand,0,false);
		shell = null;		
		window.parent.close();
	}

/*-----------------------------------------------------*/
/*--------------- Initialize Permissions --------------*/
/*-----------------------------------------------------*/

function GetCurrentUserDefault()    
{
	if (ReadFromRegistry("HKEY_CURRENT_USER\\SOFTWARE\\CDP\\SnapBack\\Apps\\DefaultSBECaution"))
		return 1;
	else
		return 0;
//returns 0,1
}

function SetGlobalIniValue(ValueName, Value, ValueType)
{
	var GlobalRoot = "HKEY_CURRENT_USER\\SOFTWARE\\CDP\\SnapBack\\Apps\\";
	var RegPath = GlobalRoot + ValueName;
	var WshShell = new ActiveXObject("WScript.Shell");
	var ret = WshShell.RegWrite(RegPath, Value, ValueType);
	
}

function GetGlobalIniValue(ValueName)
{
	var GlobalRoot = "HKEY_CURRENT_USER\\SOFTWARE\\CDP\\SnapBack\\Apps\\";  
	var RegPath = GlobalRoot + ValueName;
	var WshShell = new ActiveXObject("WScript.Shell");
	return WshShell.RegRead(RegPath);		
}

function SetButtonIniValue(AppName, ButtonNumber, ValueName, Value, ValueType)
{
    // run as admin   HKLM keys must be administrator to modifiy
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\";
	var RegPath = AppRoot + AppName + "\\button" + ButtonNumber + "\\" + ValueName;
	var WshShell = new ActiveXObject("WScript.Shell");
	try
	{
		var ret = WshShell.RegWrite(RegPath, Value, ValueType);
	}
	catch(e)
	{
		alert(MSG_MUSTBEADMIN);
	}
}

function GetButtonIniValue(AppName, ButtonNumber, ValueName)
{
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\";
	var RegPath = AppRoot + AppName + "\\button" + ButtonNumber + "\\" + ValueName;
	var WshShell = new ActiveXObject("WScript.Shell");
        try{
		var ret= WshShell.RegRead(RegPath);
	}
	catch(e){
		var ret=0;
}
	return ret;		
}

function InitializePermissions()
{
	// Init Global permissions
	// Always set globalDefaultPermission
	// Check for Last Modified date
	//    if it exists you are done
	//    if it is not present set current caution permission to default permission
		
	try {
		GlobalLastModifiedCautionVal = GetGlobalIniIniValue(GlobalLastModifiedCautionValName);
		//value is set by user or admin so leave it alone
	}
	catch (err) {
		// put the default value in since it has not been set by user or admin
		globalCurrentCautionPermissionVal=globalDefaultPermissionVal;
		SetGlobalIniValue(GlobalPathDefaultValName, globalDefaultPermissionVal, "REG_DWORD");
	    SetGlobalIniValue(GlobalCurrentCautionValName, globalDefaultPermissionVal, "REG_DWORD");
	}

} 

/*-----------------------------------------------------*/
/*-------------------- Button Logic -------------------*/
/*-----------------------------------------------------*/

function runService(mURL,btnName,command)
{
	var output = "";
    var UpdObj;
    var command2 = mURL + "," + command;
    UpdObj = new ActiveXObject( "CDPUpdater.Updater" );

    try
    {
        output = UpdObj.ExpandEnvVar( command2 );
        output = UpdObj.RequestCommand( output );
    } 
    catch (e)
    {
        alert(e.message);
    }
    finally
    {
        UpdObj = null;
    }
        
   // buttonLogic( output,btnName);
}
function buttonLogic(output,buttonName)
{
	// handle Error Messages
	output = output.toUpperCase();
        if( output.substring( 0, 6 ) == "2,OK,{" )
        {
            //window.location.replace( 'main.html' );
			//$(resulttab).click();
        }
        else if( output.substring( 0, 6 ) == "2,PIPE" )
        {
            window.location.replace( 'pipedown.html' );
        }
        else if( output.substring( 0, 6 ) == "6,UPDA" )
        {
            window.location.replace( 'updating.html' );
        }
        else if( output.substring( 0, 6 ) == "3,OK,{" )
        {
            //window.location.replace( 'results.html' );
			//$(resulttab).click();
        }
        else if( output.substring( 0, 6 ) == "4,OK,{" )
        {
            //location.href = "results.html";
			//$(resulttab).click();
        }
        else if( output.substring( 0, 6 ) == "2,DENY" )
        {
            window.location.replace( 'deny.html' );
        }
        else
        {
            // alert( output.substring( 0, 6 ) );
            location.href = "unknown.html";
        }

    // handle button specific logic 
	switch (buttonName){
		default: alert("No details for "+buttonName);
	}
}

/*-----------------------------------------------------*/
/*-------------- Button Run Table Display -------------*/
/*-----------------------------------------------------*/

function CreateButtonRunTable()
{	
	var s="<table class='main-table'>";
	for (i=0,j=1; i<btncount; i++,j++){
		s+="<td style='width: 32%;'>";
		s+="<div id='cdpbutton"+j+"' class='button-wrapper'>";
		s+="<button package='";
		btnPackage="appname";
		s+=eval(btnPackage);
		s+="' title='";
		btnMouse="btn"+i+"_MouseOver";
		s+=eval(btnMouse);
		s+="' onclick='javascript:RunBtn"+i+"(appname, "+i+", DName, UName, btn"+i+"_Command)'>";
		btnTitle="btn"+i+"_Title";
		s+=eval(btnTitle);
		s+="</button>";
		s+="</div>";
		s+="<a href='#' class='add-to-job-img' title='Add this Button to your Job List'></a><a class='whyButton why-run-img'></a><div class='whyDialog'>";
		btnWhy="btn"+i+"_Why";
		s+=eval(btnWhy);
		s+="</div></a>";
		
		try {
			var btnarguments="btn"+i+"_arguments";
			var btnargumentsNum=eval(btnarguments); 		
			if (btnargumentsNum > 0) {	
				for (n=0,o=1; n<btnargumentsNum; n++,o++){
					s+="<div id='btn"+i+"_arguments' class='btn_arguments'><h4>";
					s+=eval("btn"+i+"_arguments"+n+"DisplayName");
					s+="</h4>";
					var argumentsValue = eval("btn"+i+"_arguments"+n+"Values");
					for (v = 0; v < argumentsValue.length; v++) {
						s+="<input class='";
						btnNum="btn"+i+"_id";
						s+=eval(btnNum);
						s+="argument' type='";
						btnParmType="btn"+i+"_arguments"+n+"Type";
						s+=eval(btnParmType);
						s+="' name='";
						btnParmName="btn"+i+"_arguments"+n+"xmlName";
						s+=eval(btnParmName).replace(/\s+/g, '');
						s+="' value='";
						s+=argumentsValue[v];
						s+="'>";
						s+=argumentsValue[v];
					}
					s+="</div>";
				}		
			}
		}
		catch (e) {
		
		}
		
		s+="</td>";
		s+="<td><div class='more'>"
		btnDescription="btn"+i+"_Description";
		s+=eval(btnDescription);
		s+="</div></td>";
		s+="</tr>";
	}
    s+="</table>";
	document.write(s);
}

/*-----------------------------------------------------*/
/*------------- Button Permission Functions -----------*/
/*-----------------------------------------------------*/

function ChangeGlobalCautionChecked()
{    
	var chkBox = document.getElementById('GlobalCaution');
	
	if (chkBox.checked) {
 	    today = Date();
		SetGlobalIniValue(GlobalPathDefaultValName, 1, "REG_DWORD");
	    SetGlobalIniValue(GlobalCurrentCautionValName, 1, "REG_DWORD");
		SetGlobalIniValue(GlobalLastModifiedCautionValName, today, "REG_SZ");
	} else {
		SetGlobalIniValue(GlobalPathDefaultValName, 0, "REG_DWORD");
		SetGlobalIniValue(GlobalCurrentCautionValName, 0, "REG_DWORD");
		SetGlobalIniValue(GlobalLastModifiedCautionValName, today, "REG_SZ");	
	}
}

function EnableButtonChecked(ButtonNum) 
{   
    today = Date();
	var btncaa="btn"+ButtonNum+"CurrentEnableButton";
	//var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\";  
	//var wsh = new ActiveXObject("WScript.Shell");
	ButtonEnableButtonId = "ButtonEnableButton" + ButtonNum;	
	var chkBox = document.getElementById(ButtonEnableButtonId);
	
	if (chkBox.checked)
    {	    
		SetButtonIniValue(appname, ButtonNum, "CurrentEnableButton", 1, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "EnableButtonLastModifiedDate", today, "REG_SZ");
        btncaa=1;		
	} else {
		SetButtonIniValue(appname, ButtonNum, "CurrentEnableButton", 0, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "EnableButtonLastModifiedDate", today, "REG_SZ");
        btncaa=0;	
	}
	//wsh = null;
} 

function CurrentAllowUserChecked(ButtonNum) 
{   
    today = Date();
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\"; 
	var wsh = new ActiveXObject("WScript.Shell");
	var btncau="btn"+ButtonNum+"CurrentAllowUser";
	CurrentAllowUserId = "CurrentAllowUser" + ButtonNum;
	var chkBox = document.getElementById(CurrentAllowUserId);
	
	if (chkBox.checked)
    {
		SetButtonIniValue(appname, ButtonNum, "CurrentAllowUser", 1, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "AllowUserLastModifiedDate", today, "REG_SZ");
		btncau=1;
	} else {
		SetButtonIniValue(appname, ButtonNum, "CurrentAllowUser", 0, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "AllowUserLastModifiedDate", today, "REG_SZ");
		btncau=0;
	}
    wsh = null;
} 

function CurrentCautionChecked(ButtonNum) 
{   
    today = Date();
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\"; 
    var AppCurrentAllowAdminPath = AppRoot + appname + "\\button" + ButtonNum + "\\CurrentCaution";
	var btnccc="btn"+ButtonNum+"CurrenCaution";
	var wsh = new ActiveXObject("WScript.Shell");
	CurrentCautionId = "CurrentCaution" + ButtonNum;
	var chkBox = document.getElementById(CurrentCautionId);
	
	if (chkBox.checked)
    {
		SetButtonIniValue(appname, ButtonNum, "CurrentCaution", 1, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "CautionLastModifiedDate", today, "REG_SZ");
		btnccc=1;
	} else {
		SetButtonIniValue(appname, ButtonNum, "CurrentCaution", 0, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "CautionLastModifiedDate", today, "REG_SZ");
		btnccc=0;
	}
    wsh = null;
} 

/*-----------------------------------------------------*/
/*-------------- Button Permission Display ------------*/
/*-----------------------------------------------------*/

function CreateButtonAdminTable()
{
	// How to handle multiple checkboxes.
	var CurrentAllowUser=0;
	var ButtonEnableButton=0;
	var CurrentCaution=0;
	var CheckBoxAllowUser="";
	var CheckBoxButtonEnableButton="";
    var CheckBoxCurrentCaution="";
	
    var btnTitle="";
	var s="<div class='accordion'>";
	s+="<h3>Administrator Button Permission Settings</h3>";
	s+="<div>";
	s+="<p>You must be running as administrator to change permissions.  <a onClick='SBAdmin();' href='#'>Click here to run the platform as administrator.</a></p>";
	s+="<ul><li>Enable Button - allows anyone to run if enabled and no one to run if disabled</li><li>Enable Normal User - allows a normal user to run the button or not</li><li>Run without Warning - if disabled a warning message will be presented</li></ul>";
	s+="<table class='tblSettings' id='tblSet' ><col width='10%'><col width='40%'><col width='50%'>";
    s+="<tr>";
	s+="<TABLE cellpadding=3 cellspacing=3 ><th>&nbsp;Button Name&nbsp;</th><th>&nbsp;Enable Button&nbsp;</th><th>&nbsp;Enable Normal User&nbsp;</th><th>&nbsp;Run without Warning&nbsp;</th>";
	if(IsAdministrator())
	{
	for (i=0; i<btncount; i++){
		btnTitle="btn"+i+"_Title";
	    s+="		<tr>";
	    s+="		<td>&nbsp;";
	    s+=eval(btnTitle);
	    s+="</td><td>&nbsp;";
	    ButtonEnableButton = GetButtonIniValue(appname, i, "CurrentEnableButton");
		if (ButtonEnableButton == 1)
		{ 
	        s+="<input type='checkbox' id='ButtonEnableButton"+i+"' checked onclick='EnableButtonChecked("+i+");'>";
		}
		else
		{
			s+="<input type='checkbox' id='ButtonEnableButton"+i+"' onclick='EnableButtonChecked("+i+");'>";
		}
	    s+="</td> ";
	    s+="</td><td>&nbsp;";
	    CurrentAllowUser = GetButtonIniValue(appname, i, "CurrentAllowUser");
		if (CurrentAllowUser == 1)
		{
			s+="<input type='checkbox' id='CurrentAllowUser"+i+"' checked onclick='CurrentAllowUserChecked("+i+");'>";
		}
		else	{
			s+="<input type='checkbox' id='CurrentAllowUser"+i+"'  onclick='CurrentAllowUserChecked("+i+");'>";
		}
	    s+="</td>";
	    s+="</td><td>&nbsp;";
	    CurrentCaution  = GetButtonIniValue(appname, i, "CurrentCaution");
	    if (CurrentCaution == 1)
	    { 
		    s+="<input type='checkbox' id='CurrentCaution"+i+"' checked onclick='CurrentCautionChecked("+i+");'>";
	    }
	    else
	    {
		    s+="<input type='checkbox' id='CurrentCaution"+i+"'  onclick='CurrentCautionChecked("+i+");'>";
	    }
	    s+="</td>";
	    s+="		</tr>";
	}
	}
	else
	{
		// Not an Administrator
	for (i=0; i<btncount; i++){
		btnTitle="btn"+i+"_Title";
	    s+="		<tr class='table-disabled'>";
	    s+="		<td>&nbsp;";
	    s+=eval(btnTitle);
	    s+="</td><td>&nbsp;";
	    ButtonEnableButton = GetButtonIniValue(appname, i, "CurrentEnableButton");
		if (ButtonEnableButton == 1)
		{ 
	        s+="<input name='beb"+i+"' type='checkbox' disabled='disabled' id='ButtonEnableButton"+i+"' checked='checked'/>";
			s+="<input name='beb"+i+"' type='hidden' value='true'/>";
		}
		else
		{
			s+="<input name='beb"+i+"' type='checkbox' disabled='disabled' id='ButtonEnableButton"+i+"' />";
			s+="<input name='beb"+i+"' type='hidden' value='true'/>";
		}
	    s+="</td> ";
	    s+="</td><td>&nbsp;";
	    CurrentAllowUser = GetButtonIniValue(appname, i, "CurrentAllowUser");
		if (CurrentAllowUser == 1)
		{
			s+="<input name='cau"+i+"' type='checkbox' disabled='disabled' id='CurrentAllowUser"+i+"' checked='checked'/>";
            s+="<input name='cau"+i+"' type='hidden' value='true'/>";
		}
		else	{
			s+="<input name='cau"+i+"' type='checkbox' disabled='disabled' id='CurrentAllowUser"+i+"' />";
            s+="<input name='cau"+i+"' type='hidden' value='true'/>";
		}
	    s+="</td>";
	    s+="</td><td>&nbsp;";
	    CurrentCaution  = GetButtonIniValue(appname, i, "CurrentCaution");
	    if (CurrentCaution == 1)
	    { 
		    s+="<input name='cc"+i+"' type='checkbox' disabled='disabled' id='CurrentCaution"+i+"' checked='checked'/>";
			s+="<input name='cc"+i+"' type='hidden' value='true'/>";
	    }
	    else
	    {
		    s+="<input name='cc"+i+"' type='checkbox' disabled='disabled' id='CurrentCaution"+i+"' />";
			s+="<input name='cc"+i+"' type='hidden' value='true'/>";
	    }
	    s+="</td>";
	    s+="		</tr>";
	}
	}
	s+="</tr></table>";
    s+="</table>";
	s+="</div>";
	s+="</div>";
//var myTable = document.getElementById("AdminPerms");
//	myTable.insertAdjacentHTML( 'beforeend', s );
	document.write(s);
}

/*-----------------------------------------------------*/
/*---------------- Misc Button Functions --------------*/
/*-----------------------------------------------------*/

function setbtnValue(btn,value)
{
	btn=value;
	//alert(btn+"  "+value);
}

function getbtnValue(btn)
{
	return eval(btn);
}

function ChangeSetGlobal()
{
	window.confirm("You are trying to change a global setting\nButton Not Enabled _ talk to administrator");		
	var today = new Date();
}

function ChangeGlobalInDefault()
{
	window.confirm("Global set to Default\nButton Not Enabled _ talk to administrator");
}
		
function  ChangeAllowBeta()
{
	window.confirm("Allow Beta Testing"); 
}

function  ChangeBetaDefault()
{
	window.confirm("Set Beta to Off (Default)");
		
}

/*-----------------------------------------------------*/
/*---------------------- Messages ---------------------*/
/*-----------------------------------------------------*/

MSG_WARNING="This button is potentially dangerous or is in testing.  To run this button you can go to the settings page and set the global caution flag or talk to your administrator."
MSG_RUNDISABLED="This button has been disabled. You are not allowed to run it. For more information, talk to your administrator."
MSG_USERDISABLED="This button has been disabled for Normal Users. You are not allowed to run it. For more information, talk to your administrator."
MSG_MUSTBEADMIN="You must be running the platform as administrator to set this value."
