jQuery.noConflict();

(function($) {

	$(function() {
		$(".BezOkvira .shadetabs").after('<div class="TitleLeft"> </div><div class="TitleRight"> </div>');
		$(".shadetabs li:last-child")
			.addClass("last")
			.css({background: 'none'});
	});
	
	/* offerdetails slide */
	
	$(function() {
		$(".OfferDetailsSlideshow").each(function() {
			var maxHeight = 0;
			$(this).find(".SlideshowItemWrapper").each(function(i, e) {
				var height = $(e).show().outerHeight();
				
				$(e).hide();
				
				if (height > maxHeight)
					maxHeight = height;
			});

			$(this).find(".SlideshowItemWrapper").each(function(i, e) {
				$(e).height(maxHeight);
			});		

		
			$(this)
				.animate({
					height: maxHeight
				}, function() {
					if (jQuery.browser.msie && jQuery.browser.version == '7.0') {
						jQuery(".BorderBottom").css({bottom: 0});
						jQuery(".BorderLeft, .BorderRight").css({height: '100%'});
					}					
				})
				.data("active", -1)
				.fadeshow();
				
		});
	});
	
	jQuery.fn.fadeshow = function () {
		$(this).nextSlide();		
	}
	
	jQuery.fn.nextSlide = function () {
		var activeSlide = $(this).data("active");
		
		if (activeSlide >= 0) {
			$(this)
				.find(".SlideshowItemWrapper:nth-child(" + (activeSlide + 1) + ")")
					.fadeOut();
		}
		activeSlide = (activeSlide + 1) % $(this).find(".SlideshowItemWrapper").length;
		
		var slide = $(this).find(".SlideshowItemWrapper:nth-child(" + (activeSlide + 1) + ")");
		//console.log(activeSlide);
		slide.fadeIn();
				
		if (slide.height() > $(this).height()) {
			$(this).animate({height: slide.height()});
		}
		
		$(this).data("active", activeSlide);
		
		var slideshow = $(this);
		window.setTimeout(function() { jQuery(slideshow).nextSlide(); }, 5000);

	}
	
	/* end offer details slide */
	
	/* makni marginu sa zadnjeg zapisa u modulu sa containerom PlavaPozadina */
	$(function(){
		$(".PlavaPozadina .marginBottom:last").css({marginBottom: 0});
	});
	
	/* napravi lijepi title na slikama */
	/*$(function() {
		$("img[title]")
			.each(function(){
				var $elm = $(this);
				var $desc = $('<div class="image-description"></div>')
					.hide()
					.css({
						position: "absolute",
						padding: "10px",
						background: "#fff",
						color: "#333",
						width: "300px",
						zIndex: 9999,
						boxShadow: "0px 0px 10px rgba(33,33,33,0.6)"
					});
				
				$desc.append(
					$("<div></div>").text($elm.attr("title"))
				);

				$elm.attr("title", "");

				$desc.insertAfter($elm);
				$elm.data("description", $desc);
				$desc.parent().css("position", "relative");
			})
			.hover(
				function() {
					$(this).data("description")
						.stop(true, true)
						.delay(200)
						.fadeIn(300);
				},
				function() {
					$(this).data("description")
						.stop(true, true)
						.delay(200)
						.fadeOut(200)
				}
			)
			.bind("mousemove", function(e) {
				var $desc = $(this).data("description");
				var offsetX = e.offsetX;
				var offsetY = e.offsetY;
						
				if (!offsetX) {
					offsetX = e.layerX;
				}
				if (!offsetY) {
					offsetY = e.layerY;
				}
							
				$desc.css({
					left: offsetX + 15,
					top: offsetY + 15
				});

			});
	});*/
})(jQuery);

/* Sat */
/*	
var sad;
var a;

jQuery(function () {
    sad = new Date(jQuery("#currTime").text().trim());
    jQuery("#currTime").fadeIn();
    showNow();
    window.setInterval('tikTak()',1000);
});

function tikTak()
{
    sad.setSeconds(sad.getSeconds()+1);
    showNow();
}

function showNow()
{
	jQuery("#currTime")
		.text(leadingZero(sad.getDate().toString()) + "." + leadingZero(sad.getMonth().toString()) + "." + sad.getFullYear().toString() + " " +
			leadingZero(sad.getHours().toString()) + ":" +  leadingZero(sad.getMinutes().toString()) + ":" +  leadingZero(sad.getSeconds().toString()))
}

function leadingZero(number) {
    var retNmb = number;
    digits = 2 - number.length;
    for(var i = 0; i < digits;i ++)
        retNmb = "0" + retNmb;
    return retNmb;	
}
jQuery(function() {
	jQuery(".currentTime")
		.mouseenter(function(){
			jQuery(this)
				.stop(true, true)			
				.animate({
					backgroundColor: "#239CD3",
					color: "#ffffff"
				}, 200);
		})
		.mouseleave(function(){
			jQuery(this)
				.stop(true, true)
				.delay(200)			
				.animate({
					backgroundColor: "#FFFFFF",
					color: "#000000"
				}, 500);
		})
		
});
*/

/* end sat */

/* breadcrumb */

jQuery(function() {
	jQuery(".breadcrumbs > li:last-child").addClass("last");
});

/* end breadcrumb */


/* sredi paging articles modula */

(function($){
	$(function() {
		$(".PagingTable tr td:last-child").each(function(){
			var div=$("<div>").append($(this).html());
			div.css({ float: 'right' });
			$(this).prev().append(div).css({ width: 'auto'});
			$(this).remove();

		});
	});
})(jQuery);


// saznaj više na tjednoj analizi
// ideja je dohvatiti sadržaj tekst modula na stranici http://www.banka.hr/Naslovnica/Tjednaanaliza/Saznajvi%C5%A1e.aspx
/*
(function($) {
	$(function() {
		$(".saznaj-vise a.button").click(function() {
			var $button = $(this);
			var $content = $button.siblings(".content");
			var url = $button.attr("href");
			
			if ($content.html().length == 0) {
				// ajax get
				$.ajax({
					url:  url + "?mid=1887&skinsrc=[G]skins/_default/no%20skin&containersrc=[G]containers/_default/no%20container&dnnprintmode=true", 
					success: function(data) {
						var content = $(data).find("#dnn_ctr1887_HtmlModule_lblContent").html();
						$content
							.hide()
							.html(content)
							.slideDown(300);
						$button.remove();
					}
				});
			} 
			return false;
		});
	});
	

})(jQuery);
*/