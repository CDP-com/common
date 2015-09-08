// webpagelogic.js
// The code below, between the /*...*/, is the code and instructions for use of the Webpage class with a web page.
// Please be sure to read the notes in the cdp-uri.js file pertaining to the fnGetAttributes(pObj) and 
// fnMakeCdpButtons(pObj) functions included in this file.

/*
<!--START: Required Web Page Logic before close of body tag-->
<div id="webpagelogic">
    <script type="text/javascript">
         <!--
         //Globals used by ../common/js/weblpagelogic.js
         var PackageName = "[packagename here in quotes]";
         var DemoPageName = "demo.html";
         var LivePageName = "main.html";
         var WPLogic;
         //Next initialization is the function name in helloworldlib.js that runs when the "?run=1" parameter is included in the url
         var RunableFunction = "runApp()";
         loadScript("webpagelogic.js", function()
         {
            //initialization code
            WPLogic = new Webpage(PackageName, DemoPageName, LivePageName);    //Function in ../common/js/webpagelogic.js
            snAppPage(WPLogic);
         });
        // -->
    </script>
</div>
<!--END: Required Web Page Logic before close of body tag-->
*/

// Webpage class attributes/properties
var Webpage = function (packageName, demoPage, livePageName, buttonCount) {
   this.packageName = packageName;  //this package
   this.demoPage = demoPage;
   this.livePageName = livePageName;
   this.browserName = "";
   this.browserVersion = 0;
   this.isLocal = false;
   this.isDemo = false;
   this.isProtocol = false;
   this.buttonCount = buttonCount;
   this.buttonDivIds = "";       //Button arrays
   this.buttonNames = "";
   this.buttonElements = "";
   this.buttonPackages = "";
   this.buttonTexts = "";
   this.buttonTitles = "";
   this.buttonSizes = "";
   this.buttonImages = "";
};

// Webpage methods
Webpage.prototype.showProperties = function(objectname) {
   if (objectname == undefined)
   {
      objectname = "(unspecified)";
   }

   var s = "Object " + objectname + " has Webpage Class Properties:" + "\n";
   if (objectname != "(unspecified)")
   {   
      s += "packagename = " + this.packageName + "\n";
      s += "demoPage = " + this.demoPage + "\n";
      s += "livePageName = " + this.livePageName + "\n";
      s += "browserName = " + this.browserName + "\n";
      s += "browserVersion = " + this.browserVersion + "\n";
      s += "isLocal = " + this.isLocal + "\n";
      s += "isDemo = " + this.isDemo + "\n";
      s += "isProtocol = " + this.isProtocol + "\n";
      s += "buttonCount = " + this.buttonCount + "\n";
      s += "buttonDivIds = " + this.buttonDivIds + "\n";
      s += "buttonNames = " + this.buttonNames + "\n";
      s += "buttonElements = " + this.buttonElements + "\n";
      s += "buttonPackages = " + this.buttonPackages + "\n";
      s += "buttonTexts = " + this.buttonTexts + "\n";
      s += "buttonTitles = " + this.buttonTitles + "\n";
      s += "buttonSizes = " + this.buttonSizes + "\n";
      s += "buttonImages = " + this.buttonImages + "\n";
   }
   //alert(s);
};

Webpage.prototype.goDemo = function() {
   document.location = this.demoPage;
};

