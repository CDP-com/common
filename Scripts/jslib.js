// JavaScript library

/*-----------------------------------------------------*/
/*------------- Environmental Functions ---------------*/
/*-----------------------------------------------------*/

function fnToLocalURL( strEscaped )
{
    //Check for double escape
    if ( strEscaped.indexOf( "%2520" ) > -1 )
    { 
        strEscaped = unescape( strEscaped );
    }
    
    var sReturn = "";
    if ( strEscaped.indexOf( 'file' ) == 0 )
    {
        sReturn += strEscaped;
    } else {
        sReturn = 'file:///';
        sReturn += strEscaped;
    }

    var i;
    for (i=0; i<sReturn.length; i++)
    {
        sReturn = sReturn.replace(/%3A/i, ':');
        sReturn = sReturn.replace(/%5C/i, '/');
        sReturn = sReturn.replace(/%22/i, '');
        sReturn = sReturn.replace(/%5B/i, '[');
        sReturn = sReturn.replace(/%5D/i, ']');
    }
    var nPos1 = sReturn.lastIndexOf( "//" );
    if ( nPos1 > 18 )
    {
        var sReturn1 = ( sReturn.substr( 0, nPos1 ) + sReturn.substring( nPos1 + 1 ) );
        sReturn = sReturn1;
        //WScript.Echo(sReturn);
    }

    return sReturn;
}

function fnToLocalPath( strEscaped )
{
    var sReturn = "";

    var localUrl = strEscaped;
    var i;
    for ( i=0; i<2; i++ )
    {
        if ( localUrl.indexOf( "%" ) > -1 )
        {
            localUrl = unescape( localUrl );
        }
    }
    var n1 = localUrl.indexOf( "file:///" );
    if ( n1 > -1 )
    {
        sReturn = localUrl.substring( n1 + 8 );
    } else {
        sReturn = localUrl;
    }
    while ( sReturn.indexOf("/") > -1 )
    {
        sReturn = sReturn.replace("/", "\\");
    }
    sReturn = escape( sReturn );
    
    return sReturn;
}

// fnGetOs("name" or "version")
function fnGetOs(preturn)
{
   var retval= "";
   var nameOfOs = "";
   //HKLM "SOFTWARE\Microsoft\Windows NT\CurrentVersion" CurrentVersion
   var osVersion = fnReadReg( "HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\CurrentVersion" );
   if (osVersion.length > 0)
   {
      if (osVersion == "5.0") nameOfOs = "Windows 2000";
      if (osVersion == "5.1") nameOfOs = "Windows XP";
      if (osVersion == "5.2") nameOfOs = "Windows XP";
      if (osVersion == "6.0") nameOfOs = "Windows Vista";
      if (osVersion == "6.1") nameOfOs = "Windows 7";
      if (osVersion == "6.2") nameOfOs = "Windows 8";
      if (osVersion == "6.3") nameOfOs = "Windows 8.1";
      if (osVersion == "6.4") nameOfOs = "Windows 10";
   }
   
   if ( preturn.toLowerCase().indexOf( "name" ) > -1 )
   {
      retval = nameOfOs;
   }
   else
   {
      retval = osVersion;
   }
   
   return retval;
}

/*-----------------------------------------------------*/
/*------------------ File Functions -------------------*/
/*-----------------------------------------------------*/

function fnGetName( psFilePath )
{
    var shell = new ActiveXObject ( "WScript.Shell" );
    var sPathFilename = shell.ExpandEnvironmentStrings( psFilePath );

    var fso, afile, sName;
    fso = new ActiveXObject( "Scripting.FileSystemObject" );
    sName = fso.GetFileName( psFilePath );
    
    fso = null;
    shell = null;

    return sName;
}

function fnFileExists( psFilename )
{
    var lSuccess;

    var shell = new ActiveXObject ( "WScript.Shell" );
    var sPathFilename = shell.ExpandEnvironmentStrings( psFilename );
    var fso;
    fso = new ActiveXObject( "Scripting.FileSystemObject" );
    if ( ! fso.FileExists( sPathFilename ) )
    {
        lSuccess = false;
    }
    else
    {
        lSuccess = true;
    }

    fso = null;
    shell = null;

    return lSuccess;
}

