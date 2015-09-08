// JavaScript Document openremotepg.js
var uri;

if (WScript.Arguments.length < 1)
{
   uri = "No argument supplied!"
   WScript.Echo(uri);
}
else
{
   uri = "";
   for (i = 0; i < WScript.Arguments.length; i ++ )
   {
      uri = uri + WScript.Arguments.Item(i) + " ";
   }
   uri = '"' + uri.substr( 0, uri.lastIndexOf(" ") ) + '"';
   openURL(uri);
}

function openURL(url)
{
   //WScript.Echo(url);
   var wsh = new ActiveXObject("WScript.Shell");
   wsh.Run(url);
   wsh = null;
}

