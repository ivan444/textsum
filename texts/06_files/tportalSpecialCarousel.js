/// <reference path="jquery-1.2.6.js" />
(function($) {
	// Define Object
	$.fn.tportalSpecialCarousel2 = function(options) {
		// Default object varibles
		var defaults = {
			tabNames: new Array(),
			tabData: new Array(),
			tabCss: new Array(),
			tabContainerId: '',
			selectedTab: 0,
			tabCount: 1,

			currPos: 0,
			itemsCount: 0,
			slideCss: 'articles',
			slideItemCss: 'art',
			slideLeftCss: 'left',
			slideRightCss: 'right',
			thumbsCss: 'articlesThumbs',
			thumbsItemCss: 'art',
			thumbsLinkCss: 'thumbImg',
			
			

			slideItemImgCss: 'img',
			slideItemNavCss: 'ljepotaLightbox-nav',

			dataCss: 'articleData',
			dataItemCss: 'art',
			dataArtThumbs: 'articlesThumbs',

			navPrevCss: 'ljepotaPrev',
			navNextCss: 'ljepotaNext',


			autoSlide: false,
			autoSlidePause: false,
			autoSlideTimeout: 5000,
			autoSideTimer: null,
			sliding: false
		};

		// Object options
		var options = $.extend(defaults, options);

		// SlideTo Method
		function SlideTo(carousel, position) {
			// Exit if allready sliding
			if (options.sliding)
			{ return; }

			// AutoSlideStop(carousel);

			var newImg = GetMainImg(position, carousel).clone();
			var newDescription = GetMainDescription(position, carousel).clone();

			var s = jQuery('.' + options.slideCss + ' > .' + options.slideItemCss, carousel);

			options.sliding = true;

			var imgPlaceholder = jQuery('div.img', s);

			jQuery(imgPlaceholder).fadeOut('fast', function() {
				imgPlaceholder.replaceWith(newImg);
				jQuery('div.img', s).fadeIn('normal', function() {
					jQuery('div.description', s).replaceWith(newDescription);
					options.currPos = position;
					SlideFinished(carousel);
				});
			});
		}

		function SlideFinished(carousel) {
			// Display Page
			SetMainNavigation(carousel);
			MarkSelectedThumb(carousel);
			// Mark Sliding finished
			options.sliding = false;
		}



		function TabClicked(tabIndex, carousel) {
			// set new Data, if new Tab is selected
			if (tabIndex != options.selectedTab) {
				options.selectedTab = tabIndex;

			}
		}

		function SetNewDataContainer(carousel) {
			options.dataCss = options.tabData[options.selectedTab];
			SetElementCount(carousel);
			//SetEvents(carousel)
		}

		function CreateTabs(carousel) {
			var tabPlaceholder = jQuery('#' + options.tabContainerId);
			var tabElement;

			var i = 0;
			options.tabCount = options.tabNames.length;
			tabElement = '';
			for (i = 0; i < options.tabCount; i++) {
				tabElement += '<a class="' + options.tabCss[i] + '" id="' + options.tabContainerId + '_' + i + '" href="javascript:void(0);"><span>' + options.tabNames[i] + '</span></a>';
			}
			jQuery(tabPlaceholder).append(tabElement);

			MarkSelectedTab(carousel);

			// setActiveTab
			SetNewDataContainer(carousel);

			// Add click events
			jQuery('a', tabPlaceholder).each(
				function(i) {
					// Tab Click event handler
					jQuery(this).click(function() {
						options.selectedTab = i;
						MarkSelectedTab(carousel);
						options.currPos = 0;
						SetNewDataContainer(carousel);
						SetEvents(carousel);
					});
				}
			);
		}

		function MarkSelectedTab(carousel) {
			var tabPlaceholder = jQuery('#' + options.tabContainerId);


			jQuery('a', tabPlaceholder).each(
				function(i) {
					if (options.selectedTab == i)
					{ jQuery(this).addClass('sel'); }
					else
					{ jQuery(this).removeClass('sel'); }
				}
			);
		}


		function MarkSelectedThumb(carousel) {
			var s = jQuery('.' + options.slideCss, carousel);
			var ctrl = jQuery('.' + options.thumbsCss, carousel);

			jQuery('div.' + options.thumbsItemCss, ctrl).each(
				function(i) {
					if (options.currPos == i)
					{ jQuery(this).addClass('tSelected'); }
					else
					{ jQuery(this).removeClass('tSelected'); }
				}
			);
		}

		// Modify thumb controls 
		function ModifyThumbControls(carousel) {
			var ctrl = jQuery('.' + options.thumbsCss + ' > .' + options.thumbsItemCss, carousel);

			// Add click events
			jQuery('a.' + options.thumbsLinkCss, ctrl).each(
				function(i) {
					// Page Click event handler
					jQuery(this).click(function() { SlideTo(carousel, i); });
				}
			);
		}

		function SetMainNavigation(carousel) {
			var ctrl = jQuery('.' + options.slideCss + ' > .' + options.slideItemCss, carousel);
			var imgPlaceholder = jQuery('div.img', ctrl);
			var navElement;

			// set numbering
			navElement = '<span class="position">' + (options.currPos + 1) + '/' + options.itemsCount + '</span>';


			navElement += '<div class="ljepotaLightbox-nav" style="display:block">';
			if (options.currPos == 0) {
				navElement += '  <a class="ljepotaPrevNone" href="javascript:void(0);"></a>';
			} else {
				navElement += '  <a class="ljepotaPrev" href="javascript:void(0);"></a>';
			}
			if (options.currPos == (options.itemsCount - 1)) {
				navElement += '  <a class="ljepotaNextNone" href="javascript:void(0);"></a>';
			} else {
				navElement += '  <a class="ljepotaNext" href="javascript:void(0);"></a>';
			}
			navElement += '</div>';

			jQuery(imgPlaceholder).append(navElement);

			// attach events
			if (options.currPos == 0) {
			} else {
				jQuery('.ljepotaPrev', imgPlaceholder).click(function() { SlideTo(carousel, (options.currPos - 1)); });
			}
			if (options.currPos == (options.itemsCount - 1)) {
			} else {
				jQuery('.ljepotaNext', imgPlaceholder).click(function() { SlideTo(carousel, (options.currPos + 1)); });
			}

		}


		/* create thumbs */
		function CreateThumbs(carousel) {
			var ctrl = jQuery('.' + options.thumbsCss, carousel);
			
			var dataCtrl = jQuery('#' + options.dataCss);
			var dataCtrlThumbs = jQuery('.' + options.dataArtThumbs, dataCtrl);
			

			//var elem;
			var thumbElement;
			jQuery(ctrl).empty();


			jQuery(ctrl).replaceWith(dataCtrlThumbs.clone());
		}

		// Initial show Method
		function ShowMain(position, carousel) {
			// AutoSlideStop(carousel);
			var newImg = GetMainImg(position, carousel).clone();
			var newDescription = GetMainDescription(position, carousel).clone();

			var s = jQuery('.' + options.slideCss + ' > .' + options.slideItemCss, carousel);

			options.sliding = true;

			var imgPlaceholder = jQuery('div.img', s);

			imgPlaceholder.replaceWith(newImg);
			jQuery('div.description', s).replaceWith(newDescription);
			options.currPos = position;
			SlideFinished(carousel);
		}

		function GetMainImg(position, carousel) {
			var item = GetElement(position, carousel);
			return jQuery('.img', item);
		}

		function GetMainDescription(position, carousel) {
			var item = GetElement(position, carousel);
			return jQuery('.description', item);
		}

		// Get element on required position
		function GetElement(position, carousel) {
			var ctrl = jQuery('#' + options.dataCss);
			var elem = jQuery('div.' + options.dataItemCss + ':eq(' + position + ')', ctrl);
			return elem;
		}

		// Get element count
		function SetElementCount(carousel) {
			var ctrl = jQuery('#' + options.dataCss);
			options.itemsCount = jQuery('div.' + options.dataArtThumbs + ' > div.' + options.dataItemCss, ctrl).size();
		}



		// Attach carousel events
		function SetEvents(carousel) {
			SetElementCount(carousel);

			ShowMain(options.currPos, carousel);
			CreateThumbs(carousel);
			MarkSelectedThumb(carousel);
			ModifyThumbControls(carousel);
			//AutoSlideStart(carousel);
		}


		// Apply plugin to all objects
		return this.each(
			function(i) {
				// Execute this code for all objects selected by jQuery
				CreateTabs(jQuery(this));
				SetEvents(jQuery(this));
			}
		);

	}

})(jQuery);