function fnDeleteFile( pFilePath )
{
    var shell = new ActiveXObject ( "WScript.Shell" );
    var sPathFilename = shell.ExpandEnvironmentStrings( pFilePath );
    var fso, afile, nSuccess;
    try
    {
        fso = new ActiveXObject( "Scripting.FileSystemObject" );
        afile = fso.GetFile( pFilePath );
        afile.Delete( true );

        nSuccess = 1;
    }
    catch ( ed1 ) {
        nSuccess = 0;
    }
    finally
    {
      fso = null;
      shell = null;
    }
    
    return nSuccess;
}

function fnMoveFile( pFilePath, pTargetDir )
{
    var shell = new ActiveXObject ( "WScript.Shell" );
    var sPathFilename = shell.ExpandEnvironmentStrings( pFilePath );
    var sTargetDir = shell.ExpandEnvironmentStrings( pTargetDir );
    var fso, afile, nSuccess;
    try
    {
        fso = new ActiveXObject( "Scripting.FileSystemObject" );
        afile = fso.GetFile( sPathFilename );
        afile.Move( sTargetDir );

        nSuccess = 1;
    }
    catch ( ed1 ) {
        nSuccess = 0;
    }
    finally
    {
      fso = null;
      shell = null;
    }

    return nSuccess;
}

function fnCopyFile( pFilePath, pTargetDir, pOverwrite )
{
    var lOverwrite = false;
    if (pOverwrite == undefined)
    {
      lOverwrite = false;
    }
    else
    {
      lOverwrite = pOverwrite;
    }
    var shell = new ActiveXObject ( "WScript.Shell" );
    var sPathFilename = shell.ExpandEnvironmentStrings( pFilePath );
    var sTargetDir = shell.ExpandEnvironmentStrings( pTargetDir );
    var fso, nSuccess;
    try
    {
        fso = new ActiveXObject( "Scripting.FileSystemObject" );
        fso.CopyFile( sPathFilename, sTargetDir, lOverwrite );

        nSuccess = 1;
    }
    catch ( ed1 ) {
        nSuccess = 0;
    }
    finally
    {
      fso = null;
      shell = null;
    }

    return nSuccess;
}

function fnWriteLog( log_txt, io_mode )
{
    if ( lDebugMode )
    {
        if ( io_mode == undefined ) io_mode = 8;
        for ( var i=0; i<3; i++ )
        {
            try
            {
                var fso = new ActiveXObject( "Scripting.FileSystemObject" );
                var objLogTextStream = fso.OpenTextFile( fileLog, io_mode, true, 0 );
                objLogTextStream.writeline( log_txt );
                objLogTextStream.close();
                i = 3;
            }
            catch ( e7 )
            {
                //
            }
            finally
            {
               fso = null;
            }
        }
    }
}

function fnWriteArrayToFile( file_name, array_name )
{
   var lSuccess = true;
   var arrayOfLines = [];
   arrayOfLines = array_name;
   addtext( "Writing array to file, " + file_name + "..." );
   try
   {
      var shell = new ActiveXObject ( "WScript.Shell" );
      var strFile_name = shell.ExpandEnvironmentStrings( unescape( file_name ) );
      var fso = new ActiveXObject( "Scripting.FileSystemObject" );
      var t = fso.OpenTextFile( strFile_name, 2, true, - 2 );
      for ( i = 0; i < arrayOfLines.length; i ++ )
      {
         t.WriteLine(arrayOfLines[i]);
      }
      t.close();
      fso = null;
      addtext( "Array successfully written to file, " + file_name + "!" );
   }
   catch ( e7 )
   {
      // WScript.Echo( "    ERROR: " + e7.message + " Writing " + file_name );
      addtext( "Error writing array to file, " + file_name + "!" );
      lSuccess = false;
   }
   shell = null;

   return lSuccess;
}

function fnWriteFile( file_name, out_txt, io_mode )
{
    var i;
    for ( i=0; i<3; i++ )
    {
        try
        {
            var textOut = out_txt;
            var fso = new ActiveXObject( "Scripting.FileSystemObject" );
            var t = fso.OpenTextFile( file_name, io_mode, true, 0 );
            t.WriteLine( textOut );
            t.close();
            i = 3;
        }
        catch ( e7 )
        {
            //WScript.Echo(e7.message);
        }
        finally
        {
            fso = null;
        }
    }
}

