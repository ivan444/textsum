function showPictureOnTop(imgObject, imgWidth, imgHeight) {
    var slashPosition = parseInt(imgObject.slice(9).indexOf("/")); // Hvatanje 3 slash-a u /Portals/X/ jer varirara ako je jednoznamenkasti ili višeznamenkasti broj portala
    var topPhotoSrc = imgObject.slice(10 + slashPosition);  //Očišćen URL od /Portals/X/ stringa
    var homeDirectory = imgObject.slice(0, 10 + slashPosition); //Hvatanje Home directory-a iz URL stringa
    var portalId = imgObject.slice(9, 9 + slashPosition); //Hvatanje portal ID-a iz URL stringa
    var topNewsPhoto = "<img src='/DesktopModules/DnnForge%20-%20NewsArticles/ImageHandler.ashx?Width=" + imgWidth + "&Height=" + imgHeight + "&HomeDirectory=" + homeDirectory + "&FileName=" + topPhotoSrc + "&PortalID=" + portalId + "&q=1' class='topNewsPhoto' />";
    jQuery("#dnn_ContentPane").prepend(topNewsPhoto);
}

function addDataToString(startString, picURL, thumbText, thumbAlt, articleLink) {
    var dataString = startString + '{"content":"<div class=\\"slide_inner\\"><a class=\\"photo_link\\" href=\\"' + articleLink + '\\"><img class=\\"photo\\" src=\\"' + picURL + '\\" alt=\\"\\"></a></div>","content_button":"<div class=\\"thumb\\"><a href=\\"' + articleLink + '\\"><h3>' + thumbText + '</h3><p>' + thumbAlt + '</p></a></div>"},';
    return dataString;
}

function showYoutube() {
    jQuery("#audio").hide();
    jQuery("#youtube").show();
}

function showAudioUrl() {
    jQuery("#youtube").hide();
    jQuery("#audio").show();
}

function xClose() {
    jQuery("#audio").hide();
    jQuery("#youtube").hide();
}

function postajeAjax(postaja) {
    jQuery("#postajeLinks li").removeClass();
    var noviTab = document.getElementById(postaja);
    jQuery(noviTab).addClass("active");
    jQuery('#liveStreamLink').attr('href', 'javascript:openPlayer("' + postaja + '");');
    jQuery('#logoImg').attr('src', '/Portals/0/images/logo/logo_' + postaja + '.png');
}

/* Postaje slider */
var listLength = "";
function postSize() {
    var itemWidth = jQuery("#postajeLinks li").width();
    return itemWidth;
};
function postNext() {
    var listWidth = jQuery("#postajeLinks").width();
    var listWidth = listWidth - 800;
    var itemWidth = postSize();
    if (listLength <= -listWidth) { }
    else {
        listLength = +listLength - itemWidth;
        jQuery("#postajeLinks").attr("style", "left:" + listLength + "px");
    }
    return itemWidth;
};
function postPrev() {
    var itemWidth = postSize();
    if (listLength >= 0) { }
    else {
        listLength = +listLength + itemWidth;
        jQuery("#postajeLinks").attr("style", "left:" + listLength + "px");
    }
};

/* Image gallery na članku */
var plovlength = "";
function imagesize() {
    var imagewidth = jQuery("#articleImageList td").width();
    return imagewidth;
};
function imgNext() {
    var plovwidth = jQuery("#articleImageList").width();
    var plovwidth = plovwidth - 436;
    var imagewidth = imagesize();
    if (plovlength <= -plovwidth) { }
    else {
        plovlength = +plovlength - imagewidth;
        jQuery("#articleImageList").attr("style", "left:" + plovlength + "px");
    }
    return imagewidth;
};
function imgPrev() {
    var imagewidth = imagesize();
    if (plovlength >= 0) { }
    else {
        plovlength = +plovlength + imagewidth;
        jQuery("#articleImageList").attr("style", "left:" + plovlength + "px");
    }
};


