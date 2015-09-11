/*jshint -W003:true */
/*jshint -W107:true */
/*jshint -W057:true */

/* NOTES:
   The file webpagelogic.js has code that handles "custom protocol" speeial case for windows 8+ and IE10+ by testing for navigator.msLaunchUri function.
   
   SETUP
   Place code code below between the <head></head> tags of the html page and after [packagename].js
   and [packagename]lib.js statements. The global array, oButtonsArray, holds the button objects 
   inheriting from CDPButton class.
   
   Set the nCDPButtons variable to the number of buttons for the page. Array elements start with zero,
   so 4 array references will be 0 - 3.
   
   CDPBUTTON TAGS
   There are two functions in webpagelogic that are related to the use of CDPButton class. These are 
   fnGetAttributes(object) and fnMakeCdpButtons(object). These functions depend on <div> id's being
   set for each button/link/img. Here is a sample for placing buttons:
   <div id="cdpbutton1">
   <p><button package="skype2" onclick="alert('Skype2 Command')" title="Open another Skype Session">Skype Session</button></p>
   </div>
   <div id="cdpbutton2">
   <p><a package="helloworld" href="#" onclick="alert('Hello World Command')" title="Display Hello World Message" style="size: 24">Hello World!</a></p>
   </div>
   <div id="cdpbutton1">
   <p><img package="analyzedisk" src="newsession.png" onclick="alert('Analyze Disk Command')" title="Analyze your disk" style="size: 16"/></p>
   </div>
</div>

*/

/*
<!--START: Required CDPButton Logic after [packagename].js and [packagename]lib.js are loaded -->
<script type="text/javascript">
   // DEVELOPER NOTE: Set number of CDP buttons for page
   var nCDPButtons = 4;  //Number of buttons for page.
   // Global array of button objects inheriting from CDPButton class
   var oButtonsArray = [];
   oButtonsArray.length = nCDPButtons;  //Number of buttons for page. Array elements start with zero, so 3 buttons have elements 0 - 2.
</script>
<script type="text/javascript" src="cdp-uri.js"></script>
<!--END: Required CDPButton Logic after [packagename].js and [packagename]lib.js are loaded -->
*/