function fnReadFile( file_name )
{
    var returnArray = false;
    try
    {
        var fso = new ActiveXObject( "Scripting.FileSystemObject" );
        var t = fso.OpenTextFile( file_name, 1, false, 0 );

        while (! t.AtEndOfStream)
        {     
            if (!returnArray) { returnArray = [] }        
            returnArray.push( t.ReadLine() );      
        }

        t.close();
    }
    catch ( e7 )
    {
        //WScript.Echo(e7.message);
    }
    finally
    {
       var fso = null;
    }
    return returnArray;
}

/*-----------------------------------------------------*/
/*----------------- Folder Functions ------------------*/
/*-----------------------------------------------------*/

function fnFolderExists( psFoldername )
{
    var lSuccess;

    var shell = new ActiveXObject ( "WScript.Shell" );
    var sPathFoldername = shell.ExpandEnvironmentStrings( unescape( psFoldername ) );

    var fso;
    fso = new ActiveXObject( "Scripting.FileSystemObject" );
    if ( ! fso.FolderExists( sPathFoldername ) )
    {
        lSuccess = false;
    }
    else
    {
        lSuccess = true;
    }

    fso = null;
    shell = null;

    return lSuccess;
}

function fnCreateNewFolder( psFoldername )
{
    var lSuccess;
    var shell = new ActiveXObject ( "WScript.Shell" );
    var sPathFoldername = shell.ExpandEnvironmentStrings( unescape( psFoldername ) );

    var fso;
    fso = new ActiveXObject( "Scripting.FileSystemObject" );

    if ( ! fso.FolderExists( sPathFoldername ) )
    {
        fso.CreateFolder( sPathFoldername );
    }
    if ( ! fso.FolderExists( sPathFoldername ) )
    {
        lSuccess = false;
    }
    else
    {
        lSuccess = true;
    }

    fso = null;
    shell = null;

    return lSuccess;
}

function fnDeleteFolder( pFolderPath, pForce )
{
   var nSuccess;
   var lForce = false;
   if (pForce == undefined)
   {
      lForce = false;
   }
   else
   {
      lForce = pForce;
   }
   var shell, fso, sFolderPath;
   try
   {
      shell = new ActiveXObject ( "WScript.Shell" );
      sFolderPath = shell.ExpandEnvironmentStrings( pFolderPath );
      fso = new ActiveXObject("Scripting.FileSystemObject");
      fso.DeleteFolder(pFolderPath, pForce);
      //fso.DeleteFolder("c:\\newtmp");
      nSuccess = 1;
   }
   catch (ed2)
   {
      nSuccess = 0;   
   }
   finally
   {
      fso = null;
      shell = null;
   }
   
   return nSuccess;
}

function fnMoveFolder( pFolderPath, pTargetDir)
{
   var nSuccess;
   var shell, fso, sFolderPath, sTargetDir;
   try
   {
      shell = new ActiveXObject ( "WScript.Shell" );
      sFolderPath = shell.ExpandEnvironmentStrings( pFolderPath );
      sTargetDir = shell.ExpandEnvironmentStrings( pTargetDir );
      fso = new ActiveXObject("Scripting.FileSystemObject");
      fso.MoveFolder(pFolderPath, pTargetDir);
      //fso.MoveFolder(fldrspec, "c:\\windows\\desktop\\");
      nSuccess = 1;
   }
   catch (ed3)
   {
      nSuccess = 0;
   }
   finally
   {
      fso = null;
      shell = null;
   }
   
   return nSuccess;
}

function fnCopyFolder( pFilePath, pTargetDir, pOverwrite )
{
    var lOverwrite = false;
    if (pOverwrite == undefined)
    {
      lOverwrite = false;
    }
    else
    {
      lOverwrite = pOverwrite;
    }
    var shell = new ActiveXObject ( "WScript.Shell" );
    var sPathFilename = shell.ExpandEnvironmentStrings( pFilePath );
    var sTargetDir = shell.ExpandEnvironmentStrings( pTargetDir );
    var fso, afile, nSuccess;
    try
    {
        fso = new ActiveXObject( "Scripting.FileSystemObject" );
        fso.CopyFolder( sPathFilename, sTargetDir, lOverwrite );

        nSuccess = 1;
    }
    catch ( ed1 ) {
        nSuccess = 0;
    }
    finally
    {
      fso = null;
      shell = null;
    }

    return nSuccess;
}

