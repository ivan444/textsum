/* Banner Loader object */
var banner_loader =
{
	items: [],
	init: function()
	{
		if (!document.getElementById)
		{ return; }
		var il = this.items.length;
		for (var i = 0; i < il; i++)
		{
			var target_item = document.getElementById('banner_' + this.items[i]);
			if (!target_item)
			{ continue; }

			var loader_item = document.getElementById('banner_' + this.items[i] + '_loader');
			if (!loader_item)
			{ continue; }

			loader_item.removeAttribute('id');
			target_item.appendChild(loader_item);
		}
	}
}

/*Init All LightBox Groups on page */
function initLightBoxGroups()
{
	var links = jQuery('a[@rel*=lightbox][@href!=""][@href!="#"]');
	while (links.length > 0)
	{
		var relSet = links.eq(0).attr("rel");
		links.filter('a[@rel="' + relSet + '"]').lightBox();
		links = links.filter('a[@rel!="' + relSet + '"]');
	}
}

/* Fix Gallery errors */
function fixEditorGallery()
{
	jQuery(".textGallery")
		.children("a")
		.each(function()
		{
			var o = jQuery(this);
			o.attr("class", String(o.attr("class")).replace("&nbsp;", " "));
		}
	);
}

/* IPhone Redirect */
function iphoneRedirect()
{
	var agt;
	var isIphone;
	var doRedirect = false;
	var cookieName = "iphoneRedirect";
	var cookieValue = "no redirect";
	var cookieDays = (1 / 24 / 3);

	agt = navigator.userAgent.toLowerCase();
	isIphone = (agt.indexOf("iphone") != -1) || (agt.indexOf("ipod") != -1);
	if (isIphone)
	{
		// Check for cookie
		var cookie = readCookie(cookieName);
		if (null == cookie)
		{
			// NO cookie check url
			doRedirect = (gup(window.location, "iphone") != 'full');
			// When not redirect add cookie, don't redirect for next 20 min
			if (!doRedirect)
			{ createCookie(cookieName, cookieValue, cookieDays); }
		}
		else
		{
			// Extend cookie lifetime
			createCookie(cookieName, cookieValue, cookieDays)
		}

		// Redirect or display link
		if (doRedirect)
		{ window.location = "http://mobile.tportal.hr/" }
		else
		{ document.write("<div style=\"background:#000;text-align:center;padding:3px 0px;margin:0px;\"><a style=\"color:#fff;text-decoration:none;\" href=\"http://mobile.tportal.hr/\">Prikaži iPhone tportal.hr</a></div>"); }
	}
}


/* Write Date */
function todayDate()
{
	var dN = new Array("Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota");
	var mN = new Array("siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenog", "prosinca");
	var dt = new Date();
	return dN[dt.getDay()] + " " + dt.getDate() + ". " + mN[dt.getMonth()];
}

/* 
Parses urlPath and returns parameter's value
params: 
urlPath - string with params
name - parameter's name
result: 
parameter's value
*/

function gup(urlPath, name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(urlPath);
	if (results == null)
		return "";
	else
		return results[1];
}

/* 
Parses window.location.href and returns parameter's value
params: 
name - parameter's name
result: 
parameter's value
*/
function gupHref(name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if (results == null)
		return "";
	else
		return results[1];
}

