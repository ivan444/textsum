/// <reference path="jquery-1.2.6.js" />
(function($)
{
	// Define Object
	$.fn.tportalTabControl = function(options)
	{
		// Default object varibles
		var defaults = {
			tabsCss: 'tabs',
			tabItemCss: 'tabItem',
			tabSelectedCss: 'sel',
			tabItemUrlSlector: 'div.txt>a.more',
			tabItemNavigateToUrl: true,
			tabChangeUseEffect: false,
			tabSelectedIndex: 0,
			autoChange: false,
			autoChangePause: false,
			autoChangeTimeout: 5000,
			autoChangeTimer: null
		};

		// Object options
		var options = $.extend(defaults, options);

		function DisplayTab(tabControl, index)
		{
			// Set Correct tab selected
			jQuery('.' + options.tabsCss + '>a', tabControl).each(
				function(i)
				{
					jQuery(this).removeClass(options.tabSelectedCss);
					if (index == i)
					{	jQuery(this).addClass(options.tabSelectedCss);		}
				}
			);
		
			// Display Correct Tab
			jQuery('.' + options.tabItemCss, tabControl).each(
				function(i)
				{
					if(index == i)
					{
						if (options.tabChangeUseEffect)
						{	jQuery(this).fadeIn();	}
						else
						{	jQuery(this).show();	}
					}
					else
					{
						if (options.tabChangeUseEffect)
						{
							if(jQuery(this).is(':visible'))
							{	jQuery(this).fadeOut();		}
						}
						else
						{	jQuery(this).hide();	}
					}
				}
			);
		}

		function DisplayNextItem(tabControl)
		{
			// Remove timeout
			clearTimeout(options.autoChangeTimer);

			// Check if paused
			if (options.autoChangePause)
			{
				// Restart Changing
				AutoChangeStart(tabControl);

				// Skip Tab Change if paused
				return;	
			}

			var noTabs = jQuery('.' + options.tabItemCss).length;
			var currentTab = 0;

			// Find selected tab
			jQuery('.' + options.tabItemCss, tabControl).each(
				function(i)
				{
					if (jQuery(this).is(':visible'))
					{	currentTab = i;	}
				}
			);

			// Next tab
			currentTab ++;
			
			// Check if out of bounds
			if(currentTab >= noTabs)
			{	currentTab = 0;		}
			
			// Display tab
			DisplayTab(tabControl, currentTab);

			// Continue Changing tabs
			AutoChangeStart(tabControl);
		}

		function AutoChangeStart(tabControl)
		{
			// Exit if Auto change
			if(!options.autoChange)
			{	return;	}

			// Create and store timer
			options.autoChangeTimer = setTimeout(
				function()
				{	DisplayNextItem(tabControl);	},
				options.autoChangeTimeout
			);
		}

		// Attach tab control events
		function SetEvents(tabControl)
		{
			// Display First
			DisplayTab(tabControl, options.tabSelectedIndex);
			
			// Set tab click events
			jQuery('.' + options.tabsCss + '>a', tabControl).each(
				function(i)
				{
					jQuery(this).click(
						function() 
						{
							DisplayTab(tabControl,i);
							options.autoChange = false;
							if (options.autoChangeTimer)
							{
								// Remove timeout
								clearTimeout(options.autoChangeTimer);
							}
						}
					);
				}
			);

			// Check should we set click on itemsđ
			if (options.tabItemNavigateToUrl && 0 < options.tabItemUrlSlector.length)
			{
				jQuery('.' + options.tabItemCss, tabControl).each(
					function(i)
					{
						var t = jQuery(this);
						var h = jQuery(options.tabItemUrlSlector,t).attr('href');
						t.click(
							function()	{	location = h;	}
						);
					}
				);
			}

			// Exit if Auto change
			if (!options.autoChange)
			{ return; }

			// Set Auto Change pause when mouse over tab item
			jQuery('.' + options.tabItemCss, tabControl).mouseover(
				function()
				{
					if(options.autoChange)
					{	options.autoChangePause = true;	}
				}
			);

			jQuery('.' + options.tabItemCss, tabControl).mouseout(
				function()
				{
					if (options.autoChange)
					{ options.autoChangePause = false; }
				}
			);
			
			// Start Auto Change
			AutoChangeStart(tabControl);
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
