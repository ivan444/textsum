if(typeof org=="undefined"){var org=new Object();}if(typeof org.openx=="undefined"){org.openx=new Object();}if(typeof org.openx.util=="undefined"){org.openx.util=new Object();}if(typeof org.openx.SWFObjectUtil=="undefined"){org.openx.SWFObjectUtil=new Object();}org.openx.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=org.openx.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new org.openx.PlayerVersion(_5.toString().split(".")));}this.installedVer=org.openx.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){org.openx.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};org.openx.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new org.openx.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};org.openx.SWFObjectUtil.getPlayerVersion=function(){var _23=new org.openx.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new org.openx.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new org.openx.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new org.openx.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new org.openx.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};org.openx.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};org.openx.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};org.openx.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};org.openx.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(org.openx.SWFObject.doPrepUnload){if(!org.openx.unloadSet){org.openx.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",org.openx.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",org.openx.SWFObjectUtil.prepUnload);org.openx.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=org.openx.util.getRequestParameter;var FlashObject=org.openx.SWFObject;var SWFObject=org.openx.SWFObject;document.mmm_fo=1;var OX_afed8bea = '';
OX_afed8bea += "<"+"div id=\'ox_27886db19f8e2612b356e0b4a01ad75f\' style=\'display: inline;\'><"+"a href=\'http://ads.neomedia.hr/www/delivery/ck.php?oaparams=2__bannerid=148__zoneid=11__cb=c5264747e8__oadest=http%3A%2F%2Fwww.plivazdravlje.hr%2Fvolimhodanje\' target=\'_blank\'><"+"img src=\'http://ads.neomedia.hr/www/images/735f1d7cd1ab4389beaa41a3b8ba10d3.png\' width=\'200\' height=\'800\' alt=\'\' title=\'\' border=\'0\' /><"+"/a><"+"/div>\n";
OX_afed8bea += "<"+"script type=\'text/javascript\'><"+"!--// <"+"![CDATA[\n";
OX_afed8bea += "var ox_swf = new FlashObject(\'http://ads.neomedia.hr/www/images/f7b26a94bb010d8b84a48f52abeb4cfc.swf\', \'Advertisement\', \'200\', \'800\', \'11\');\n";
OX_afed8bea += "ox_swf.addVariable(\'clickTARGET\', \'_blank\');\n";
OX_afed8bea += "ox_swf.addVariable(\'clickTAG\', \'http%3A%2F%2Fads.neomedia.hr%2Fwww%2Fdelivery%2Fck.php%3Foaparams%3D2__bannerid%3D148__zoneid%3D11__cb%3Dc5264747e8__oadest%3Dhttp%253A%252F%252Fwww.plivazdravlje.hr%252Fvolimhodanje\');\n";
OX_afed8bea += "ox_swf.addParam(\'allowScriptAccess\',\'always\');\n";
OX_afed8bea += "ox_swf.write(\'ox_27886db19f8e2612b356e0b4a01ad75f\');\n";
OX_afed8bea += "if (ox_swf.installedVer.versionIsValid(ox_swf.getAttribute(\'version\'))) { document.write(\"<"+"div id=\'beacon_c5264747e8\' style=\'position: absolute; left: 0px; top: 0px; visibility: hidden;\'><"+"img src=\'http://ads.neomedia.hr/www/delivery/lg.php?bannerid=148&amp;campaignid=105&amp;zoneid=11&amp;loc=http%3A%2F%2Fwww.novilist.hr%2FVijesti%2FHrvatska%2FJe-li-ovo-konacan-kraj-Vjesnik-sutra-nece-izaci&amp;referer=http%3A%2F%2Fwww.monitor.hr%2F&amp;cb=c5264747e8\' width=\'0\' height=\'0\' alt=\'\' style=\'width: 0px; height: 0px;\' /><"+"/div>\"); } else { document.write(\"<"+"div id=\'beacon_c5264747e8\' style=\'position: absolute; left: 0px; top: 0px; visibility: hidden;\'><"+"img src=\'http://ads.neomedia.hr/www/delivery/lg.php?bannerid=148&amp;campaignid=105&amp;zoneid=11&amp;loc=http%3A%2F%2Fwww.novilist.hr%2FVijesti%2FHrvatska%2FJe-li-ovo-konacan-kraj-Vjesnik-sutra-nece-izaci&amp;referer=http%3A%2F%2Fwww.monitor.hr%2F&amp;oxfb=1&amp;cb=c5264747e8\' width=\'0\' height=\'0\' alt=\'\' style=\'width: 0px; height: 0px;\' /><"+"/div>\"); }\n";
OX_afed8bea += "// ]]> --><"+"/script><"+"noscript><"+"div id=\'beacon_c5264747e8\' style=\'position: absolute; left: 0px; top: 0px; visibility: hidden;\'><"+"img src=\'http://ads.neomedia.hr/www/delivery/lg.php?bannerid=148&amp;campaignid=105&amp;zoneid=11&amp;loc=http%3A%2F%2Fwww.novilist.hr%2FVijesti%2FHrvatska%2FJe-li-ovo-konacan-kraj-Vjesnik-sutra-nece-izaci&amp;referer=http%3A%2F%2Fwww.monitor.hr%2F&amp;oxfb=1&amp;cb=c5264747e8\' width=\'0\' height=\'0\' alt=\'\' style=\'width: 0px; height: 0px;\' /><"+"/div><"+"/noscript>\n";
document.write(OX_afed8bea);
