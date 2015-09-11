// JavaScript Document
// runapp.js - runs any app passed in
//             
var objArgs = WScript.Arguments;

if ( objArgs.length == 1 ) {
    ef = objArgs.item( 0 );
    //WScript.Echo( ef );
    shell  = new ActiveXObject ( "WScript.Shell" );
    var extnsn = ef.substring( ef.lastIndexOf(".") ).toLowerCase();
    var myAllUsersProfile = shell.ExpandEnvironmentStrings( "%ALLUSERSPROFILE%" );
    var mySystemRoot = shell.ExpandEnvironmentStrings( "%SystemRoot%" );
    var sOs = fnGetOs();
    //WScript.Echo(sOs);
    //WScript.Echo(extnsn);
    try 
    {
        //WScript.Echo( extnsn );
        switch( extnsn )
        {
        case ".vbs":
            //WScript.Echo( extnsn );
            var eff = "";
            if ( sOs.indexOf("Vista") > -1 )
            {
                //WScript.Echo("Execute with explorer.exe");
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
            } else {
                //WScript.Echo("Execute with launch.exe");
                eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
            }
            
            eff += " " + ef;
            shell.Run(eff,1,false);
            //WScript.Echo("Executed vbs");
            break;
        case ".lnk":
            //WScript.Echo( extnsn );
            var ef1 = unescape(ef);
            ef1 = ef1.substr(ef1.indexOf("file:///")+8);
            while (ef1.indexOf("/") > -1)
            {
               ef1 = ef1.replace("/","\\");
            }

            //WScript.Echo( ef1 );
            if ( !fnFileExits(ef1) )
            {
               var msg = "Shortcut " + ef1 + " can NOT be found!";
               WScript.Echo(msg);
               break;
            }
            var eff = "";
            if ( sOs.indexOf("Vista") > -1 )
            {
                //WScript.Echo("Execute with explorer.exe");
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
                eff += " " + ef;
            } else {
                //WScript.Echo("Execute with launch.exe");
                eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
                eff += " \"" + ef + "\"";
            }
            //WScript.Echo(eff);
            shell.Run(eff,1,false);
            //WScript.Echo("Executed lnk");
            break;
        case ".url":
            //WScript.Echo( extnsn );
            var eff = "";
            if ( sOs.indexOf("Vista") > -1 )
            {
                //WScript.Echo("Execute with explorer.exe");
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
            } else {
                //WScript.Echo("Execute with launch.exe");
                eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
            }
            
            eff += " " + ef;
            shell.Run(eff,1,false);
            //WScript.Echo("Executed lnk");
            break;
        case ".exe":
            //WScript.Echo( extnsn );
            var eff = "";
            if ( sOs.indexOf("Vista") > -1 )
            {
                //WScript.Echo("Execute with explorer.exe");
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
                eff += " " + ef;
            } else {
                //WScript.Echo("Execute with launch.exe");
                //eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
                eff = ef;
            }
            
            
            shell.Run(eff,1,false);
            //WScript.Echo("Executed lnk");
            break;
        case ".wpl":
            //WScript.Echo( extnsn );
            //WScript.Echo("Execute with explorer.exe");
            var eff="";
            eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
            eff += " " + ef;
            shell.Run(eff,1,false);
            //WScript.Echo("Executed wpl");
            break;
        case ".wma":
            //WScript.Echo( extnsn );
            //WScript.Echo("Execute with explorer.exe");
            var eff="";
            eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
            eff += " " + ef;
            shell.Run(eff,1,false);
            //WScript.Echo("Executed wma");
            break;
        case ".avi":
            //WScript.Echo( extnsn );
            var eff = "";
            if ( sOs.indexOf("Vista") > -1 )
            {
                //WScript.Echo("Execute with explorer.exe");
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
            } else {
                //WScript.Echo("Execute with launch.exe");
                eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
            }
            
            eff += " " + ef;
            shell.Run(eff,1,false);
            //WScript.Echo("Executed lnk");
            break;
        case ".html":
            //WScript.Echo( extnsn );
            //shell.ShellExecute(ef, "", "", "open", "1");
            var eff = "";
            //var eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
            //eff += " " + ef;
            
            if ( sOs.indexOf("Vista") > -1 )
            {
                //WScript.Echo("Execute with explorer.exe");
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
            } else {
                //WScript.Echo("Execute with launch.exe");
                eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
            }
            
            eff += " " + ef;
            shell.Run(eff,1,false);
            //WScript.Echo("Executed html");
            break;
        case ".htm":
            //WScript.Echo( extnsn );
            //shell.ShellExecute(ef, "", "", "open", "1");
            var eff = "";
            //var eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
            //eff += " " + ef;
            
            if ( sOs.indexOf("Vista") > -1 )
            {
                //WScript.Echo("Execute with explorer.exe");
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
            } else {
                //WScript.Echo("Execute with launch.exe");
                eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
            }
            
            eff += " " + ef;
            shell.Run(eff,1,false);
            //WScript.Echo("Executed htm");
            break;
        default:
            //WScript.Echo( extnsn + " (default)" );
            var eff = "";
            if ( sOs.indexOf("Vista") > -1 )
            {
                //WScript.Echo("Execute with explorer.exe");
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
            } else {
                //WScript.Echo("Execute with launch.exe");
                eff = fnToLocalURL( escape( myAllUsersProfile + '\\cdp\\oom\\menu\\launch.exe') );
            }
            
            eff += " " + ef;
            shell.Run(eff,1,false);
            //WScript.Echo("Executed lnk");
            break;

/*            //WScript.Echo( "default:" ); 
            if ( ef.indexOf('/') < 0 )
            {
                //WScript.Echo("Default: Execute with shell.Run");
                shell.Run(ef,1,false);
            } else {
                //WScript.Echo("Default: Execute with Explorer.exe");
                var eff="";
                eff = fnToLocalURL( escape( mySystemRoot + '\\explorer.exe') );
                eff += " " + ef;
                shell.Run(eff,1,false);
            }          
*/            //WScript.Echo("Executed Default");
            break;
        }
    } catch (e1) {
        try
        {   
            //WScript.Echo("Catch: Execute with explorer.exe");
            shell.ShellExecute(ef, "", "", "open", "1");
            
            //shell.Run(ef,1,false);
            //WScript.Echo("Catch 1");
        } catch (e2) {
            //WScript.Echo(e2.name + ': Cannot execute - ' + eff + "\n" + e1.name + 'Cannot execute - ' + ef);
        }
    }
}