/*  VIŠAK!!!



// Start Slide Method
		function StartSlide(carousel, direction) {
			// Exit if allready sliding
			if (options.sliding)
			{ return; }

			var s = jQuery('.' + options.slideCss, carousel);
			var mL = parseInt(s.css('margin-left'));

			if (isNaN(mL))
			{ mL = 0; }

			switch (direction) {
				case 'right':
					mL -= (options.carouselWidth + options.carouselWidthCorrection);

					if (mL <= -s.width())
					{ mL = 0; }
					break;

				case 'left':
					mL += (options.carouselWidth + options.carouselWidthCorrection);

					if (mL >= (options.carouselWidth + options.carouselWidthCorrection))
					{ mL = -(s.width() - (options.carouselWidth + options.carouselWidthCorrection)); }
					break;
			}

			options.sliding = true;

			s.animate(
				{ marginLeft: mL + 'px' },
				'normal', 'swing',
				function() { SlideFinished(carousel); }
			);
		}


// Auto Side
function AutoSlideStart(carousel) {
// Check is auto slide
if (!options.autoSlide)
{ return; }

// Create and store timer
options.autoSideTimer = setTimeout(
function() {
StartSlide(carousel, 'right');
AutoSlideStart(carousel);
},
options.autoSlideTimeout
);
}



function AutoSlideStop(carousel) {
if (null != options.autoSideTimer) {
clearTimeout(options.autoSideTimer);
options.autoSideTimer = null;
}

if (!options.autoSlidePause)
{ options.autoSlide = false; }
}

*/