Webpage.prototype.getBrowser = function(lname_version) {
   var aRetVal = [];
   var browsername = navigator.appName;
   var browserUserAgent = navigator.userAgent;
   var browserVendor = window.navigator.vendor;


   if (navigator.userAgent.indexOf('MSIE') != -1)
      var detectIEregexp = /MSIE (\d+\.\d+);/ //test for MSIE x.x
   else // if no "MSIE" string in userAgent
      var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists

   if (detectIEregexp.test(navigator.userAgent))
   {
      browsername = "Microsoft Internet Explorer";
      //if some form of IE
      var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
      if (ieversion>=12)
      {
         //document.write("You're using IE12 or above");
         aRetVal[1] = ieversion;
      }
      else if (ieversion>=11)
      {
         //document.write("You're using IE11 or above");
         aRetVal[1] = ieversion;
      }
      else if (ieversion>=10)
      {
         //document.write("You're using IE10 or above");
         aRetVal[1] = ieversion;
      }
      else if (ieversion>=9)
      {
         //document.write("You're using IE9 or above");
         aRetVal[1] = ieversion;
      }
      else if (ieversion>=8)
      {
         //document.write("You're using IE8 or above");
         aRetVal[1] = ieversion;
      }
      else if (ieversion>=7)
      {
         //document.write("You're using IE7.x");
         aRetVal[1] = ieversion;
      }
      else if (ieversion>=6)
      {
         //document.write("You're using IE6.x");
         aRetVal[1] = ieversion;
      }
      else if (ieversion>=5)
      {
         //document.write("You're using IE5.x");
         aRetVal[1] = ieversion;
      }
   }

   if (browsername == "Microsoft Internet Explorer")
   {
      aRetVal[0] = browsername;
   }
   else
   {
      if ( browsername == "Netscape" )
      {
         // alert( "browserUserAgent = " + browserUserAgent );
         // alert( "browserVendor = " + browserVendor );
         if ( /Firefox[\/\s](\d+\.\d+)/.test( navigator.userAgent ) && browserVendor.length < 1 )
         {
            // test for Firefox / x.x or Firefox x.x ( ignoring remaining digits );
            var ffversion = new Number( RegExp.$1 ) // capture x.x portion and store as a number
            aRetVal[1] = ffversion;
            aRetVal[0] = "Firefox";
         }

         if ( /Chrome[\/\s](\d+\.\d+)/.test( navigator.userAgent ) && browserVendor.indexOf( "Google Inc." ) > - 1 )
         {
            // test for Chrome / x.x or Chrome x.x ( ignoring remaining digits );
            var ffversion = new Number( RegExp.$1 ) // capture x.x portion and store as a number
            aRetVal[1] = ffversion;
            aRetVal[0] = "Chrome";
         }

         if ( /Safari[\/\s](\d+\.\d+)/.test( navigator.userAgent ) && browserVendor.indexOf( "Apple Computer, Inc." ) > - 1 )
         {
            // test for Safari / x.x or Safari x.x ( ignoring remaining digits );
            var ffversion = new Number( RegExp.$1 ) // capture x.x portion and store as a number
            aRetVal[1] = ffversion;
            aRetVal[0] = "Safari";
         }

         if ( /Opera[\/\s](\d+\.\d+)/.test( navigator.userAgent ) )
         {
            // test for Opera / x.x or Opera x.x ( ignoring remaining digits );
            var ffversion = new Number( RegExp.$1 ) // capture x.x portion and store as a number
            aRetVal[1] = ffversion;
            aRetVal[0] = "Opera";
         }
      }
      else
      {
         if ( browsername == "Opera" )
         {
            aRetVal[1] = 0;
            aRetVal[0] = "Opera";
         }
      }
   }

   //   alert( "browsername = " + browsername );
   //   alert( "browserUserAgent = " + browserUserAgent );
   //   alert( "browserVendor = " + browserVendor );

   if (lname_version != null)
   {
      // Return array aRetVal[ name, version ]
      return aRetVal;
   }
   else
   {
      // Return name only
      return aRetVal[0];
   }
};

Webpage.prototype.getProtocol = function() {
   if (localStorage.cdpprotocol)
      return true;
   else
      return false;
};


Webpage.prototype.getButtonCount = function() {
   if (oButtonArray != undefined && oButtonArray != null)
   {
      return oButtonArray.length;
   }
   else
   {
      return 0;
   }
};


// Functions
function snAppPage(pObj)
{
   loadJsFiles();
   var aBrowserInfo = pObj.getBrowser(true);
   pObj.browserName = aBrowserInfo[0];
   pObj.browserVersion = aBrowserInfo[1];
   pObj.isLocal = fnPageIsLocal();
}

function fnPageIsLocal()
{
   if (this.document.location.toString().indexOf("http") > -1)
   {
      return false;
   }
   else
   {
      return true;
   }
}

function fnTrimString(pString) {
    return pString.replace(/^\s+|\s+$/gm,'');
}