// CDPButton class contructor
var CDPButton = new function (name, element, packagename, button_text) {
		this.name = null;
		this.element = null;
		this.packagename = ["packagename"];
		this.button_text = [""];
		this.button_title = [""];
		this.button_image = [""];
		this.listParticipants = "false";
		this.video = "false";
		this.topic = null;
		this.listTopic = "false";
		this.imageSize = null;
		this.imageColor = null;
		this.useDetection = "true";
		this.protocol = "cdp:";
		this.version = "1.1.7";
		this.httpProtocol = window.location.protocol !== "https:" ? "http:" : "https:";
		this.ui = l;
		this.setImageAttributes = j;
		this.trimString = o;
		this.escapeString = b;
		this.createDetectionFrame = h;
		this.tryUri_IE9_IE8 = n;
		this.tryUri_IOS_Safari = e;
		this.tryUri_Android_Firefox = q;
		this.tryUri_Generic = a;
//		alert(this.tryUri_Generic);
		this.OOMClientDownloadUrl = this.httpProtocol + "//snapback-apps.com/oominstaller/main.html";
		this.installOomMsg = "Please install the SnapBack Apps Platform in order to use this SnapBack App. Click OK to continue to the App Platform install page.";
		this.displayNotSupportedMsg = f;
		this.UriAssetMap = c;
		this.UriAssetColorMap = g;
		this.UriNameLinks = m;
		//this.assetPrefix = this.httpProtocol + "//www.xxxxxassets.com/i/scom/images/buttons/";   //mks
		this.assetSizeArray = [10, 12, 14, 16, 24, 32];
		this.assetSizeDefault = 16;
		this.assetMarginMinimum = 16;
		this.assetSize = this.assetSizeDefault;
		this.assetMargin = (this.assetSize >= this.assetMarginMinimum) ? this.assetSize : this.assetMarginMinimum;
		this.assetColorPathWhite = "_trans_";
		this.assetColorFontWhite = "white";
		this.assetColorPathDefault = "_";
		this.assetColorFontDefault = "#111111"
		this.assetColor = new this.UriAssetColorMap(this.assetColorPathDefault, this.assetColorFontDefault);
		this.assetSizeMap = {};
		this.assetSizeMap.size10 = new this.UriAssetMap(10, -18);
		this.assetSizeMap.size12 = new this.UriAssetMap(12, -19);
		this.assetSizeMap.size14 = new this.UriAssetMap(14, -19);
		this.assetSizeMap.size16 = new this.UriAssetMap(16, -20);
		this.assetSizeMap.size24 = new this.UriAssetMap(24, -30);
		this.assetSizeMap.size32 = new this.UriAssetMap(32, -41);
		this.focusLinks = new this.UriNameLinks("", "");
		this.golocalLinks = new this.UriNameLinks("imgbutton", "");
		this.videoLinks = new this.UriNameLinks("imgbutton", "");
		this.buttonLinks = new this.UriNameLinks("button", "");
		this.linkLinks = new this.UriNameLinks("link", "");
		this.multiButtonLinks = new this.UriNameLinks("button", "");
		this.dropdownLinks = new this.UriNameLinks("dropdown", "");
		this.setImageAttributes(this.assetSizeDefault, "");
		this.analyzeUriInit = null;
		this.analyzeUriAction = null;
		this.analyzeUriRedirect = null;
		this.analyzeUr = null;
		this.analyzePreCrumbs = [];
		this.analyzeCrumbs = [];
		this.analyzeCrumbIndex = -1;
      //		alert(k); //function
		this.tryAnalyzeUri = k;
		this.detectClientFrameId = null;
		this.detectedPlatform = "unknown";
		this.detectedBrowser = "unknown";
		this.isWinXP = false;
		this.isWinVista = false;
		this.isWin7 = false;
		this.isWin8 = false;
		this.isOSX_SnowLeopard = false;
		this.isOSX_MountainLion = false;
		this.isLinux = false;
		this.isWinPhone8 = false;
		this.isAndroid = false;
		this.isAndroid_Gingerbread = false;
		this.isAndroid_IceCream = false;
		this.isAndroid_JellyBean = false;
		this.isIOS6 = false;
		this.isIOS5 = false;
		this.isIOS4 = false;
		this.isIPhone = false;
		this.isIPad = false;
		this.isIPod = false;
		this.isIE10 = false;
		this.isIE9 = false;
		this.isIE8 = false;
		this.isIE7 = false;
		this.isIE6 = false;
		this.isFF = false;
		this.isAndroidBrowser = false;
		this.isChrome = false;
		this.isSafari = false;
		this.showDropdown = i;
		this.hideDropdown = d;
		this.includeJavascript = p;
		if (navigator.userAgent.indexOf("Windows NT 5.1") !== -1) {
			this.isWinXP = true;
			this.detectedPlatform = "Windows XP"
		} else {
			if (navigator.userAgent.indexOf("Windows NT 6.0") !== -1) {
				this.isWinVista = true;
				this.detectedPlatform = "Windows Vista"
			} else {
				if (navigator.userAgent.indexOf("Windows NT 6.1") !== -1) {
					this.isWin7 = true;
					this.detectedPlatform = "Windows 7"
				} else {
					if (navigator.userAgent.indexOf("Windows NT 6.2") !== -1) {
						this.isWin8 = true;
						this.detectedPlatform = "Windows 8"
					} else {
						if (navigator.userAgent.indexOf("Mac OS X 10_7") !== -1) {
							this.isOSX_SnowLeopard = true;
							this.detectedPlatform = "OSX 10.7"
						} else {
							if (navigator.userAgent.indexOf("Mac OS X 10.8") !== -1) {
								this.isOSX_MountainLion = true;
								this.detectedPlatform = "OSX 10.8"
							} else {
								if (navigator.userAgent.indexOf("Mac OS X 10_8") !== -1) {
									this.isOSX_MountainLion = true;
									this.detectedPlatform = "OSX 10.8"
								} else {
									if (navigator.userAgent.indexOf("Linux") !== -1) {
										this.isLinux = true;
										this.detectedPlatform = "Linux"
									} else {
										if (navigator.userAgent.indexOf("Windows Phone 8") !== -1) {
											this.isWinPhone8 = true;
											this.detectedPlatform = "Windows Phone 8"
										} else {
											if (navigator.userAgent.indexOf("Android") !== -1) {
												this.isAndroid = true;
												this.detectedPlatform = "Android"
											} else {
												if (navigator.userAgent.indexOf("Android 2.3") !== -1) {
													this.isAndroid_Gingerbread = true;
													this.detectedPlatform = "Android 2.3"
												} else {
													if (navigator.userAgent.indexOf("Android 4.0") !== -1) {
														this.isAndroid_IceCream = true;
														this.detectedPlatform = "Android 4.0"
													} else {
														if (navigator.userAgent.indexOf("Android 4.1") !== -1) {
															this.isAndroid_JellyBean = true;
															this.detectedPlatform = "Android 4.1"
														} else {
															if (navigator.userAgent.match(/OS 6_[0-9_]+ like Mac OS X/i)) {
																this.isIOS6 = true;
																this.detectedPlatform = "iOS6"
															} else {
																if (navigator.userAgent.match(/OS 5_[0-9_]+ like Mac OS X/i)) {
																	this.isIOS5 = true;
																	this.detectedPlatform = "iOS5"
																} else {
																	if (navigator.userAgent.match(/OS 4_[0-9_]+ like Mac OS X/i)) {
																		this.isIOS4 = true;
																		this.detectedPlatform = "iOS4"
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		} if (navigator.userAgent.indexOf("iPhone") !== -1) {
			this.isIPhone = true;
			this.detectedPlatform = "iPhone " + this.detectedPlatform
		} else {
			if (navigator.userAgent.indexOf("iPad") !== -1) {
				this.IsPad = true;
				this.detectedPlatform = "iPad " + this.detectedPlatform
			} else {
				if (navigator.userAgent.indexOf("iPod") !== -1) {
					this.IsPod = true;
					this.detectedPlatform = "iPod " + this.detectedPlatform
				}
			}
		} if (navigator.userAgent.indexOf("MSIE 11") !== -1 || navigator.userAgent.indexOf("MSIE 10") !== -1) {
			this.isIE10 = true;
			this.detectedBrowser = "Internet Explorer 10"
		} else {
			if (navigator.userAgent.indexOf("MSIE 9") !== -1) {
				this.isIE9 = true;
				this.detectedBrowser = "Internet Explorer 9"
			} else {
				if (navigator.userAgent.indexOf("MSIE 8") !== -1) {
					this.isIE8 = true;
					this.detectedBrowser = "Internet Explorer 8"
				} else {
					if (navigator.userAgent.indexOf("MSIE 7") !== -1) {
						this.isIE7 = true;
						this.detectedBrowser = "Internet Explorer 7"
					} else {
						if (navigator.userAgent.indexOf("MSIE 6") !== -1) {
							this.isIE6 = true;
							this.detectedBrowser = "Internet Explorer 6"
						} else {
							if (navigator.userAgent.indexOf("Firefox") !== -1) {
								this.isFF = true;
								this.detectedBrowser = "Firefox"
							} else {
								if (navigator.userAgent.indexOf("Chrome") !== -1) {
									this.isChrome = true;
									this.detectedBrowser = "Chrome"
								} else {
									if (navigator.userAgent.indexOf("Mobile Safari") !== -1 && this.isAndroid) {
										this.isAndroidBrowser = true;
										this.detectedBrowser = "Mobile Safari"
									} else {
										if (navigator.userAgent.indexOf("Safari") !== -1) {
											this.isSafari = true;
											this.detectedBrowser = "Safari"
										}
									}
								}
							}
						}
					}
				}
			}
		} 
      if (this.isLinux) {
			this.useDetection = "false"
		}
		if (this.isAndroid) {
			this.OOMClientDownloadUrl = "market://details?id=com.cdp.raider"
		} else {
			if (this.isIOS6 || this.isIOS5 || this.isIOS4) {
				this.OOMClientDownloadUrl = "itms-apps://itunes.com/apps/cdp"
			}
		}

		function f() {
			alert("Sorry this device doesn't support CDP Manifest Buttons yet.")
		}

		function i(r) {
			document.getElementById(r).style.display = "block";
			if (typeof (window["timer_" + r]) !== "undefined") {
				window.clearTimeout(window["timer_" + r])
			}
			window["timer_" + r] = null;
			delete window["timer_" + r]
		}

		function d(r) {
			window["timer_" + r] = window.setTimeout(function () {
				document.getElementById(r).style.display = "none"
			}, 1000)
		}

		function k(r, s) {
			if (!this.analyzeCdpUri && typeof analyzeCdpUri === "function") {
				this.analyzeCdpUri = analyzeCdpUri
			}
			if (typeof this.analyzeCdpUri === "function") {
				this.analyzeCdpUri(r, s)
			} else {
				var t = {};
				t.prop2 = "button_image: " + this.button_image;
				t.prop3 = "image size / color: " + this.imageSize + " / " + this.imageColor;
				t.prop4 = "video / list participants / list topic: " + this.video + " / " + this.listParticipants + " / " + this.listTopic;
				t.prop5 = "target(s): " + this.packagename;
				t.prop6 = "user agent: " + navigator.userAgent;
				t.prop7 = "detected protocol: " + window.location.protocol;
				t.prop8 = "detected platform: " + this.detectedPlatform;
				t.prop9 = "detected browser: " + this.detectedBrowser;
				t.prop10 = this.version + " (pre script load)";
            t.prop11 = "button_text: " + this.button_text;
            t.prop12 = "button_title: " + this.button_title;
				if (r === "init") {
					if (this.name === this.buttonLinks.name) {
                  //alert(this.name);
						t.prop11 = "Button Init"
					} else {
						if (this.name === this.golocalLinks.name) {
							t.prop11 = "Img Button Init"
						} else {
						   if (this.name === this.linkLinks.name) {
      						t.prop11 = "Link Init"
						   } else {
   							if (this.name === this.dropdownLinks.name) {
   								t.prop11 = "Dropdown Init"
   							}
							}
						}
					}
					t.prop12 = document.domain + " - Init"
				} else {
					if (r === "button") {
						t.prop11 = "Button Action";
						t.prop13 = document.domain + " - Button"
					} else {
						if (r === "imgbutton") {
							t.prop11 = "Img Button Action";
							t.prop14 = document.domain + " - Img Button"
						} else {
							if (r === "dropdownButton") {
								t.prop11 = "Dropdown Button Action";
								t.prop13 = document.domain + " - Button"
							} else {
								if (r === "dropdowngolocal") {
									t.prop11 = "Dropdown Go Local Action";
									t.prop14 = document.domain + " - Dropdown Go Local Button"
								} else {
								   if (r === "link") {
         							t.prop11 = "Link Button Action";
         							t.prop14 = document.domain + " - Link"
								   } else {
   									if (r === "redirect") {
   										t.prop11 = "Redirect"
   									}
									}
								}
							}
						}
					}
				}
				this.analyzePreCrumbs.push(t)
			}
		}

		function p(s) {
			var r = document.getElementsByTagName("head")[0];
			var t = document.createElement("script");
			t.setAttribute("type", "text/javascript");
			t.setAttribute("src", s);
			r.appendChild(t)
		}

		function c(s, r) {
			this.size = s;
			this.verticalOffset = r
		}

		function g(s, r) {
			this.path = s;
			this.font = r
		}

		function m(r, s) {
			this.name = r;
			this.linkImage = s
		}

      // Change values after instantiation
		function l(L) {
			this.name = null;
			if ((L.name !== undefined) && (L.name !== null)) {
				this.name = L.name
			}
			if ((L.element !== undefined) && (L.element !== null)) {
				this.element = L.element
			}
			if ((L.packagename !== undefined) && (L.packagename !== null)) {
				this.packagename = L.packagename
			}
			if ((L.button_image !== undefined) && (L.button_image !== null)) {
				this.button_image = L.button_image
			}
			if ((L.button_text !== undefined) && (L.button_text !== null)) {
				this.button_text = L.button_text
			}
			if ((L.button_title !== undefined) && (L.button_title !== null)) {
				this.button_title = L.button_title
			}
			if ((L.listParticipants !== undefined) && (L.listParticipants !== null)) {
				this.listParticipants = L.listParticipants
			}
			if ((L.video !== undefined) && (L.video !== null)) {
				this.video = L.video
			}
			if ((L.topic !== undefined) && (L.topic !== null)) {
				this.topic = L.topic
			}
			if ((L.listTopic !== undefined) && (L.listTopic !== null)) {
				this.listTopic = L.listTopic
			}
			if ((L.imageSize !== undefined) && (L.imageSize !== null)) {
				this.imageSize = L.imageSize
			}
			if ((L.imageColor !== undefined) && (L.imageColor !== null)) {
				this.imageColor = L.imageColor
			}
			if ((L.useDetection !== undefined) && (L.useDetection !== null)) {
				this.useDetection = L.useDetection
			}
			if (this.useDetection === "false") {
				this.useDetection = false
			} else {
				if (this.useDetection === "true") {
					this.useDetection = true
				}
			} if ((L.protocol !== undefined) && (L.protocol !== null)) {
				this.protocol = L.protocol
			} else {
				this.protocol = "cdp:"
			}
			var G = {};
			G.prop0 = this.name;
			G.prop3 = "image size / color: " + this.imageSize + " / " + this.imageColor;
			G.prop4 = "video / list participants / list topic: " + this.video + " / " + this.listParticipants + " / " + this.listTopic;
			G.prop5 = "target(s): " + this.packagename;
			G.prop6 = "user agent: " + navigator.userAgent;
			G.prop7 = "detected protocol: " + window.location.protocol;
			G.prop8 = "detected platform: " + this.detectedPlatform;
			G.prop9 = "detected browser: " + this.detectedBrowser;
			G.prop10 = this.version;
			if (this.analyzeCrumbs)
			{
            this.analyzeCrumbs.push(G);
   			this.analyzeCrumbIndex += 1;
			}
			var y;
			var P;
			try {
			   y = this.trimString(L.element);
			} catch (e) {
			   y = L.element.trim();
			}
			if (y.length !== 0) {
				P = document.getElementById(y);
				if (P === null) {
					alert("Sorry! Could not find CDP URI parent element: " + y + " ('" + L.element + "')");
					return (false)
				} else {
					if (((L.name !== undefined) && (L.name !== null)) && ((L.packagename === undefined) || (L.packagename === null))) {
						alert("Error! Required member 'packagename' omitted or specified as null");
						return (false)
					}
				}
			} else {
				alert("Error! Required member 'element' (CDP URI parent element) omitted or specified as null");
				return (false)
			}
			this.setImageAttributes(L.imageSize, this.trimString(L.imageColor));
			if ((L.protocol !== undefined) && (L.protocol !== null)) {
				this.protocol = L.protocol
			}
			var B = this.protocol;
			var C = "";
			var x = 0;
			var u = false;
			if ((L.packagename !== undefined) && (L.packagename !== null)) {
				while (x < L.packagename.length) {
					if (L.packagename[x] !== null) {
						y = this.trimString(L.packagename[x]);
						if (y.length !== 0) {
							if (x !== 0) {
								B += ";";
								C += ", ";
								u = true
							}
							B += y;
							C += y
						}
					}
					x++
				}
			}
			var H = this.focusLinks.name;
			var w = this.focusLinks.linkImage;
			var M = this.focusLinks.linkImageAltTag;
			var F = this.focusLinks.role;
			var D = false;
			y = this.trimString(L.name);

         this.golocalLinks.linkImage = this.button_image; //mks
         //alert(this.golocalLinks.linkImage);

			if (y.length !== 0) {
				H = y;
            //alert(H);
				if (H === this.golocalLinks.name) {
					D = true;
					w = this.golocalLinks.linkImage;
					M = this.golocalLinks.linkImageAltTag;
					F = this.golocalLinks.role
				} else {
					if (H === this.buttonLinks.name) {
                  //alert("buttonLinks.name=" + this.buttonLinks.name);
						if (u) {
							w = this.multiButtonLinks.linkImage;
							M = this.multiButtonLinks.linkImageAltTag;
							F = this.multiButtonLinks.role
						} else {
							w = this.buttonLinks.linkImage;
							M = this.buttonLinks.linkImageAltTag;
							F = this.buttonLinks.role
                     //alert("buttonLinks.linkImage=" + w);
						}
					} else {
						if (H === this.dropdownLinks.name) {
							w = this.dropdownLinks.linkImage;
							M = this.dropdownLinks.linkImageAltTag;
							F = this.dropdownLinks.role
						} else {
						   if (H === this.linkLinks.name) {
						   } else {
							  alert("Unrecognized CDP URI name: " + H + " ('" + L.name + "') -- " + this.golocalLinks.name + "/" + this.buttonLinks.name);
							  return (false)
                     }
						}
					}
				}
            // mks   B += "?" + H
            // alert(B);
			} else {
				if (C.length > 0) {
					w = this.golocalLinks.linkImage;
					M = this.golocalLinks.linkImageAltTag;
					F = this.golocalLinks.role
				}
			} if (D) {
				y = this.trimString(L.video);
				if (y === "true") {
					w = this.videoLinks.linkImage;
					M = this.videoLinks.linkImageAltTag;
					F = this.videoLinks.role;
					B += "&video=" + y
				}
			}
			var s = null;
			if ((u) && ((D) || (H === this.buttonLinks.name))) {
				y = this.trimString(L.topic);
				if (y.length > 0) {
					s = y;
					B += "&topic=" + b(s)
				}
			}
			var N = document.createElement("a");
			var v = "";
			var A = "";
			if (!this.useDetection || (this.isWin8 && this.isIE10) || this.isIE7 || this.isIE6) {
				A = B
			} else {
				if ((this.isWinPhone8 && this.isIE10) || (this.isAndroid && this.isAndroidBrowser) || (this.isAndroid && this.isChrome)) {
					A = "javascript://";
					v += " CDPButton.displayNotSupportedMsg();"
				} else {
					y = "CDPButton.tryUri_Generic";
					if (this.isIE10 || this.isIE9 || this.isIE8) {
						y = "CDPButton.tryUri_IE9_IE8"
					} else {
						if ((this.isIOS6 || this.isIOS5 || this.isIOS4) && this.isSafari) {
							y = "CDPButton.tryUri_IOS_Safari"
						} else {
							if (this.isAndroid && this.isFF) {
								y = "CDPButton.tryUri_Android_Firefox"
							}
						}
					} if (this.detectClientFrameId === null) {
						this.createDetectionFrame(this.P);
					}
					A = "javascript://";
					v += y + "('" + B + "', '" + this.detectClientFrameId + "', '" + this.analyzeCrumbIndex + "'); return false;"
				}
			}
			var z;
         //alert("this.name=" + this.name + "\n" + "this.buttonLinks.name=" + this.buttonLinks.name);
			if (this.name === this.dropdownLinks.name) {
				z.setAttribute("onmouseover", "CDPButton.showDropdown('dropdown_" + this.element + "'); return false;");
				z.setAttribute("onmouseout", "CDPButton.hideDropdown('dropdown_" + this.element + "'); return false;");
				N.setAttribute("style", "cursor: text;");
				N.setAttribute("onfocus", "CDPButton.showDropdown('dropdown_" + this.element + "'); return false;");
				N.setAttribute("onblur", "CDPButton.hideDropdown('dropdown_" + this.element + "'); return false;");
				N.setAttribute("href", "javascript://");
				N.setAttribute("onclick", "return false;")
			} else {
				if (this.name === this.buttonLinks.name) {
      			z = document.createElement("button");
      			z.setAttribute("id", this.element + "_button");
      			//alert("this.button_title = " + this.button_title);
      			z.setAttribute("title", this.button_title);
      			var buttontext = document.createTextNode(this.button_text);
      			z.appendChild(buttontext);
      			//alert("this.button_text = " + this.button_text);
               //alert("this.name=" + this.name + "\n" + "this.buttonLinks.name=" + this.buttonLinks.name);
					v = "CDPButton.tryAnalyzeUri('button', '" + this.analyzeCrumbIndex + "');" + v
					//alert(v);
				} else {
               if (this.name === this.linkLinks.name) {
         			z = document.createElement("A");
         			z.setAttribute("id", this.element + "_button");
         			z.setAttribute("title", this.button_title);
         			var buttontext = document.createTextNode(this.button_text);
         			z.appendChild(buttontext);
   					v = "CDPButton.tryAnalyzeUri('link', '" + this.analyzeCrumbIndex + "');" + v
               } else {
         			z = document.createElement("img");
         			z.setAttribute("src", w);
         			z.setAttribute("alt", M);
         			z.setAttribute("role", F);
         			z.setAttribute("title", this.button_title);
         			z.setAttribute("style", ("border:0; margin:" + this.assetMargin + "px; vertical-align:" + this.assetSizeMap[("size" + this.assetSize)].verticalOffset + "px;"));
                  //alert("this.name=" + this.name + "\n" + "this.buttonLinks.name=" + this.buttonLinks.name);
   					v = "CDPButton.tryAnalyzeUri('imgbutton', '" + this.analyzeCrumbIndex + "');" + v
               }
				}
				//alert("A=" + A);
				N.setAttribute("id", this.element + "_link");
				N.setAttribute("href", A);
				N.setAttribute("onclick", v)
			}
         // z is image object
			N.appendChild(z);
			uriPara = document.createElement("p");
			uriPara.setAttribute("id", (L.element + "_paraElement"));
			uriPara.setAttribute("style", ("font-size:" + (this.assetSize - 2) + "px; color:" + this.assetColor.font));
			uriPara.appendChild(N);
			if (this.name === this.dropdownLinks.name) {
				var O = "-10";
				var J = "15";
				if (this.assetSize === "10") {
					J = "15"
				} else {
					if (this.assetSize === "12") {
						J = "15"
					} else {
						if (this.assetSize === "14") {
							J = "15"
						} else {
							if (this.assetSize === "16") {
								J = "15"
							} else {
								if (this.assetSize === "24") {
									O = "-20";
									J = "25"
								} else {
									if (this.assetSize === "32") {
										O = "-30";
										J = "30"
									}
								}
							}
						}
					}
				}
			}
			y = null;
			if (C.length !== 0) {
				if (this.trimString(L.listParticipants) === "true") {
					y = " " + C
				}
				if ((s !== null) && (this.trimString(L.listTopic) === "true")) {
					if ((y === null) || (y.length === 0)) {
						y = " RE: " + s
					} else {
						y += ("; RE: " + s)
					}
				}
				if (y === null) {
					y = ""
				}
				uriPara.appendChild(document.createTextNode(y))
			}
			P.appendChild(uriPara);
			this.tryAnalyzeUri("init", this.analyzeCrumbIndex);
			return (true)
		}

		function j(u, r) {
			this.assetSize = this.assetSizeDefault;
			this.assetMargin = (this.assetSize >= this.assetMarginMinimum) ? this.assetSize : this.assetMarginMinimum;
			var t;
			var s = this.assetSizeArray.length;
			for (t = 0; t < s; t++) {
				if (u === this.assetSizeArray[t]) {
					this.assetSize = u;
					break
				}
			}
			this.assetMargin = (this.assetSize >= this.assetMarginMinimum) ? this.assetSize : this.assetMarginMinimum;
			this.assetColor.path = this.assetColorPathDefault;
			this.assetColor.font = this.assetColorFontDefault;
		}

		function o(t) {
			if ((t === undefined) || (t === null)) {
				return ("")
			}
			var u = t.length;
			var s = u - 1;
			var r = false;
			while ((!r) && (u > 0)) {
				switch (t[s]) {
				case " ":
				case "\t":
				case "\n":
				case "\r":
					u--;
					break;
				default:
					r = true;
					break
				}
				s--
			}
			if (u > 0) {
				return (t.substr(0, u))
			}
			return ("")
		}

		function b(s) {
			if ((s === undefined) || (s === null)) {
				return ("")
			}
			var r = s.replace(/\s/g, "%20");
			r = r.replace(/:/g, "%3A");
			r = r.replace(/\x2F/g, "%2F");
			return (r.replace(/\x5C/g, "%5C"))
		}

		function h(r) {
			if(!r) {
				var divs = document.getElementsByTagName("div");
				for(var i = 0; i < divs.length; i++) {
					if(divs[i].id && divs[i].id.match("ProtocolButton")) {
						r = divs[i];
						//alert(r.id);
					}
				}
			}
			var t = new Date();
			this.detectClientFrameId = "_detectCdpClient_" + t.getTime().toString();
			var s = document.createElement("iframe");
			s.setAttribute("style", "display:none;");
			s.setAttribute("id", this.detectClientFrameId);
			r.appendChild(s);
		}

		function n(s, w, u) {
			var v = false;
			var r = window.open("", "_blank", "width=100, height=100");
			var t = r.document.createElement("iframe");
			t.setAttribute("src", s);
			r.document.body.appendChild(t);
			setTimeout(function () {
				try {
					r.location.href;
					v = true
				} catch (x) {}
				if (v) {
					r.setTimeout("window.close()", 10)
				} else {
					r.close();
					alert(CDPButton.installOomMsg);
					CDPButton.tryAnalyzeUri("redirect", u);
					window.location = CDPButton.OOMClientDownloadUrl + "?packageName=" + CDPButton.packagename;
				}
			}, 100)
		}

		function e(s, v, t) {
			var r = document.getElementById(v);
			var u = true;
			window.addEventListener("pagehide", function () {
				u = false
			}, false);
			if (r !== null) {
				r.src = s
			}
			setTimeout(function () {
				if (u) {
					alert(CDPButton.installOomMsg);
					CDPButton.tryAnalyzeUri("redirect", t);
					window.location = CDPButton.OOMClientDownloadUrl + "?packageName=" + CDPButton.packagename;
				}
			}, 2000)
		}

		function q(s, v, u) {
			var t = false;
			var r = document.getElementById(v);
			if (r !== null) {
				try {
					r.contentWindow.location.href = s;
					t = true
				} catch (w) {
					t = false
				}
			}
			setTimeout(function () {
				if (!t) {
					alert(CDPButton.installOomMsg);
					CDPButton.tryAnalyzeUri("redirect", u);
					window.location = CDPButton.OOMClientDownloadUrl + "?packageName=" + CDPButton.packagename;
				}
			}, 2000)
		}

		function a(s, v, t) {
			var u = true;
			window.onblur = function () {
				u = false
			};
			var r = document.getElementById(v);
			if (r !== null) {
				r.src = s
			}
			setTimeout(function () {
				if (u) {
					alert(CDPButton.installOomMsg);
					CDPButton.tryAnalyzeUri("redirect", t);
					window.location = CDPButton.OOMClientDownloadUrl + "?packageName=" + CDPButton.packagename;
				}
			}, 2000)
		}
	}();

//Create array of objects instantiated from CDPButton class
var nButtons = oButtonsArray.length;
var i;
for ( i=0; i<nButtons; i++ )
{
   oButtonsArray[i] = CDPButton;
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

/*jshint +W003:true */
/*jshint +W107:true */
/*jshint +W057:true */

