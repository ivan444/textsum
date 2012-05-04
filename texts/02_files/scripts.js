jQuery(document).ready(function($){
    jQuery("a.iframe").fancybox({
		'width':400,
		'height':200
	});
	jQuery('#cityList').cycle({ 
		fx:     'fade', 
		timeout: 6000, 
		delay:  -2000 
	});
	jQuery('a[class=gotoTop]').click(function(){
        jQuery('html, body').animate({scrollTop:0}, 'slow');
        return false;
    });
});