/*-----------------------------------------------------*/
/*--------------- Registry Functions ------------------*/
/*-----------------------------------------------------*/

// fnWriteReg(regkey, regvalue, regtype) returns true/false for success/failure
// Example: fnWriteReg("HKLM\\Software\\Myentry\\myname", "myvalue", "REG_SZ");
// regtype: "REG_SZ", "REG_EXPAND_SZ", "REG_DWORD", "REG_BINARY"
function fnWriteReg(regkey, regvalue, regtype)
{
   //WshShell.RegWrite ("HKLM\\Software\\Myentry\\myname", "myvalue", "REG_SZ");
   var success = true;
   try
   {
      var WshShell = new ActiveXObject("WScript.Shell");
      regvalue = WshShell.ExpandEnvironmentStrings(regvalue);
      WshShell.RegWrite(regkey, regvalue, regtype);
   }
   catch (fWR)
   {
      success = false;
      //alert(fWR.message);
   }
   finally
   {
      WshShell = null;
   }
   
   return success;
}

// fnReadReg(regkey) returns the value of the setting or null if not read or it does not exist
// You can use this for testing if 
function fnReadReg(regkey)
{
   var regvalue = null;
   try
   {
      var WshShell = new ActiveXObject("WScript.Shell");
      regvalue = WshShell.RegRead(regkey);
   }
   catch (fRR)
   {
      regvalue = null;
      //alert(fRR.message);
      //null value returned in regvalue variable indicates that reg value was not read
   }
   finally
   {
      //destroy object
      WshShell = null;
   }

   return regvalue;
}

function fnDeleteReg(regkey)
{
   var success = true;
   try
   {
      var WshShell = new ActiveXObject("WScript.Shell");
      //var WshShell = WScript.CreateObject ("WScript.Shell");
      regvalue = WshShell.RegDelete(regkey);
   }
   catch (fDR)
   {
      success = false;
      //WScript.Echo(fDR.message);
   }
   finally
   {
      WshShell = null;
   }
   
   return success;
}

function fnRegExists(regkey)
{
   var retval = false;
   try
   {
      var WshShell = new ActiveXObject("WScript.Shell");
      WshShell.RegRead(regkey);
      retval = true;
   }
   catch (fRR)
   {
      retval = false;
      //alert(fRR.message);
      //null value returned in regvalue variable indicates that reg value was not read
   }
   finally
   {
      //destroy object
      WshShell = null;
   }

   return retval;
}

function ReadFromRegistry(sRegEntry)
{
    var regpath = sRegEntry;
    var oWSS = new ActiveXObject("WScript.Shell");
    return oWSS.RegRead(regpath);
}

function WriteInRegistryDW(sRegEntry, sRegValue)
{
  var regpath = sRegEntry;
  var oWSS = new ActiveXObject("WScript.Shell");
  oWSS.RegWrite(regpath, sRegValue, "REG_DWORD");
}

function WriteInRegistrySZ(sRegEntry, sRegValue)
{
  var regpath = sRegEntry;
  var oWSS = new ActiveXObject("WScript.Shell");
  oWSS.RegWrite(regpath, sRegValue, "REG_SZ");
}	

///////////////////////////////////////////////////////////////////////////////
// Function Name : RunApp
// Purpose : Check Permission before an app to run
// Parameters : AppName (Application Name)
//              ButtonNum (Button Id in this App)           
//              Computername (Domain name or Local computer name)
//              CurrentUser (Current User Name)
//              sCmd (Script/exe name to excute)
// 
///////////////////////////////////////////////////////////////////////////////
 
