
var knopso=(function(){var me={};me.settings={width:600,height:450,interval:100,frontendURL:"https://my.knopso.com"};var constants={'darkCover':'knopsoPopup_darkCover_div','darkCoverStyle':['position:absolute;','top:0px;','left:0px;','padding-right:0px;','padding-bottom:0px;','background-color:#000000;','opacity:0.5;','-moz-opacity:0.5;','filter:alpha(opacity=0.5);','z-index:10000;','width:100%;',].join('')};var getWindowInnerSize=function(){var width=0;var height=0;var elem=null;if('innerWidth'in window){width=window.innerWidth;height=window.innerHeight;}else{if(('BackCompat'===window.document.compatMode)&&('body'in window.document)){elem=window.document.body;}else if('documentElement'in window.document){elem=window.document.documentElement;}
if(elem!==null){width=elem.offsetWidth;height=elem.offsetHeight;}}
return[width,height];};var getMaxDocumentHeight=function(){var d=window.document;return Math.max(Math.max(d.body.scrollHeight,d.documentElement.scrollHeight),Math.max(d.body.offsetHeight,d.documentElement.offsetHeight),Math.max(d.body.clientHeight,d.documentElement.clientHeight));};var getParentCoords=function(){var width=0;var height=0;if('screenLeft'in window){width=window.screenLeft;height=window.screenTop;}else if('screenX'in window){width=window.screenX;height=window.screenY;}
return[width,height];};me.darkenScreen=function(){var darkCover=window.document.getElementById(constants['darkCover']);if(!darkCover){darkCover=window.document.createElement('div');darkCover['id']=constants['darkCover'];darkCover.setAttribute('onclick',"window.knopso.undarkenScreen()");window.document.body.appendChild(darkCover);}
var height='height:'+getMaxDocumentHeight()+'px;';var style=constants['darkCoverStyle']+height;darkCover.setAttribute('style',style);darkCover.style.visibility='visible';};me.undarkenScreen=function(){var darkCover=window.document.getElementById(constants['darkCover']);if(darkCover){darkCover.style.visibility='hidden';}};var getCenteredWindow=function(width,height){var parentSize=getWindowInnerSize();var parentPos=getParentCoords();var xPos=parentPos[0]+Math.max(0,Math.floor((parentSize[0]-width)/2));var yPos=parentPos[1]+Math.max(0,Math.floor((parentSize[1]-height)/2));var windowOptions={height:height,width:width,left:xPos,top:yPos,status:1,location:1,resizable:1};return windowOptions;};me.join=function(object,glue,encode){if(!glue)glue=',';var pairs=[];for(var key in object){pairs.push((encode?encodeURIComponent(key):key)+'='+
(encode?encodeURIComponent(object[key]):object[key]));}
return pairs.join(glue);};me.concatURL=function(base,params){var glue=base.indexOf("?")>-1?"&":"?";var url=base+glue+params;return url;};me.buildURL=function(base,params){return me.concatURL(base,me.join(params,'&',true));};me.getURLQueryArgs=function(query){var args={};if(!query)return args;pairs=query.slice(1).split('&');for(var p=0;p<pairs.length;p++){parts=pairs[p].split('=',2);if(parts.length==2)
args[decodeURIComponent(parts[0])]=decodeURIComponent(parts[1]);}
return args;};var popupData=[];me.pushWindowData=function(hWnd,href,params,callbacks){popupData.push({'window':hWnd,'purchasePage':href,'purchaseParams':params,'callbacks':callbacks,'timerid':null});return popupData[popupData.length-1];};me.getWindowData=function(hWnd,dequeue){for(var i=0;i<popupData.length;i++){if(popupData[i].window===hWnd){return dequeue?popupData.splice(i,1)[0]:popupData[i];}}};var closeListener=function(hWnd){var closed=false;try{closed=!hWnd||hWnd.closed===true;}catch(e){closed=true;}
if(closed){data=me.getWindowData(hWnd,true)
window.clearInterval(data.timerid);if(data.callbacks.onClose)data.callbacks.onClose();}};me.onOpen=function(hwndPopup){me.darkenScreen();};me.onClose=function(){me.undarkenScreen();};me.onCancel=me.onSuccess=me.onError=null;me.onExpand=function(){window.location=me.frontendURL;};me.popupOpener=function(popupParams){var prologuePage=('prologuePage'in popupParams)?popupParams.prologuePage:null;var epiloguePage=('epiloguePage'in popupParams)?popupParams.epiloguePage:null;me.frontendURL=('frontendURL'in popupParams)?popupParams.frontendURL:me.settings.frontendURL;if(!epiloguePage)throw"Knopso popup :: Epilogue page not defined.";var callbacks={};callbacks.onOpen=('onOpen'in popupParams)?popupParams.onOpen:me.onOpen;callbacks.onCancel=('onCancel'in popupParams)?popupParams.onCancel:me.onCancel;callbacks.onSuccess=('onSuccess'in popupParams)?popupParams.onSuccess:me.onSuccess;callbacks.onError=('onError'in popupParams)?popupParams.onError:me.onError;callbacks.onClose=('onClose'in popupParams)?popupParams.onClose:me.onClose;callbacks.onExpand=('onExpand'in popupParams)?popupParams.onExpand:me.onExpand;var width=('width'in popupParams)?popupParams.width:me.settings.width;var height=('height'in popupParams)?popupParams.height:me.settings.height;var params={display:'popup',return_to:epiloguePage};return function(elem){var href=elem.href||this.href;if(!href)href=null;if(prologuePage){url=prologuePage;}else if(href){url=me.buildURL(href,params);}else{return true;}
var windowOptions=getCenteredWindow(width,height);hWnd=window.open(url,'_blank',me.join(windowOptions,','));if(!hWnd){return true;}
if(hWnd.focus)hWnd.focus();if(callbacks.onOpen)callbacks.onOpen(hWnd);var data=me.pushWindowData(hWnd,href,params,callbacks);data.timerid=window.setInterval(function(){closeListener(hWnd);},me.settings.interval);return false;};};me.popupCloser=function(window){if(!window.opener||!window.opener.knopso)return;var args=me.getURLQueryArgs(window.location.search);if(!("result"in args))
args.result='success';var data=me.getWindowData(window);if(data.callbacks){if(args.result==='success'&&data.callbacks.onSuccess){if(args.token){args.token=decodeURIComponent(args.token);}
data.callbacks.onSuccess(window,args.token);}
if(args.result==='cancel'&&data.callbacks.onCancel){data.callbacks.onCancel(window);}
if(args.result==='error'&&data.callbacks.onError){data.callbacks.onError(window,args.msg);}
if(args.result==='expand'&&data.callbacks.onExpand){data.callbacks.onExpand(window);}}
window.close();};return me;})();