/*
Set tportal.hr as home page
*/
function IsBrowser(strBrowserName)
{
	var booBrowserFound = false;
	if (navigator.userAgent.indexOf(strBrowserName) != -1)
	{
		booBrowserFound = true;
	}
	return booBrowserFound;
}
function DodajUFavorite()
{
	if (IsBrowser("MSIE"))
	{
		var siteurl = ("http://www.tportal.hr/");
		var sitetext = ("tportal.hr");
		window.external.AddFavorite(siteurl, sitetext);
	}
	else if (IsBrowser("Opera") || IsBrowser("Firefox"))
	{
		alert(
		"Vaš internet preglednik ne podržava ovu radnju.\n\n"
		+ "---- Korisnici Firefox internet preglednika ----\n"
		+ "Kliknite na \"Bookmarks\", a zatim na \"Bookmark This Page\"  ili pritisnite tipke \"Ctrl+D\" na Vašoj tipkovnici za dodavanje tportal.hr u Vaše favorite. \n"
		+ "---------------------------------------------------------------------------------\n\n"
		+ "---- Korisnici Opera internet preglednika ----\n"
		+ "Kliknite na \"Bookmarks\", a zatim na \"Bookmark page...\" ili pritisnite tipke \"Ctrl+T\" na Vašoj tipkovnici za dodavanje tportal.hr u Vaše favorite. \n\n"
		+ "* Vaš tportal.hr *"
		);
	}
}
function PostaviZaPocetnu(pocetna)
{
	if (IsBrowser("MSIE"))
	{
		pocetna.style.behavior = 'url(#default#homepage)';
		pocetna.setHomePage('http://www.tportal.hr/');
	}
	else if (IsBrowser("Opera") || IsBrowser("Firefox"))
	{
		alert(
		"Vaš internet preglednik ne podržava ovu radnju.\n\n"
		+ "---- Korisnici Firefox internet preglednika ----\n"
		+ "Kliknite na \"Tools\", a zatim na \"Options\"  i unutar otvorenog prozora kliknite na \"General\", a zatim na \"Use Current Page\" za postavljanje tportal.hr kao Vaše početne stranice. \n"
		+ "---------------------------------------------------------------------------------\n\n"
		+ "---- Korisnici Opera internet preglednika ----\n"
		+ "Kliknite na \"Tools\", a zatim na \"Preferences...\" i unutar otvorenog prozora kliknite na \"General\", a zatim na \"Use current\" za postavljanje tportal.hr kao Vaše početne stranice. \n\n"
		+ "* Vaš tportal.hr *"
		);
	}
}


/* Video counter */
// counter / video
var timerRunning = false;
var timerID;
var endTime;

function stopClock()
{
	if (timerRunning) clearTimeout(timerID);
	timerRunning = false;
}

function startClock()
{
	jQuery("#videoCounter").show();
	jQuery("#videoCounter").prev().hide();
	//jQuery("div.counter").hide();
	stopClock();
	showTime();
}

function endDateStringToDate(endDateString)
{
	var endDate;
	edsSplit = endDateString.split("-");
	if (edsSplit.length == 5)
	{
		endDate = new Date(edsSplit[0], edsSplit[1] - 1, edsSplit[2], edsSplit[3], edsSplit[4], 0, 0);
	} else
	{
		endDate = new Date();
	}
	return endDate;
}

function showTime()
{
	var today = new Date();
	var Expire = (endTime.getTime() - today.getTime());

	secsPerDay = 1000;
	minPerDay = 60 * 1000;
	hoursPerDay = 60 * 60 * 1000;
	PerDay = 24 * 60 * 60 * 1000;


	/*Seconds*/
	secsLeft = (endTime.getTime() - today.getTime()) / minPerDay;
	secsRound = Math.round(secsLeft);
	secsRemain = secsLeft - secsRound;
	secsRemain = (secsRemain < 0) ? secsRemain = 60 - ((secsRound - secsLeft) * 60) : secsRemain = (secsLeft - secsRound) * 60;
	secsRemain = Math.round(secsRemain);

	/*Minutes*/
	minLeft = ((endTime.getTime() - today.getTime()) / hoursPerDay);
	minRound = Math.round(minLeft);
	minRemain = minLeft - minRound;
	minRemain = (minRemain < 0) ? minRemain = 60 - ((minRound - minLeft) * 60) : minRemain = ((minLeft - minRound) * 60);
	minRemain = Math.round(minRemain - 0.495);


	/*Hours*/
	hoursLeft = ((endTime.getTime() - today.getTime()) / PerDay);
	hoursRound = Math.round(hoursLeft);
	hoursRemain = hoursLeft - hoursRound;
	hoursRemain = (hoursRemain < 0) ? hoursRemain = 24 - ((hoursRound - hoursLeft) * 24) : hoursRemain = ((hoursLeft - hoursRound) * 24);
	hoursRemain = Math.round(hoursRemain - 0.5);

	/*Days*/
	//	daysLeft = ((endTime.getTime() - today.getTime()) / PerDay);
	//	daysRound = Math.round(daysLeft);
	//	daysRemain = daysRound;


	daysLeft = ((endTime.getTime() - today.getTime()) / PerDay);

	if (daysLeft >= 1)
	{
		daysRound = Math.round(daysLeft);
		daysRemain = daysRound;
	} else
	{
		daysRemain = 0;
	}


	/* Add days to hours */
	hoursRemain = (daysRemain * 24) + hoursRemain;

	timeRemain = hoursRemain + ":" + (minRemain < 10 ? "0" + minRemain : minRemain) + ":" + (secsRemain < 10 ? "0" + secsRemain : secsRemain);
	jQuery("#videoCounter > p").text(timeRemain);

	timerID = setTimeout("showTime()", 1000);
	timerRunning = true;

	if (Expire <= 0)
	{
		jQuery("#videoCounter").hide();
		jQuery("#videoCounter").prev().show();
		//jQuery("div.counter").show();
		stopClock();
	}
}