function RunApps( AppName, ButtonNum, Computername, CurrentUser, sCmd )
{
	var btnKey="\\button"+ButtonNum;
    var GlobalCurrentCautionPath = "HKCU\\SOFTWARE\\CDP\\SnapBack\\Apps\\CurrentCaution";  
    var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\"; 
    var AppCurrentCautionPath = AppRoot + AppName + btnKey+ "\\CurrentCaution";
    var AppCurrentEnableButtonPath = AppRoot + AppName + btnKey+ "\\CurrentEnableButton";
    var AppCurrentAllowUserPath = AppRoot + AppName + btnKey+ "\\CurrentAllowUser";    
    var sFullpath = "";
	var stats = IsAdmin(Computername, CurrentUser)
	var buttonName="btn"+ButtonNum;
	var shell = new ActiveXObject ( "WScript.Shell" );
	var isServiceRequest=false;
	var btnServiceVar="btn"+ButtonNum+"_ServiceName";
	var btnService=eval(btnServiceVar);
	if (btnService==buttonName)
	{
		//alert("It is a Service Request");
		isServiceRequest=true;
	}
	 
	// setup command for service to run or development command to be run
	//if (development)
	//{
	    if (sCmd.indexOf("file:") < 0) sFullpath = fnGetDocPath();
		sFullpath += sCmd;
		sCmd = sFullpath;

		var sPathFoldername = shell.ExpandEnvironmentStrings( unescape( sCmd ) );
		sPathFoldername = ('"' + sPathFoldername + '"');	
   	//}
	
	if (ReadFromRegistry(AppCurrentEnableButtonPath))
	{
		if (IsAdmin(Computername, CurrentUser))
		{ 
		     if (ReadFromRegistry(GlobalCurrentCautionPath))
			 { 
				// Run IT
				if(development)
				{
					writeArguementsXML(ButtonNum);
					shell.run("explorer.exe " + sPathFoldername, 1, false);
					shell = null;
				}
				else
				{
					if(isServiceRequest)
					{
						writeArguementsXML(ButtonNum);
						runService(ManifestURL_Local,"",buttonName);
					}
					else
					{
						writeArguementsXML(ButtonNum);
						shell.run("explorer.exe " + sPathFoldername, 1, false);
						shell = null;
					}

				}
			 }
			 else 
			 {
				 // Check button Caution
				 if (ReadFromRegistry(AppCurrentCautionPath))
				 {
					 //Run It
					if(development)
					{
						writeArguementsXML(ButtonNum);
						shell.run("explorer.exe " + sPathFoldername, 1, false);
						shell = null;
					}
					else
					{
						if(isServiceRequest)
						{	writeArguementsXML(ButtonNum);
							runService(ManifestURL_Local,"",buttonName);
						}
						else
						{
							writeArguementsXML(ButtonNum);
							shell.run("explorer.exe " + sPathFoldername, 1, false);
							shell = null;
						}
					}
				 }
				 else {
					 alert (MSG_WARNING);
					 return;
				 }
			}
		}
		else 
		{
			// Not an admin
			if (ReadFromRegistry(AppCurrentAllowUserPath))
			{
				if (ReadFromRegistry(GlobalCurrentCautionPath))
				{ 
				// Run IT
				    if(development)
					{
						writeArguementsXML(ButtonNum);
						shell.run("explorer.exe " + sPathFoldername, 1, false);
						shell = null;
					}
					else
					{
					// Service Call
						if(isServiceRequest)
						{
							writeArguementsXML(ButtonNum);
							runService(ManifestURL_Local,"",buttonName);
						}
						else
						{
							writeArguementsXML(ButtonNum);
							shell.run("explorer.exe " + sPathFoldername, 1, false);
							shell = null;
						}
					}
				}
				else 
				{
					// Check button Caution
					if (ReadFromRegistry(AppCurrentCautionPath))
					{
					    //Run It
						if(development)
						{
							writeArguementsXML(ButtonNum);
						    shell.run("explorer.exe " + sPathFoldername, 1, false);
						    shell = null;
						}
						else
						{
							// Service Call
							if(isServiceRequest)
							{
								writeArguementsXML(ButtonNum);
								runService(ManifestURL_Local,"",buttonName);
							}
							else
							{
								writeArguementsXML(ButtonNum);
								shell.run("explorer.exe " + sPathFoldername, 1, false);
								shell = null;
							}
						}
					}
					else {
					    alert (MSG_WARNING);
					    return;
					}
				}
			}
			else
			{
				alert (MSG_USERDISABLED);
				return;
			}
					 
		} // end else not admin
	} // end enable switch		
	else {
		alert(MSG_RUNDISABLED);
		return;
	}
}
/*-----------------------------------------------------*/
/*------------------- Misc Functions ------------------*/
/*-----------------------------------------------------*/

