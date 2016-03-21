/*
* onlinecheck.js
*
*/

var valueCount = 0;
var valuePassed = 0;
var valueLinkid = "";
var isNotConnected;
var WebCheckUrl = "http://snapback-apps.com/oom/invis.gif";
var currentTime = new Date();
var timeValue = currentTime.getTime();
var t = "<img id='imgInvis' src=\'" + WebCheckUrl + "?" + timeValue + "' onload='setPluggedInOn()' onerror='setPluggedInOff()' style='visibility:hidden' />";
//document.body.insertAdjacentHTML( "beforebegin", unescape( t ) );

var download = new Image();
// download.onload = function () {
//        setPluggedInOn();
//    }
//    
//download.onerror = function(){
//   setPluggedInOff();
//}

//var cacheBuster = "?nnn=" + timeValue;
//download.src = WebCheckUrl + cacheBuster;
//Internet detection above has been disabled upon request of aw
//The following is a line of code that assumes that you are connected to the internet
setPluggedInOn();

function dothisonload()
{
   var strOut = "";
   valueCount = new Number(0);

   valueCount = getQueryVariable("pass");
   if ( valueCount == null )
   {
      valueCount = 0;
   }
   else
   {
      valueCount = valueCount.valueOf();
   }
   valueCount ++ ;
   // strOut += "\npass = " + valueCount.valueOf();
   // strOut += "\nisNotConneced = " + isNotConnected;
   // alert(strOut);
   strOut = "";
   
   valueLinkid = getQueryVariable("linkid");
   //Test for link id of a remote/internet link, 
   //if null download OOMinstaller if connected, otherwise do the same with link
   if ( valueLinkid == null )
   {
      //Istaller only code
      if ( isNotConnected == 0 && valueCount > 1 && valueLinkid == null )
      {
         document.location.href = "http://snapback-apps.com/oominstaller/snapback-apps-setup.exe";
      }
      else if ( isNotConnected == 1 && valueCount > 1 )
      {
         alert("You need to be connected to the internet!");
      }
   }
   else
   {
      try
      {
         var x = document.getElementById( valueLinkid );
         var remoteurl = x.href;
         if (x)
         {
            if ( isNotConnected == 0 && valueCount > 1 && valueLinkid != null )
            {
               //document.location.href = "http://snapback-apps.com/oominstaller/snapback-apps-setup.exe";
               openremote( remoteurl );
            }
            else if ( isNotConnected == 1 && valueCount > 1 )
            {
               alert("You need to be connected to the internet!");
            }
         }
      }
      catch (e)
      {
         alert("An external link was clicked, but it is formatted incorrectly\n or is missing the ID attribute.");      
      }
   }
   
   var menuobj = document.getElementById( "treemenu01" );
   if (menuobj)
   {
      try
      {
         menuobj.focus();
      }
      catch (e)
      {
         //      
      }
   }
}

function addLoadEvent(func)
{
   var oldonload = window.onload;
   if (typeof window.onload != 'function')
   {
      window.onload = func;
   }
   else
   {
      window.onload = function()
      {
         if (oldonload)
         {
            oldonload();
         }
         func();
      }
   }
}

addLoadEvent( dothisonload );
addLoadEvent( fixremotelinks );

addLoadEvent(function()
{
   /* more code to run on page load */
}
);

function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i = 0; i < vars.length; i ++ )
   {
      var pair = vars[i].split("=");
      if (pair[0] == variable)
      {
         return pair[1];
      }
   }
}

function remoteClick( linkID, linkRef )
{
   //alert( "remoteClick(" + linkID + ", " + linkRef + ")" );
   var thisURI = decodeURI(document.location);
   thisURI = thisURI.substr(0, thisURI.indexOf("?"));
   openremote(linkRef);
   //mks, 12/30/2015, changed the line: document.location = thisURI + "?pass=" + valueCount + "&linkid=" + linkID; to openremote(linkRef);, because remote link was loading on every refresh of the local main.html.
}


function setPluggedInOn()
{
   isNotConnected = 0;
}

function setPluggedInOff()
{
   isNotConnected = 1;
}