function fnToLocalURL( strEscaped )
{
    var sReturn = "";
    if ( strEscaped.indexOf( 'file' ) == 0 )
    {
        sReturn += strEscaped;
    } else {
        sReturn = 'file:///';
        sReturn += strEscaped;
    }

    //for (i=0; i<sReturn.length; i++)
    //{
        sReturn = sReturn.replace(/%3A/g, ':');
        sReturn = sReturn.replace(/%5C/g, '/');
        sReturn = sReturn.replace(/%22/g, '');
        sReturn = sReturn.replace(/%5B/g, '[');
        sReturn = sReturn.replace(/%5D/g, ']');
    //}
    var nPos1 = sReturn.lastIndexOf( "//" );
    if ( nPos1 > 18 )
    {
        var sReturn1 = ( sReturn.substr( 0, nPos1 ) + sReturn.substring( nPos1 + 1 ) );
        sReturn = sReturn1;
        //WScript.Echo(sReturn);
    }

    return sReturn;
}

function fnGetOs()
{
    var nameOfOs = "Windows XP";
    //HKLM "SOFTWARE\Microsoft\Windows NT\CurrentVersion" CurrentVersion
    var success = fnGetRegValue( "Software\\Microsoft\\Windows NT\\CurrentVersion\\CurrentVersion" );
    //WScript.Echo(osVersion);
    if (success && osVersion.length>0)
    {
	if (osVersion == "5.0") nameOfOs = "Windows 2000";
	if (osVersion == "5.1") nameOfOs = "Windows XP";
	if (osVersion == "5.2") nameOfOs = "Windows XP";
	if (osVersion == "6.0") nameOfOs = "Windows Vista";
	if (eval(osVersion) >= 6) nameOfOs = "Windows Vista";
    }

    return nameOfOs;
}

function fnGetRegValue( pExtension )
{
    var retVal = true;

    var sh = new ActiveXObject( "Wscript.shell" )
    var strRoot = "HKEY_LOCAL_MACHINE\\";
    var strSlash = "\\";
    var strKey1 = strRoot + pExtension;
    try
    {
        var strValue1 = sh.RegRead ( strKey1 );
        if ( strValue1 != null )
        {
            //WScript.Echo( "Reg value = " + strValue1 );
            osVersion = strValue1;
            retVal = true;
        }
        else
        {
            retVal = false;
        }
    }
    catch ( e1 )
    {
        retVal = false;
    }
    return retVal;
}

function fnFileExits(filespec)
{
   var retval = true;
   var fso = new ActiveXObject( "Scripting.FileSystemObject" );
   if (fso.FileExists(filespec))
   {
      retval = true;
   }
   else
   { 
      retval = false;
   }
   fso = null;
   return retval;
}