function runapp( sCmd )
{
	var sFullpath = "";
   // if fullpath is not included in sCmd parameter then assume app directory
	if (sCmd.indexOf("file:") < 0) sFullpath = fnGetDocPath();
	sFullpath += sCmd;
	sCmd = sFullpath;
	var shell = new ActiveXObject ( "WScript.Shell" );
	var sPathFoldername = shell.ExpandEnvironmentStrings( unescape( sCmd ) );
	sPathFoldername = ('"' + sPathFoldername + '"');
	shell.run("explorer.exe " + sPathFoldername, 1, false);
	shell = null;
}

function execapp( sFile, sArgs, sDirectory, sOperation, nShow )
{
   // File to execute (Required)
   if (sFile == undefined)
   {
      sFile="explorer.exe";
   }
   // Optional arguments for file to execute
   if (sArgs == undefined)
   {
      sArgs = "";
   }
   // Working Directory
   if (sDirectory == undefined)
   {
      sDirectory="";
   }
   // Operation/verb: runas/open/edit/print
   if (sOperation == undefined)
   {
      sOperation="open";
   }
   // Show values: 
   // 0=Open the application with a hidden window.
   // 1=Open the application with a normal window. If the window is minimized or maximized, the system restores it to its original size and position.
   // 2=Open the application with a minimized window.
   // 3=Open the application with a maximized window.
   // 4=Open the application with its window at its most recent size and position. The active window remains active.
   // 5=Open the application with its window at its current size and position.
   // 7=Open the application with a minimized window. The active window remains active.
   // 10=Open the application with its window in the default state specified by the application
   if (nShow == undefined)
   {
      nShow=1;
   }
   var shell = new ActiveXObject ( "WScript.Shell" );
   // if path is not included in sDirectory parameter then assume app directory
	if ( sDirectory.indexOf(":\\") < 0 || sDirectory.indexOf("file:") < 0 )
   { 
      sDirectory = fnGetDocPath();
      sDirectory = shell.ExpandEnvironmentStrings( unescape( sDirectory ) );
      sDirectory = fnToLocalPath(escape(sDirectory));
      sDirectory = unescape(sDirectory);
	}
	else
	{
      if ( sDirectory.indexOf("file:") >= 0 )
      {
         sDirectory = shell.ExpandEnvironmentStrings( unescape( sDirectory ) );
         sDirectory = fnToLocalPath(escape(sDirectory));
         sDirectory = unescape(sDirectory);
      }
	}
	// $appdir\\ before the file name substitutes the app directory before the file name.
   if (sArgs.indexOf("$appdir\\") >= 0)
   {
      var sAppdir = fnGetDocPath();
      sAppdir = shell.ExpandEnvironmentStrings( unescape( sAppdir ) );
      sAppdir = fnToLocalPath(escape(sAppdir));
      sAppdir = unescape(sAppdir);
      sArgs = sArgs.substr(sArgs.lastIndexOf("\\")+1);
      sArgs = sAppdir + sArgs;
   }
	// $appdir/ before the file name substitutes the app directory before the file name.
   if (sArgs.indexOf("$appdir/") >= 0)
   {
      var sAppdir = fnGetDocPath();
      sAppdir = shell.ExpandEnvironmentStrings( unescape( sAppdir ) );
      sAppdir = fnToLocalPath(escape(sAppdir));
      sAppdir = unescape(sAppdir);
      sArgs = sArgs.substr(sArgs.lastIndexOf("/")+1);
      sArgs = sAppdir + sArgs;
   }
   sArgs = ('"' + sArgs + '"');
   sDirectory = ('"' + sDirectory + '"');
	//alert("sArgs = " + sArgs);
   
   sFile = ('"' + shell.ExpandEnvironmentStrings( unescape( sFile ) ) + '"');
	var shellapp = new ActiveXObject("Shell.Application");
	//alert(sFile + ", " + sArgs + ", " + sDirectory + ", " + sOperation + ", " + nShow);
	// See: https://msdn.microsoft.com/en-us/library/windows/desktop/gg537745%28v=vs.85%29.aspx for syntax
	shellapp.ShellExecute(sFile, sArgs, sDirectory, sOperation, nShow);
	shell = null;
}

// Function to Open Share App Prompt
function copyToClipboard(text) {
	window.prompt("To Share this App, Copy the Following URL to Clipboard: hit Ctrl+C and then press Enter", text);
}