function fixremotelinks()
{
   // alert(navigator.appName);

   var lIsLocal = document.location.toString().indexOf("http") < 0;
   var lIsIE = navigator.appName.indexOf("Microsoft") > - 1;
   // alert( "lIsLocal=" + lIsLocal );
   if ( lIsLocal )
   {
      var x = new Array;
      x = document.getElementsByTagName("a");
      var i;
      for ( i = 0; i < x.length; i ++ )
      {
         x[i].innerHTML = x[i].innerHTML;
         if ( x[i].href.indexOf("http:") > - 1 || x[i].href.indexOf("https:") > - 1 )
         {
            var uriToOpen = x[i].href;
            // alert("\"" + uriToOpen + "\" is changing to \"" + "openURL(\"" + uriToOpen + "\"" + ")");
            if ( x[i].id == null )
            {
               x[i].id = "remotelink" + i;
            }
            //x[i].title += " (Internet Link)";
            if (x[i].title.length==0)
				{
					x[i].title = uriToOpen;
				}
				else
				{
					x[i].title += " " + uriToOpen;
				}
            //x[i].innerHTML = x[i].innerHTML + "<em> (Internet)</em>";
            x[i].style.textDecoration = "underline";
            x[i].style.cursor = "pointer";
            x[i].removeAttribute("href");
            x[i].removeAttribute("target");
            //x[i].onclick = Function( "openremote( '" + uriToOpen + "' )" );
            if (uriToOpen.indexOf(".exe")>-1)
            {
               if (isNotConnected)
               {
                  x[i].onclick = Function( "remoteClick('" + x[i].id + "','" + uriToOpen + "')" );
               }
               else
               {
                  x[i].removeAttribute("onclick");
                  x[i].href = uriToOpen;
               }
            }
            else
            {
               x[i].onclick = Function( "remoteClick('" + x[i].id + "','" + uriToOpen + "')" );
               //alert(x[i].onclick.toString());
            }
         }
         else
         {
            //Test for naveoutline junction nodes
            if (x[i].href.toString().indexOf("#") >= 0 && x[i].id.indexOf("smenu") >= 0)
            {
               x[i].style.textDecoration = "none";
               x[i].removeAttribute("href");
               x[i].removeAttribute("target");
            }
         }
      }
   }
   else
   {
      var x = new Array;
      x = document.getElementsByTagName("a");
      var i;
      for ( i = 0; i < x.length; i ++ )
      {
         x[i].innerHTML = x[i].innerHTML;
         //Test for naveoutline junction nodes
         if (x[i].href.toString().indexOf("#") >= 0 && x[i].id.indexOf("smenu") >= 0)
         {
            x[i].style.textDecoration = "none";
            x[i].removeAttribute("href");
            x[i].removeAttribute("target");
         }
      }
   }
}

function fnFileExists( psFilename )
{
    var lSuccess;

    var objUpd = new ActiveXObject ( "CDPUpdater.Updater" );
    var sPathFilename = objUpd.ExpandEnvVar( psFilename );

    var fso = new ActiveXObject( "Scripting.FileSystemObject" );
    if ( ! fso.FileExists( sPathFilename ) )
    {
        lSuccess = false;
    }
    else
    {
        lSuccess = true;
    }

    fso = null;
    objUpd = null;

    return lSuccess;
}

// Checks to see if Persistent Storage Manager Product is installed
//
function isPSMInstalled()
{
   var nSuccess = 0;
   var objUpd = new ActiveXObject( "CDPUpdater.Updater" );
   try
   {
      var filepath = "%ProgramFiles%\\CDP\\PSM\\ss.exe";
      if ( fnFileExists( filepath ) )
      {
         nSuccess = 1;
      }
      if (!nSuccess)
      {
         filepath = "%ProgramFiles(x86)%\\CDP\\PSM\\ss.exe";
         if ( fnFileExists( filepath ) )
         {
            nSuccess = 1;
         }
      }
      if (!nSuccess)
      {
         filepath = "%ProgramWW6432%\\CDP\\PSM\\ss.exe";
         if ( fnFileExists( filepath ) )
         {
            nSuccess = 1;
         }
      }
   }
   catch(e)
   {
      //alert( "Cant open ActiveX FSO:" + e.description + " File: " + filepath );
      nSuccess = 0;
   }
   return nSuccess;
}

function openremote( uri )
{
   var myCmd = "openremote," + uri;
   var url = location.href;
	var shell = new ActiveXObject("WScript.Shell");
	shell.run("explorer.exe " + myCmd);
	shell = null;
}