///* Trigger start */
//jQuery(document).ready(function() {
//	endTime = endDateStringToDate(jQuery("span.videoCounterEndTime").text());
//	startClock();
//});

/* Cookie Handling */
function createCookie(name, value, days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++)
	{
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name)
{ createCookie(name, "", -1); }



/* Article, increase/decrease font size */
function changeFontSize(idDiv1, idDiv2, sizeChange, div1LineHeightDiff, div2LineHeightDiff, cookie1, cookie2) {

	var div1 = jQuery('.' + idDiv1);
	var div2 = jQuery('.' + idDiv2);

	var currSize1 = parseFloat(jQuery(div1).css('fontSize'), 17);
	var currSize2 = parseFloat(jQuery(div2).css('fontSize'), 12);

	if (sizeChange == 'inc' && currSize1 < 30) {
		jQuery(div1).each(
				function(index) {
					jQuery(this).css('fontSize', currSize1 + 1 + 'px');
					jQuery(this).css('lineHeight', currSize1 + div1LineHeightDiff + 1 + 'px');
					
					jQuery(this).children('a').each(
						function(index) {
							jQuery(this).css('fontSize', currSize1 + 1 + 'px');
							jQuery(this).css('lineHeight', currSize1 + div1LineHeightDiff + 1 + 'px');
					});
				}
			);
		jQuery(div2).each(
				function(index) {
					jQuery(this).css('fontSize', currSize2 + 1 + 'px');
					jQuery(this).css('lineHeight', currSize2 + div2LineHeightDiff + 1 + 'px');
					
					jQuery(this).children('a').each(
						function(index) {
							jQuery(this).css('fontSize', currSize2 + 1 + 'px');
							jQuery(this).css('lineHeight', currSize2 + div2LineHeightDiff + 1 + 'px');
					});
				}
			);

		createCookie(cookie1, currSize1 + 1, 1000);
		createCookie(cookie2, currSize2 + 1, 1000);
	}

	if (sizeChange == 'dec' && currSize1 > 10) {
		jQuery(div1).each(
				function(index) {
					jQuery(this).css('fontSize', currSize1 - 1 + 'px');
					jQuery(this).css('lineHeight', currSize1 + div1LineHeightDiff - 1 + 'px');
					
					jQuery(this).children('a').each(
						function(index) {
							jQuery(this).css('fontSize', currSize1 - 1 + 'px');
							jQuery(this).css('lineHeight', currSize1 + div1LineHeightDiff - 1 + 'px');
					});
				}
			);
		jQuery(div2).each(
				function(index) {
					jQuery(this).css('fontSize', currSize2 - 1 + 'px');
					jQuery(this).css('lineHeight', currSize2 + div2LineHeightDiff - 1 + 'px');
					
					jQuery(this).children('a').each(
						function(index) {
							jQuery(this).css('fontSize', currSize2 - 1 + 'px');
							jQuery(this).css('lineHeight', currSize2 + div2LineHeightDiff - 1 + 'px');
					});
				}
			);

		createCookie(cookie1, currSize1 - 1, 1000);
		createCookie(cookie2, currSize2 - 1, 1000);
	}
}