// Set Webpage class, derived object properties from cdpbutton# divs on the web page.
function fnGetAttributes(pObj)
{
   //alert("In fnGetAttributes");
   pObj.buttonDivIds = "";
   pObj.buttonNames = "";
   pObj.buttonElements = "";
   pObj.buttonPackages = "";
   pObj.buttonTexts = "";
   pObj.buttonTitles = "";
   pObj.buttonSizes = "";
   pObj.buttonImages = "";
      
   if (!pObj.isLocal)
   {
      var aButtonOnPage = [];
      var aButtonDivHtml = [];
      var i;
      for ( i=0; i<pObj.buttonCount; i++ )
      {
         var nButtonDisplayIndex = i + 1;
         var sButtonDivId = "cdpbutton" + nButtonDisplayIndex;
         var sButtonElement = "ProtocolButton" + nButtonDisplayIndex;
         aButtonOnPage[i] = document.getElementById(sButtonDivId);
         if ( aButtonOnPage[i].innerHTML.length > 0 )
         {
            // Determine CDPButton.buttonDivIds
            pObj.buttonDivIds += sButtonDivId + "|";
            aButtonDivHtml[i] = aButtonOnPage[i].innerHTML;     
            //alert(aButtonDivHtml[i]);

            // Determine CDPButton.buttonNames
            if (aButtonDivHtml[i].toLowerCase().indexOf("<button") > -1)
            {
               pObj.buttonNames += "button|";
            }
            if (aButtonDivHtml[i].toLowerCase().indexOf("<a") > -1)
            {
               pObj.buttonNames += "link|";
            }
            if (aButtonDivHtml[i].toLowerCase().indexOf("<img") > -1)
            {
               pObj.buttonNames += "imgbutton|";
            }

            // Determine CDPButton.buttonPackages
            var packagestart = aButtonDivHtml[i].toLowerCase().indexOf(" package=");
            if (packagestart > -1)
            {
               var quotes1 = aButtonDivHtml[i].toLowerCase().indexOf("\"", packagestart) + 1;
               //alert("quotes1=" + quotes1);
               var quotes2 = aButtonDivHtml[i].toLowerCase().indexOf('"', quotes1);
               //alert("quotes2=" + quotes2);
               //alert(aButtonDivHtml[i].toLowerCase().substring(quotes1, quotes2));
               if (quotes2 > quotes1)
               {
                  var sPackage = aButtonDivHtml[i].toLowerCase().substring(quotes1, quotes2);
                  //alert("sPackage = " + sPackage);
                  pObj.buttonPackages += sPackage;
               }
            }
            else
            {
               pObj.buttonPackages += pObj.packageName;
            }
            pObj.buttonPackages += "|";
            
            // Determine CDPButton.buttonTexts
            var buttonstart = aButtonDivHtml[i].toLowerCase().indexOf("<button");
            var linkstart = aButtonDivHtml[i].toLowerCase().indexOf("<a");
            var textstart = "";
            if (buttonstart > -1) textstart = aButtonDivHtml[i].toLowerCase().indexOf(">", buttonstart) + 1;
            if (linkstart > -1) textstart = aButtonDivHtml[i].toLowerCase().indexOf(">", linkstart) + 1;
            if (textstart > -1)
            {
               var textend = 0;
               if (buttonstart > -1)
               {
                  textend = aButtonDivHtml[i].toLowerCase().indexOf("</button>", textstart + 1);
               }
               if (linkstart > -1)
               {
                  textend = aButtonDivHtml[i].toLowerCase().indexOf("</a>", textstart + 1);
               }
               //alert(textstart + ", " + textend);
               if (textend > textstart)
               {
                  var sText = aButtonDivHtml[i].substring(textstart, textend);
                  var nPos1 = sText.indexOf(">", 0) + 1; 
                  var nPos2 = sText.indexOf("<", nPos1);
                  if (nPos2 > nPos1)
                  {
                     sText = sText.substring(nPos1, nPos2);
                  }
                  //alert(sText)
                  pObj.buttonTexts += sText;
               }
               pObj.buttonTexts += "|";
            }
                                   
            // Determine CDPButton.buttonTitles
            var titlestart = aButtonDivHtml[i].toLowerCase().indexOf(" title=");
            //alert(titlestart);
            if (titlestart > -1)
            {
               var quotes1 = aButtonDivHtml[i].toLowerCase().indexOf('"', titlestart) + 1;
               //alert("quotes1=" + quotes1);
               var quotes2 = aButtonDivHtml[i].toLowerCase().indexOf('"', quotes1);
               //alert("quotes2=" + quotes2);
               //alert(aButtonDivHtml[i].toLowerCase().substring(quotes1, quotes2));
               if (quotes2 > quotes1)
               {
                  var sTitle = aButtonDivHtml[i].substring(quotes1, quotes2);
                  pObj.buttonTitles += sTitle;
               }
               pObj.buttonTitles += "|";
            }
                                   
            // Determine CDPButton.buttonSizes
            var sizestart = aButtonDivHtml[i].toLowerCase().indexOf("size:");
            var sizeend = aButtonDivHtml[i].toLowerCase().indexOf(";", sizestart);
            if (sizeend < 0) sizeend = aButtonDivHtml[i].toLowerCase().indexOf('"', sizestart);
            if (sizestart > -1 && sizeend > sizestart)
            {
               var sSize = aButtonDivHtml[i].substring(sizestart + 5, sizeend);
               pObj.buttonSizes += fnTrimString(sSize);
            }
            else
            {
               pObj.buttonSizes += "16";
            }
            pObj.buttonSizes += "|";

            // Determine CDPButton.buttonImages
            var imagestart = aButtonDivHtml[i].toLowerCase().indexOf(" src=");
            var imageend = aButtonDivHtml[i].toLowerCase().indexOf('"', (imagestart + 6));
            //alert(imagestart+6 + ", " + imageend);
            aButtonDivHtml[i].substring(imagestart, imageend);
            if (imagestart > -1 && imageend > (imagestart + 6))
            {
               imagestart = (imagestart + 6);
               var sImage = aButtonDivHtml[i].substring(imagestart, imageend);
               //alert("sImage = " + sImage);
               pObj.buttonImages += fnTrimString(sImage);
            }
            pObj.buttonImages += "|";

         }

         // Determine CDPButton.buttonElements
         pObj.buttonElements += sButtonElement + "|";
                                   
      }
   }

}

