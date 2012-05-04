/// <reference path="jquery-1.2.6.js" />
(function($)
{
	// Define Object
	$.fn.tportalCarousel = function(options)
	{
		// Default object varibles
		var defaults = {
			carouselWidth: 610,
			carouselWidthCorrection: 0,
			slideCss: 'articles',
			slideItemCss: 'art',
			slideLeftCss: 'left',
			slideRightCss: 'right',
			navControlsCss: 'nav',
			navControlsAddPages: true,
			navControlsPagesCss: 'page',
			autoSlide: false,
			autoSlidePause: false,
			autoSlideTimeout: 5000,
			autoSideTimer: null,
			sliding: false
		};

		// Object options
		var options = $.extend(defaults, options);

		// Start Slide Method
		function StartSlide(carousel, direction)
		{
			// Exit if allready sliding
			if (options.sliding)
			{ return; }

			var s = jQuery('.' + options.slideCss, carousel);
			var mL = parseInt(s.css('margin-left'));

			switch (direction)
			{
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

		// SlideTo Method
		function SlideTo(carousel, position)
		{
			// Exit if allready sliding
			if (options.sliding)
			{ return; }

			AutoSlideStop(carousel);

			var s = jQuery('.' + options.slideCss, carousel);
			var mL = position * -(options.carouselWidth + options.carouselWidthCorrection);

			options.sliding = true;

			s.animate(
				{ marginLeft: mL + 'px' },
				'normal', 'swing',
				function() { SlideFinished(carousel); }
			);
		}

		function SlideFinished(carousel)
		{
			// Display Page
			MarkSelectedPage(carousel);
			// Mark Sliding finished
			options.sliding = false;
		}

		function MarkSelectedPage(carousel)
		{
			var s = jQuery('.' + options.slideCss, carousel);
			var ctrl = jQuery('.' + options.navControlsCss, carousel);

			var mL = parseInt(s.css('margin-left'));
			mL = mL / -(options.carouselWidth + options.carouselWidthCorrection);

			jQuery('a.' + options.navControlsPagesCss, ctrl).each(
				function(i)
				{
					if (mL == i)
					{ jQuery(this).attr('id', 'sel'); }
					else
					{ jQuery(this).removeAttr('id'); }
				}
			);
		}

		// Auto Side
		function AutoSlideStart(carousel)
		{
			// Check is auto slide
			if (!options.autoSlide)
			{ return; }

			// Create and store timer
			options.autoSideTimer = setTimeout(
					function()
					{
						StartSlide(carousel, 'right');
						AutoSlideStart(carousel);
					},
					options.autoSlideTimeout
				);
		}

		function AutoSlideStop(carousel)
		{
			if (null != options.autoSideTimer)
			{
				clearTimeout(options.autoSideTimer);
				options.autoSideTimer = null;
			}

			if (!options.autoSlidePause)
			{ options.autoSlide = false; }
		}

		// Adjjust slider width depending on No items in carousel
		function AdjustInnerWidth(carousel)
		{
			var s = jQuery('.' + options.slideCss, carousel);

			// Compute Total Width
			var totalWidth = 0;
			jQuery('.' + options.slideItemCss, carousel).each(
				function(i)
				{
					var pg = jQuery(this);
					totalWidth += pg.width();
					totalWidth += parseInt(pg.css('margin-left'));
					totalWidth += parseInt(pg.css('margin-right'));
				}
			);

			// Set Total Width
			s.width(totalWidth);
		}

		// Append page controls 
		function CreatePageControls(carousel)
		{
			// Exit if no need for controls
			if (!options.navControlsAddPages)
			{ return; }

			var s = jQuery('.' + options.slideCss, carousel);
			var ctrl = jQuery('.' + options.navControlsCss, carousel);
			var pages = Math.round(s.width() / (options.carouselWidth + options.carouselWidthCorrection));

			// Create pages
			for (i = pages - 1; i >= 0; i--)
			{
				//ctrl.prepend('<a class="' + options.navControlsPagesCss + '">a</a>');
				ctrl.prepend('<a class="' + options.navControlsPagesCss + ' pg' + (i + 1) + '"></a>');
			}

			// Add click events
			jQuery('a.' + options.navControlsPagesCss, ctrl).each(
				function(i)
				{
					// Page Click event handler
					jQuery(this).click(function() { SlideTo(carousel, i); });
				}
			);
		}

		// Attach carousel events
		function SetEvents(carousel)
		{
			// Slide Left
			var btnLeft = jQuery('.' + options.slideLeftCss, carousel);
			btnLeft.click(
				function()
				{
					AutoSlideStop(carousel);
					StartSlide(carousel, 'left');
				}
			);

			// Slide Right
			var btnRight = jQuery('.' + options.slideRightCss, carousel);
			btnRight.click(
				function()
				{
					AutoSlideStop(carousel);
					StartSlide(carousel, 'right');
				}
			);

			// Slider
			var s = jQuery('.' + options.slideCss, carousel);
			s.hover(
				function()
				{
					options.autoSlidePause = true;
					AutoSlideStop(carousel);
				},
				function()
				{
					options.autoSlidePause = false;
					AutoSlideStart(carousel);
				}
			);

			AdjustInnerWidth(carousel);
			CreatePageControls(carousel);
			MarkSelectedPage(carousel);
			AutoSlideStart(carousel);
		}


		// Apply plugin to all objects
		return this.each(
			function(i)
			{
				// Execute this code for all objects selected by jQuery
				SetEvents(jQuery(this));
			}
		);

	}

})(jQuery);