function setFontSize(idDiv1, idDiv2, div1LineHeightDiff, div2LineHeightDiff, cookie1, cookie2)
{
	var div1 = jQuery('.' + idDiv1);
	var div2 = jQuery('.' + idDiv2);

	var currSize1 = parseFloat(readCookie(cookie1), 17);
	var currSize2 = parseFloat(readCookie(cookie2), 12);

	if (!isNaN(currSize1))
	{
		jQuery(div1).each(function(index){
			jQuery(this).css('fontSize', currSize1 + 'px');
			jQuery(this).css('lineHeight', currSize1 + div1LineHeightDiff + 'px');
		});
	}


	if (!isNaN(currSize2))
	{
		jQuery(div2).each(function(index){
			jQuery(this).css('fontSize', currSize2 + 'px');
			jQuery(this).css('lineHeight', currSize2 + div2LineHeightDiff + 'px');
		});
	}
}



// IE9 specific functions
function onIe9ButtonClicked(btn) {
	switch (btn.buttonID) {
		case btnTelImenik:
			hideIe9Buttons();
			window.location = 'http://imenik.tportal.hr/';
			break;
		case btnWebmail:
			hideIe9Buttons();
			window.location = 'http://komunikator.tportal.hr/';
			break;
		case btnMAXzona:
			hideIe9Buttons();
			window.location = 'http://max.tportal.hr/';
			break;
		case btnMAXtv:
			hideIe9Buttons();
			window.location = 'http://maxtv.tportal.hr/';
			break;
		case btnPlaytoy:
			hideIe9Buttons();
			window.location = 'http://playtoy.tportal.hr/';
			break;
	}
}

function hideIe9Buttons() {
	window.external.msSiteModeUpdateThumbBarButton(btnTelImenik, true, false);
	window.external.msSiteModeUpdateThumbBarButton(btnWebmail, true, false);
	window.external.msSiteModeUpdateThumbBarButton(btnMAXzona, true, false);
	window.external.msSiteModeUpdateThumbBarButton(btnMAXtv, true, false);
	window.external.msSiteModeUpdateThumbBarButton(btnPlaytoy, true, false);
}

function setOverlayIcon(iconUri, descText) {
	try {
		if (window.external.msIsSiteMode()) {
			window.external.msSiteModeSetIconOverlay(iconUri, descText);
		}
	}
	catch (e) {
		// Fail silently.
	}
}

function clearOverlayIcon() {
	try {
		if (window.external.msIsSiteMode()) {
			window.external.msSiteModeClearIconOverlay();
		}
	}
	catch (e) {
		// Fail silently.
	}
}


// This Variable defines event tracking page
// Variable is page specific should be defined on page
//var trackEventPage = "/trackEventPage.htm";

// Event tracking script
function trackEvent(sSource, sEvent) {
	// Add to location
	try {
		// Create Hash
		var eventDesc = '#';
		eventDesc += sSource ? sSource : 'event';
		eventDesc += sEvent ? ',' + sEvent : '';
		window.location.hash = eventDesc;
	}
	catch (e) { }

	// Check do we have URL for event tracking
	if ('undefined' == typeof (trackEventPage)) {
		// Track google
		try {
			if ('undefined' != typeof (_gaq))
			{ _gaq.push(['_trackPageview']); }
		}
		catch (e) { }

		// Track gemius
		try {
			if ('undefined' != typeof (pp_gemius_identifier)
			&& 'undefined' != typeof (window.pp_gemius_params)) {
				// Recalc params for new url
				pp_gemius_identifier = pp_gemius_identifier.replace('USED_', '');
				pp_gemius_sv = 30;
				window.pp_gemius_params = gemius_parameters();
				// Trigger new stat
				window.pp_gemius_image = new Image();
				window.pp_gemius_image.src = pp_gemius_host + (new Date()).getTime() + '/rexdot.gif?l=' + pp_gemius_sv.toString() + '&id=' + pp_gemius_identifier + window.pp_gemius_time_id + window.pp_gemius_params;
			}
		}
		catch (e) { }
	}
	else {
		try {
			// Add an iframe for event tracking
			if (0 == jQuery("#trackEventIframe").length) {
				jQuery("body").append("<iframe id=\"trackEventIframe\" name=\"trackEventIframe\" height=\"1\" frameBorder=\"0\" scrolling=\"No\"></iframe>");
				// Track event using specific page
				jQuery("#trackEventIframe").attr('src', trackEventPage + window.location.hash);
			}
			else {
				// Track event using specific page
				jQuery("#trackEventIframe").attr('src', trackEventPage + window.location.hash);
				window.frames["trackEventIframe"].location.reload();
			}
		}
		catch (e) { }
	}
}
