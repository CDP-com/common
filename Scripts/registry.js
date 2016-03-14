// Common Registry functions
// COMMON REGISTRY DEFAULT PERMISSIONS
var globalDefaultPermissionVal = 0;
//var Root = "HKEY_CURRENT_USER\\SOFTWARE\\CDP\\SnapBack\\Apps\\";  
var currentUserDefaultCaution = "0";    // this is the global Throw caution to the wind flag for the current use

//MESSAGES
MSG_WARNING="This button is potentially dangerous or is in testing.  To run this button you can go to the settings page and set the global caution flag or talk to your administrator."
MSG_RUNDISABLED="This button has been disabled. You are not allowed to run it. For more information, talk to your administrator."
MSG_USERDISABLED="This button has been disabled for Normal Users. You are not allowed to run it. For more information, talk to your administrator."

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
function IsAdmin(DName, UName)
{
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
	
function ReadFromRegistry(sRegEntry)
{
    var regpath = sRegEntry;
    var oWSS = new ActiveXObject("WScript.Shell");
    return oWSS.RegRead(regpath);
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
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\";
	var RegPath = AppRoot + AppName + "\\button" + ButtonNumber + "\\" + ValueName;
	var WshShell = new ActiveXObject("WScript.Shell");
	var ret = WshShell.RegWrite(RegPath, Value, ValueType);
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
