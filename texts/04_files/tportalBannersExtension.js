/// <reference path="jquery-1.2.6.js" />

// Replace Page Logo
function tpReplacePageLogo(newLogoUrl)
{
	jQuery("div.strNaslovwrapper>img").attr("src", newLogoUrl);
	jQuery("div.strNaslovwrapper>a>img").attr("src", newLogoUrl);
}

// Homepage Large Banner Open/Close
function tpHomeLargeBannerOpen(openSpeed)
{
	// Get Banner to Display
	var oBanner = jQuery(".homeSlideOpenBanner");

	// Hide Flash and Select before JS Anim
	jQuery('embed, object, select', oBanner).css({ 'visibility': 'hidden' });

	// Move Banner before Main Menu
	jQuery(".mainMenuwrapper").before(oBanner);
	
	// Show Banner by Sliding Down
	oBanner.slideDown(
		'undefined' != typeof(openSpeed) ? openSpeed : 'fast',
		function()
		{
			// Display Flash again
			jQuery('embed, object, select', oBanner).css({ 'visibility': 'visible' });
		}
	);
}

function tpHomeLargeBannerClose(domRemove)
{
	// Close Banner / Remove From Dom After
	var oBanner = jQuery(".homeSlideOpenBanner");

	// Hide Flash and Select before JS Anim
	jQuery('embed, object, select', oBanner).css({ 'visibility': 'hidden' });

	// Hide Area	
	jQuery(".homeSlideOpenBanner").slideUp(
		'fast',
		function() 
		{
			if (domRemove)
			{	jQuery(this).remove();	}
			else
			{
				// Display Flash again
				jQuery('embed, object, select', oBanner).css({ 'visibility': 'visible' });
			}
		}
	);
}

// Tower Banner Open / Close
function tpTowerBannerOpen(widthOpen, heightOpen)
{
	tpBannerResize(jQuery(".towerBannerExpand"), widthOpen, heightOpen);
}

function tpTowerBannerClose(widthClose, heightClose)
{
	tpBannerResize(jQuery(".towerBannerExpand"), widthClose, heightClose);
}

function tpTowerBannerCose(widthClose,heightClose)
{
	tpBannerResize(jQuery(".towerBannerExpand"), widthClose, heightClose);
}

function tpBannerResize(bannerContainer, w, h)
{
	// Adjust Container Size
	bannerContainer.find("div").css(
		{ 'width': w + 'px', 'height': h + 'px', 'text-align' : 'right' }
	);

	// Adjust Flash Size
	bannerContainer.find("div").find("object").attr(
		{ width: w, height: h }
	);

	bannerContainer.find("div").find("object").find("embed").attr(
		{ width: w, height: h }
	);
}