// Replace content of cdpbutton# div's with new content for going local based on 
// Webpage class derived object properties.
function fnMakeCdpButtons(pObj)
{
   var output = "";
   var aButtonNames = [];
   var aButtonElements = [];
   var aButtonPackages = [];
   var aButtonTexts = [];
   var aButtonTitles = [];
   var aButtonImages = [];
   var aButtonSizes = [];
   aButtonNames = pObj.buttonNames.split("|", pObj.buttonCount);
   aButtonElements = pObj.buttonElements.split("|", pObj.buttonCount);
   aButtonPackages = pObj.buttonPackages.split("|", pObj.buttonCount);
   aButtonTexts = pObj.buttonTexts.split("|", pObj.buttonCount);
   aButtonTitles = pObj.buttonTitles.split("|", pObj.buttonCount);
   aButtonImages = pObj.buttonImages.split("|", pObj.buttonCount);
   aButtonSizes = pObj.buttonSizes.split("|", pObj.buttonCount);
   var i;
   for ( i=0; i<aButtonNames.length; i++ )
   {
      var cdpbutton = "cdpbutton" + (i + 1);
      // Remove HTML to be replaced
      document.getElementById(cdpbutton).innerHTML = "";

      output = "";
      switch (aButtonNames[i])
      {
         case "button":
            output += "<div id=\"" + aButtonElements[i] + "\" style=\"visibility : show\">" + "\n";
            output += "    <script type=\"text/javascript\">" + "\n";
            output += "       oButtonsArray[" + i + "].ui({" + "\n";
            output += "          \"name\": \"" + aButtonNames[i] + "\"," + "\n";
            output += "          \"element\": \"" + aButtonElements[i] + "\"," + "\n";
            output += "          \"packagename\": [\"" + aButtonPackages[i] + "\"]," + "\n";
            output += "          \"button_text\": [\"" + aButtonTexts[i] + "\"]," + "\n";
            output += "          \"button_title\": [\"" + aButtonTitles[i] + "\"]," + "\n";
            output += "          \"button_image\": [\"" + aButtonImages[i] + "\"]," + "\n";
            output += "          \"imageSize\": " + aButtonSizes[i] + "" + "\n";
            output += "       });" + "\n";
            output += "    </script>" + "\n";
            output += "</div>" + "\n";

			 // Special case for "custom protocol". Test for navigator.msLaunchUri function feature that only windows 8+ and IE10+ has available.
			if (typeof (navigator.msLaunchUri) == typeof (Function))
			{
				output = "<div id=\"" + aButtonElements[i] + "\" style=\"visibility : show\">" + "\n";
				output += " <button onclick='fnMsLaunch(\"" + aButtonPackages[i] + "\")' title='" + aButtonTitles[i] + "' >" + aButtonTexts[i] + "</button>\n";
				output += "</div>" + "\n";
				document.getElementById(cdpbutton).innerHTML = output;
				}
			else
			{
				document.getElementById(cdpbutton).innerHTML = output;

				oButtonsArray[i].ui({
				   "name": aButtonNames[i],
				   "element": aButtonElements[i],
				   "packagename": [aButtonPackages[i]],
				   "button_text": [aButtonTexts[i]],
				   "button_title": [aButtonTitles[i]],
				   "button_image": [aButtonImages[i]],
				   "imageSize": aButtonSizes[i]
				});
			}

            break;
         case "link":
            output += "<div id=\"" + aButtonElements[i] + "\" style=\"visibility : show\">" + "\n";
            output += "    <script type=\"text/javascript\">" + "\n";
            output += "       oButtonsArray[" + i + "].ui({" + "\n";
            output += "          \"name\": \"" + aButtonNames[i] + "\"," + "\n";
            output += "          \"element\": \"" + aButtonElements[i] + "\"," + "\n";
            output += "          \"packagename\": [\"" + aButtonPackages[i] + "\"]," + "\n";
            output += "          \"button_text\": [\"" + aButtonTexts[i] + "\"]," + "\n";
            output += "          \"button_title\": [\"" + aButtonTitles[i] + "\"]," + "\n";
            output += "          \"button_image\": [\"" + aButtonImages[i] + "\"]," + "\n";
            output += "          \"imageSize\": " + aButtonSizes[i] + "" + "\n";
            output += "       });" + "\n";
            output += "    </script>" + "\n";
            output += "</div>" + "\n";

            document.getElementById(cdpbutton).innerHTML = output;

            oButtonsArray[i].ui({
               "name": aButtonNames[i],
               "element": aButtonElements[i],
               "packagename": [aButtonPackages[i]],
               "button_text": [aButtonTexts[i]],
               "button_title": [aButtonTitles[i]],
               "button_image": [aButtonImages[i]],
               "imageSize": aButtonSizes[i]
            });

            break;
         case "imgbutton":
            output += "<div id=\"" + aButtonElements[i] + "\" style=\"visibility : show\">" + "\n";
            output += "    <script type=\"text/javascript\">" + "\n";
            output += "       oButtonsArray[" + i + "].ui({" + "\n";
            output += "          \"name\": \"" + aButtonNames[i] + "\"," + "\n";
            output += "          \"element\": \"" + aButtonElements[i] + "\"," + "\n";
            output += "          \"packagename\": [\"" + aButtonPackages[i] + "\"]," + "\n";
            output += "          \"button_text\": [\"" + aButtonTexts[i] + "\"]," + "\n";
            output += "          \"button_title\": [\"" + aButtonTitles[i] + "\"]," + "\n";
            output += "          \"button_image\": [\"" + aButtonImages[i] + "\"]," + "\n";
            output += "          \"imageSize\": " + aButtonSizes[i] + "" + "\n";
            output += "       });" + "\n";
            output += "    </script>" + "\n";
            output += "</div>" + "\n";

            document.getElementById(cdpbutton).innerHTML = output;

            oButtonsArray[i].ui({
               "name": aButtonNames[i],
               "element": aButtonElements[i],
               "packagename": [aButtonPackages[i]],
               "button_text": [aButtonTexts[i]],
               "button_title": [aButtonTitles[i]],
               "button_image": [aButtonImages[i]],
               "imageSize": aButtonSizes[i]
            });

            break;
         default:
            alert("Undetermined CDPButton.buttonName");
            // Could make a default button here!
      }

   }
}

function loadJsFiles()
{
    var retVal;

    try
    {
        var PackageCss = getActiveStyleSheetHref();
        var currentTime = new Date();
        loadjscssfile( PackageCss + "?" + currentTime.getTime(), ".css" );
        loadjscssfile( PackageJs + "?" + currentTime.getTime(), "js" );
        loadjscssfile( PackageJs.replace( ".js", "lib.js" + "?" + currentTime.getTime() ), "js" );
        loadjscssfile( "..//cdpweb//cdpweb.js" + "?" + currentTime.getTime(), "js" );

        retVal = true;
    }
    catch( e1 )
    {
        retVal = false;
    }

    return retVal;
}

function fnMsLaunch(pPackageName)
{
   //alert("In fnMsLaunch()");
	navigator.msLaunchUri("cdp:" + pPackageName,
		 function () { /* Success */ top.window.blur(); },
		 function () { /* Failure */ alert("Please install the SnapBack Apps Platform in order to use this SnapBack App. Click OK to continue to the App Platform install page."); window.location.href="http://snapback-apps.com/oominstaller/main.html" + "?packageName=" + pPackageName});
}

