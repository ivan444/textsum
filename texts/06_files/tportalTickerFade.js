// Fader kontrola za vruce vijesti
var tickerElement;
var dok;
var vijest = 0;
var faderTimeout;

function faderStart(linkID, timeout)
{
	try {
		//dok = window.document;
		tickerElement = $('#' + linkID); //dok.getElementById(linkID);

		if (typewritterArray.length > vijest) {
			faderTimeout = setTimeout("$(tickerElement).attr('href', typewritterArray[vijest][1]);faderWrite('" + linkID + "');", timeout);
		}
	}
	catch (err) {}
}

function faderWrite(linkID) {
	try {
		//$('#' + linkID).fadeOut(500, function() {
		$(tickerElement).fadeOut(500, function() {
			$(this).html(typewritterArray[vijest][0]);
			$(this).fadeIn(200, function() {
				clearTimeout(faderTimeout);
				vijest++;
				if (typewritterArray.length == vijest) {
					vijest = 0;
				}
				faderStart(linkID, 4000);

			});
		});
	}
	catch (err) { }
}




function tickerUpDown(linkID, upDown)
{
	try
	{
		clearTimeout(faderTimeout);
		if (upDown == "Up")
		{
			vijest--;
			if (vijest < 0) {
				vijest = typewritterArray.length - 1;
			}
			vijest--;
			if (vijest < 0) {
				vijest = typewritterArray.length - 1;
			}
		}
		else {
			if (typewritterArray.length == vijest) {
				vijest = 0;
			}
		}
		
		if (typewritterArray.length > vijest) {
			$(tickerElement).attr('href', typewritterArray[vijest][1]);
			faderWrite(linkID);
		}
	}
	catch (err) {}
}