function fnGetDocPath()
{
	// Return document location without file name
	var docpath = document.location.href.toString();
	docpath = docpath.substr(0, docpath.lastIndexOf('/') + 1);
	return docpath;
}

function loadScript( url, callback )
{
    var script = document.createElement( "script" );
    script.type = "text/javascript";

    if ( script.readyState )
    {
        // IE
        script.onreadystatechange = function()
        {
            if ( script.readyState == "loaded" ||
            script.readyState == "complete" )
            {
                script.onreadystatechange = null;
                callback();
            }
        }
        ;
    }
    else
    {
        // Others
        script.onload = function()
        {
            callback();
        }
        ;
    }

    script.src = url;
    document.getElementsByTagName( "head" )[0].appendChild( script );
}

// Search for string in an array returns array
// Example:
// if( !aArrayToSearch.find( unescape( sSearchString ) )
//    aArrayToSearch.push( unescape( sSearchString ) );
Array.prototype.find = function(searchStr) 
{  
    var returnArray = false;  
    for (i=0; i<this.length; i++) 
    {    
        if (typeof(searchStr) == 'function') 
        {      
            if (searchStr.test(this[i])) 
            {        
                if (!returnArray) { returnArray = [] }        
                returnArray.push(i);      
            }    
        } else {      
            if (this[i]===searchStr) 
            {        
                if (!returnArray) { returnArray = [] }        
                returnArray.push(i);      
            }    
        }  
    }  
    return returnArray;
}

// Get an app's published date to include in the template
function GetpubDate()
{
	if (typeof (pubDate) === 'undefined') {
        return 'App is not yet published';
    } else {
          return pubDate;;
    }
}

/*-----------------------------------------------------*/
/*------------------ Menu Functions -------------------*/
/*-----------------------------------------------------*/

// this function will do scanning for menu's calling the genpng.js script
// this used to call the service handle as button - this will remove that constraint
function fnScanjs(sVal)
{
	var objShell = new ActiveXObject ( "WScript.Shell" );
	var scanjsPath = objShell.ExpandEnvironmentStrings("%ALLUSERSPROFILE%\\CDP\\SnapBack\\Apps\\OOM\\");
	var scanjsFile = objShell.ExpandEnvironmentStrings("%SYSTEMROOT%\\system32\\cscript.exe ");
	var scanjsArgs = scanjsPath+"genpngs.js "+"\" "+ sVal+"\"";
	//var scanjsArgs = "\""+scanjsPath+"genpngs.js "+sVal+"\"";
	//var scanjsArgs = scanjsPath+"genpngs.js "+sVal;
	var cmdln = scanjsFile+scanjsArgs;
	objShell.Run(cmdln,7,true);
	//var objApp = new ActiveXObject("Shell.Application");
	//objApp.ShellExecute(scanjsFile, scanjsArgs, "", "open", 0);
	
	// release Objects
	//objApp = null;
	objShell = null;
	
}

/*-----------------------------------------------------*/
/*------------ Button Argument Functions --------------*/
/*-----------------------------------------------------*/

// Function to Write Arguments in a XML File for Each Button
function writeArguementsXML(ButtonNum){
	try {
		var btnarguments="btn"+ButtonNum+"_arguments";
		var btnargumentsNum=eval(btnarguments); 		
		if (btnargumentsNum > 0) {
			var curDateTime = new Date();
			var modTime = curDateTime.toUTCString();
			
			//Create new file to write to
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var FILENAME="..\\"+ appname +"\\btn"+ ButtonNum +"arguments.xml";
			var file = fso.CreateTextFile(FILENAME, true);
			
			file.WriteLine('<?xml version="1.0" encoding="utf-8"?>\n');
			file.WriteLine('<btn'+ ButtonNum + 'arguments>');
			
			//For each argument selected, create its own section
			$("#btn"+ ButtonNum + "_arguments input:checked").each(function (index, value) {
				file.WriteLine('     <argument>');
				file.WriteLine('          <' + $(this).attr("name") + '>'+ $(this).val() +'</' + $(this).attr("name") + '>');
				file.WriteLine('          <modtime>' + modTime + '</modtime>');
				file.WriteLine('     </argument>');
			});
			
			file.WriteLine('</btn'+ ButtonNum + 'arguments>');
			file.Close();
		}
	}
	catch (e){
		return;
	}
}