/* Image gallery na naslovnici */
var listLengthFront = "" ;
function itemSizeFront() {
	var itemWidth = jQuery("#videoGalTable td").outerWidth();
	return itemWidth;
};
function imgNextFront() {
	var listWidth = jQuery("#videoGalTable").width();
	var listWidth = listWidth - 647 ;
	var itemWidth = itemSizeFront();
	if (listLengthFront <= -listWidth) {}
	else {
	listLengthFront = +listLengthFront - itemWidth ;
	jQuery("#videoGalTable").attr("style" , "left:" + listLengthFront + "px");
	}
	return itemWidth ;
};
function imgPrevFront() {
	var itemWidth = itemSizeFront();
	if (listLengthFront >= 0) {}
	else {
	listLengthFront = +listLengthFront + itemWidth ;
	jQuery("#videoGalTable").attr("style" , "left:" + listLengthFront + "px");
	}
};

function openPlayer(postaja) {
    var postaja;
    var link;
    switch (postaja) {
        case "zagreb":
            link = "http://www.soundsetplavi.hr/Streaming.aspx";
            break;
        case "split":
            link = "http://split.soundset.hr//Streaming.aspx";
            break;
        case "dubrovnik":
            link = "http://dubrovnik.soundset.hr//Streaming.aspx";
            break;
        case "bjelovar":
            link = "http://bjelovar.soundset.hr//Streaming.aspx";
            break;
        case "rijeka":
            link = "http://www.soundsetkvarner.hr//Streaming.aspx";
            break;
        case "zapresic":
            link = "http://zapresic.soundset.hr//Streaming.aspx";
            break;			
        case "pozega":
            link = "http://94.76.208.7:8005/listen.pls";
            break;
        case "krapina":
            link = "http://krapina.soundset.hr//Streaming.aspx";
            break;
        case "sibenik":
            link = "http://89.201.174.27:8024/listen.pls";
            break;
        case "rovinj":
            link = "http://www.soundsetistra.hr/stream/soundset/rovinj.pls";
            break;
        case "umag":
            link = "http://www.soundsetistra.hr/stream/soundset/umag.pls";
            break;	
        case "pula":
            link = "http://www.soundsetistra.hr/stream/soundset/pula.pls";
            break;			
        case "brod":
            link = "http://www.soundsetbrod.hr//Streaming.aspx";
            break;
    }
    var width = 410;
    var height = 430;
    var left = Math.floor((screen.availWidth - width) / 8);
    var top = Math.floor((screen.availHeight - height) / 4);
    var windowFeatures = "width=" + width + ",height=" + height +
	",menubar=no,toolbar=no,scrollbars=no,resizable=no,location=no" +
	"left=" + left + ",top=" + top +
	"screenX=" + left + ",screenY=" + top;
    child1 = window.open(link, "subWind", windowFeatures);
}

function openPlayerSingle(postaja) {
    var postaja;
    var link;
    switch (postaja) {
        case "zagreb":
            link = "http://www.soundsetplavi.hr/Streaming.aspx";
            break;
		case "rijeka":
            link = "http://www.soundsetkvarner.hr//Streaming.aspx";
            break;
		case "split":
            link = "http://split.soundset.hr//Streaming.aspx";
            break;
		case "dubrovnik":
            link = "http://dubrovnik.soundset.hr//Streaming.aspx";
            break;	
		case "bjelovar":
            link = "http://bjelovar.soundset.hr//Streaming.aspx";
            break;	
		case "krapina":
            link = "http://krapina.soundset.hr//Streaming.aspx";
            break;
		case "zapresic":
            link = "http://zapresic.soundset.hr//Streaming.aspx";
            break;			
        case "brod":
            link = "http://www.soundsetbrod.hr//Streaming.aspx";
            break;	
    }
    var width = 410;
    var height = 430;
    var left = Math.floor((screen.availWidth - width) / 8);
    var top = Math.floor((screen.availHeight - height) / 4);
    var windowFeatures = "width=" + width + ",height=" + height +
	",menubar=no,toolbar=no,scrollbars=no,resizable=no,location=no" +
	"left=" + left + ",top=" + top +
	"screenX=" + left + ",screenY=" + top;
    child1 = window.open(link, "subWind", windowFeatures);
}

/* Live streaming slider header */
function showStream() {
    jQuery("#playlist").animate({
        height: 'toggle'
    }, 500);
} 