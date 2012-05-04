var currentTema = 1;
var slideInterval = new Array();

// Tema kontrole i zamjena akvitnih divova i backgrounda 
        function addAtributeToFirstTema()
        {
            try 
            {
                document.getElementById("tema1Wrapper").onmouseover = stopRollover;
            }
            catch(err) {
                alert(err);
            }
        }
        function TemaRollover()
        {
            try {
                var tema = document.getElementById("tema" + currentTema + "Wrapper");
                if (currentTema == 5) currentTema = 0;
                var temaIduca = document.getElementById("tema" + (currentTema + 1) + "Wrapper");
                tema.style.display = "none";
                temaIduca.style.display = "block";
                currentTema++;
                temaPicChange();
            }
            catch (err) {
                alert(err);
            }
               
           
        }
        function goTema(temaNum) {
            try {
                stopRollover();
                if (temaNum == "plus1") {
                    if (currentTema == 5)
                        temaNum = 1;
                    else
                        temaNum = currentTema + 1;
                }
                if (temaNum == "minus1") {
                    if (currentTema == 1)
                        temaNum = 5;
                    else
                        temaNum = currentTema - 1;
                }

                var temaNova = document.getElementById("tema" + temaNum + "Wrapper");
                var temaStara = document.getElementById("tema" + currentTema + "Wrapper");

                temaStara.style.display = "none";
                temaNova.style.display = "block";
                currentTema = temaNum;
                temaPicChange();
            }
            catch (err) {
                alert(err);
            }
            
        }
        
        function temaPicChange()
        {
            try {
                for (i = 1; i < 6; i++) {
                    var trenutniGumb = document.getElementById("temaGumb" + i);

                    if (currentTema > i) {
                        trenutniGumb.style.backgroundPosition = "0px 0px";
                    }
                    if (currentTema == i)
                        trenutniGumb.style.backgroundPosition = "-23px 0px";
                    if (currentTema < i)
                        trenutniGumb.style.backgroundPosition = "-46px 0px";
                }
            }
            catch (err) {
                alert(err);
            }
        }
        
        function stopRollover() {
            try {
                clearInterval(TemaRolloverID);
            }
            catch (err) {
                alert(err);
            }
        }
    
    
    // Slide showtime i slicnih box-ova
      function startSlide(idSlide, smjer, sirinaBoxa, sirinaSlidea, idSlidePosition, speed)
      {
          try {
              if (parseInt(document.getElementById(idSlide).style.marginLeft) > -(sirinaBoxa - sirinaSlidea) && smjer == "right") {
                  clearInterval(slideInterval[arrayMember(idSlide)]);
                  //if(parseInt(document.getElementById(idSlide).style.marginLeft) % sirinaSlidea == 0)
                  setPositionBackground(idSlidePosition, parseInt((parseInt(document.getElementById(idSlide).style.marginLeft) - sirinaSlidea) / -sirinaSlidea) + 1);
                  slideInterval[arrayMember(idSlide)] = setTimeout("slideRight('" + idSlide + "'," + sirinaSlidea + "," + sirinaSlidea + ", " + speed + ")", 10);

              }
              if (parseInt(document.getElementById(idSlide).style.marginLeft) < 0 && smjer == "left") {
                  clearInterval(slideInterval[arrayMember(idSlide)]);
                  //if(parseInt(document.getElementById(idSlide).style.marginLeft) % sirinaSlidea == 0)
                  setPositionBackground(idSlidePosition, parseInt(parseInt(document.getElementById(idSlide).style.marginLeft) / -sirinaSlidea - 0.1) + 1);
                  slideInterval[arrayMember(idSlide)] = setTimeout("slideLeft('" + idSlide + "'," + sirinaSlidea + ", " + speed + ")", 1);
              }
          }
          catch (err) {
          }
      }
      
      function goSlide(idSlide, idSlidePosition, slidePosition, sirinaSlidea, speed) {
          try {
              var slideDiv = document.getElementById(idSlide);
              clearTimeout(slideInterval[arrayMember(idSlide)]);

              if (parseInt(slideDiv.style.marginLeft) > (slidePosition - 1) * -sirinaSlidea) {
                  slideInterval[arrayMember(idSlide)] = setTimeout("slideRight('" + idSlide + "'," + ((slidePosition - 1) * sirinaSlidea) + ", " + sirinaSlidea + ", " + speed + ")", 10);
              }
              if (parseInt(slideDiv.style.marginLeft) < (slidePosition - 1) * -sirinaSlidea) {
                  slideInterval[arrayMember(idSlide)] = setTimeout("slideLeft('" + idSlide + "'," + ((slidePosition - 1) * sirinaSlidea) + ", " + speed + ")", 1);
              }

              setPositionBackground(idSlidePosition, slidePosition);
          }
          catch (err) {
          }
      }
      
      function setPositionBackground(idSlidePosition, slidePosition) {
          try {
              if (document.getElementById(idSlidePosition + "1") != null) {
                  document.getElementById(idSlidePosition + "1").style.backgroundPosition = "-27px 0px";
              }
              if (document.getElementById(idSlidePosition + "2") != null) {
                document.getElementById(idSlidePosition + "2").style.backgroundPosition = "-36px 0px";
              }

              if (document.getElementById(idSlidePosition + "3") != null) {
                  document.getElementById(idSlidePosition + "3").style.backgroundPosition = "-45px 0px";
              }

              if (document.getElementById(idSlidePosition + slidePosition) != null) {
                  document.getElementById(idSlidePosition + slidePosition).style.backgroundPosition = (slidePosition - 1) * -9 + "px 0px";
              }
          }
          catch (err) {
          }
      }
      
      function slideRight(idSlide, slideNumber, sirinaSlidea, speed ) {
          try {
              var slideDiv = document.getElementById(idSlide);

              if (parseInt(slideDiv.style.marginLeft) > (parseInt(slideDiv.style.width) * -1 - sirinaSlidea))
                  slideDiv.style.marginLeft = parseInt(slideDiv.style.marginLeft) - speed + "px";

              if (parseInt(slideDiv.style.marginLeft) % slideNumber != 0)
                  slideInterval[arrayMember(idSlide)] = setTimeout("slideRight('" + idSlide + "'," + slideNumber + ", " + sirinaSlidea + ", " + speed + ")", 50);

              if (parseInt(slideDiv.style.marginLeft) < (parseInt(slideDiv.style.width) * -1 + sirinaSlidea))
                  slideDiv.style.marginLeft = (parseInt(slideDiv.style.width) * -1 + sirinaSlidea) + "px";
          }
          catch (err) {
          }          
                    
            
      }
      
       function slideLeft(idSlide, slideNumber, speed)
      {try {
              var slideDiv = document.getElementById(idSlide);

              if (parseInt(slideDiv.style.marginLeft) < 0)
                  slideDiv.style.marginLeft = parseInt(slideDiv.style.marginLeft) + speed + "px";

              if (parseInt(slideDiv.style.marginLeft) % slideNumber != 0)
                  slideInterval[arrayMember(idSlide)] = setTimeout("slideLeft('" + idSlide + "'," + slideNumber + ", " + speed + ")", 50);


              if (parseInt(slideDiv.style.marginLeft) > 0)
                  slideDiv.style.marginLeft = "0px";

          }
          catch (err) {
          }      
            
      }
      function arrayMember(idSlide) {
          try {
              switch (idSlide) {
                  case "showtimeClanciInnerWrapper":
                      return 0;
                      break;
                  case "igriceSlideWrapper":
                      return 1;
                      break;
                  case "videoSlideWrapper":
                      return 2;
                      break;
                  case "kategorijeSlideInnerWrapper":
                      return 3;
                      break;
              }
          }
          catch (err) {
          }
      }
   
   //Kontrole za izmjenu DIV-ova kod kalendara na prednjoj strani
      
      function kalendar(danID) {

          try {
              for (i = 1; i < 8; i++) {
                  document.getElementById("kalendarDan" + i).style.backgroundPosition = "-38px 0px";
                  if(document.getElementById("kalendarPopisHolder" + i) != null) document.getElementById("kalendarPopisHolder" + i).style.display = "none";
                  document.getElementById("kalendarClanakHolder" + i).style.display = "none";

              }

              document.getElementById("kalendarDan" + danID).style.backgroundPosition = "0px 0px";
              if (document.getElementById("kalendarPopisHolder" + danID) != null) document.getElementById("kalendarPopisHolder" + danID).style.display = "block";
              document.getElementById("kalendarClanakHolder" + danID).style.display = "block";
          }
          catch (err) {
              alert(err);
          }
      }
  
  //Kontrole za tabove
      function changeTab(idTabova, pozicijaAktivnog)
      { 
            for(i=1; i < 50;i++)    
            {   
                try
                {
                    document.getElementById(idTabova + "MiddleWrapper" + i).style.backgroundPosition = "left top";
                    if(pozicijaAktivnog > i)
                    {
                        document.getElementById(idTabova + "LKutWrapper"  + i).style.backgroundPosition = "-0px top";
                        document.getElementById(idTabova + "MiddleWrapper" + i).style.backgroundImage = "url(/WebResources/img/tab_neaktivan_middle.gif)";
                        document.getElementById(idTabova + "MiddleWrapper" + i).style.color = "White";
                        document.getElementById(idTabova + "DKutWrapper" + i).style.backgroundPosition = "-12px top";
                        
                        document.getElementById(idTabova + "Content" + i).style.display = "none";
                    }
                    if(pozicijaAktivnog < i)
                    {
                        document.getElementById(idTabova + "LKutWrapper" + i).style.backgroundPosition = "-8px top";
                        document.getElementById(idTabova + "MiddleWrapper" + i).style.backgroundImage = "url(/WebResources/img/tab_neaktivan_middle.gif)";
                        document.getElementById(idTabova + "MiddleWrapper" + i).style.color = "White";
                        document.getElementById(idTabova + "DKutWrapper" + i).style.backgroundPosition = "-4px top";
                        
                        document.getElementById(idTabova + "Content" + i).style.display = "none";
                    }
                    if(pozicijaAktivnog == i)
                    {   
                        document.getElementById(idTabova + "LKutWrapper" + i).style.backgroundPosition = "-16px top";
                        document.getElementById(idTabova + "MiddleWrapper" + i).style.backgroundImage = "url(/WebResources/img/tab_aktivan_middle.gif)";
                        document.getElementById(idTabova + "MiddleWrapper" + i).style.color = "#2d648a";
                        document.getElementById(idTabova + "DKutWrapper" + i).style.backgroundPosition = "-20px top";
                        
                        document.getElementById(idTabova + "Content" + i).style.display = "block";
                    }
                    
                }
                catch(err)
                {
                    break;
                }
            }
      } //Kontrole za fun tabove
      function funChangeTab(idTabova, pozicijaAktivnog)
      { 
            for(i=1; i < 50;i++)    
            {   
                try
                {
                    if(pozicijaAktivnog != i)
                    {
                    	document.getElementById(idTabova + "Tab" + i).src = "/WebResources/img/fun_tab" + i + "_neaktivan.gif";
                        document.getElementById(idTabova + "Content" + i).style.display = "none";
                    }
                    if(pozicijaAktivnog == i)
                    {
                    	document.getElementById(idTabova + "Tab" + i).src = "/WebResources/img/fun_tab" + i + "_aktivan.gif";
                        document.getElementById(idTabova + "Content" + i).style.display = "block";
                    }
                    
                }
                catch(err)
                {
                    break;
                }
            }
      } 

	//Kontrola za povecavanje fonta u clanku
	function velicinaFonta(idDiv1, idDiv2, velicina) 
	{
		try
        {
            var DivPrvi = document.getElementById(idDiv1);
            var DivDrugi = document.getElementById(idDiv2).childNodes;
            var txtContainer = document.getElementById(idDiv2);

            if (DivPrvi.style.fontSize == "") 
            {
            	DivPrvi.style.fontSize = "18px";
            	txtContainer.style.fontSize = "11px";
            	txtContainer.style.lineHeight = "18px";
            	for (i = 0; i < DivDrugi.length; i++) 
                {
                	if (DivDrugi[i].nodeName == "P" || DivDrugi[i].nodeName == "DIV") 
                    {
                    	DivDrugi[i].style.fontSize = "11px";
                    	DivDrugi[i].style.lineHeight = "18px";
                    }
                }
            }


            if (velicina == "povecaj" && parseInt(DivPrvi.style.fontSize) < 30) 
            {
            	txtContainer.style.fontSize = parseInt(txtContainer.style.fontSize) + 1 + "px";
            	txtContainer.style.lineHeight = parseInt(txtContainer.style.lineHeight) + 1 + "px";
            	DivPrvi.style.fontSize = parseInt(DivPrvi.style.fontSize) + 1 + "px";
                for (i = 0; i < DivDrugi.length; i++) 
                {
                	if (DivDrugi[i].nodeName == "P" || DivDrugi[i].nodeName == "DIV") 
                    {
                        DivDrugi[i].style.fontSize = parseInt(DivDrugi[i].style.fontSize) + 1 + "px";
                        DivDrugi[i].style.lineHeight = parseInt(DivDrugi[i].style.lineHeight) + 1 + "px";
                    }
                }

            }
            
            if (velicina == "smanji" && parseInt(DivPrvi.style.fontSize) > 10)
            {
            	txtContainer.style.fontSize = parseInt(txtContainer.style.fontSize) - 1 + "px";
            	txtContainer.style.lineHeight = parseInt(txtContainer.style.lineHeight) - 1 + "px";
            	DivPrvi.style.fontSize = parseInt(DivPrvi.style.fontSize) - 1 + "px";
                for (i = 0; i < DivDrugi.length; i++) {
                    if (DivDrugi[i].nodeName == "P" || DivDrugi[i].nodeName == "DIV") {
                        DivDrugi[i].style.fontSize = parseInt(DivDrugi[i].style.fontSize) - 1 + "px";
                        DivDrugi[i].style.lineHeight = parseInt(DivDrugi[i].style.lineHeight) - 1 + "px";
                    }
                }
            }
        }
        catch (err)
        {}
    }
  


function bmiScore(idTezina, idVisina, idBMI)
{try {
        var tezina = parseInt(document.getElementById(idTezina).value);
        var visina = parseInt(document.getElementById(idVisina).value);
        var bmi = document.getElementById(idBMI)
        if (isNaN(tezina) || isNaN(visina)) {
            alert("Pod visinu i težinu obavezno upisati cijele brojeve!");
        }
        else {
            bmi.value = (tezina / ((visina / 100) * (visina / 100))).toFixed(2);
        }
    }
    catch (err) {
    }
}

// Kontrola za ocjenu slike dana

function ocjeni(genericId, position) {
    try {
        for (i = 0; i < position; i+=2) {
        	document.getElementById(genericId + (i + 1)).style.backgroundImage = "url(/WebResources/img/slika_dana_ocjena_aktivna_left.gif)";
        	document.getElementById(genericId + (i + 2)).style.backgroundImage = "url(/WebResources/img/slika_dana_ocjena_aktivna_right.gif)";
        }
    }
    catch (err) { 
        alert("bio je error:" + err + genericId + position);
    }
}
function resetOcjene(genericId) {
    try {
        var position = document.getElementById("slikaDanaBrojcanaOcjena").innerHTML;
        position = position.replace(",", ".");
        position = parseFloat(position)*2;
        
        for (i = 0; i < position; i++) {
            if (i % 2 == 0) document.getElementById(genericId + (i + 1)).style.backgroundImage = "url(/WebResources/img/slika_dana_ocjena_trenutna_left.gif)";
            else document.getElementById(genericId + (i + 1)).style.backgroundImage = "url(/WebResources/img/slika_dana_ocjena_trenutna_right.gif)";
        }
        for (i = position; i < 11; i++) {
        	if (i % 2 == 0) document.getElementById(genericId + i).style.backgroundImage = "url(/WebResources/img/slika_dana_ocjena_neaktivna_right.gif)";
        	else document.getElementById(genericId + i).style.backgroundImage = "url(/WebResources/img/slika_dana_ocjena_neaktivna_left.gif)";
        }
    }
    catch (err) {
        alert("bio je error:" + err);
    }
}


//Konverter valuta
function Convert(unos) {
    try {
        var boxPrvi = document.getElementById("konverterValutaUnos" + unos);
        var boxDrugi = document.getElementById("konverterValutaUnos" + (unos == "1" ? 2 : 1));
        var selectPrvi = document.getElementById("konverterValutaIzbor" + unos);
        var selectDrugi = document.getElementById("konverterValutaIzbor" + (unos == "1" ? 2 : 1));

        var tablicaBody = document.getElementById("tecajnaListaTable");
        var poljeValuta = new Array();
        
        var brojacA = 0;
        var brojacB = 0;
        
        for(i = 0; i < tablicaBody.childNodes.length;i++)
            if(tablicaBody.childNodes.item(i).nodeName == "TR"){
                poljeValuta[brojacA] = new Array();
                brojacB = 0;
                for (j = 0; j < tablicaBody.childNodes.item(i).childNodes.length; j++)
                    if (tablicaBody.childNodes.item(i).childNodes.item(j).nodeName == "TD") {
                        poljeValuta[brojacA][brojacB] = tablicaBody.childNodes.item(i).childNodes.item(j).innerHTML;
                        brojacB++;
                    }
                brojacA++;
            }
        
        for (i = 0; i < poljeValuta.length; i++)
            if (poljeValuta[i][0].toString() == selectPrvi.options[selectPrvi.selectedIndex].text.toString()) 
                break;

        for (j = 0; j < poljeValuta.length; j++)
            if (poljeValuta[j][0] == selectDrugi.options[selectDrugi.selectedIndex].text)
                break;
    
        if (i == poljeValuta.length)
            srednjiTecajPrvi = 1;
        else srednjiTecajPrvi = (parseFloat(poljeValuta[i][2].replace(",", ".")) + parseFloat(poljeValuta[i][3].replace(",", "."))) / 2;

        if (j == poljeValuta.length)
            srednjiTecajDrugi = 1;
        else srednjiTecajDrugi = (parseFloat(poljeValuta[j][2].replace(",", ".")) + parseFloat(poljeValuta[j][3].replace(",", "."))) / 2;

        var tempRez = parseFloat(boxPrvi.value.replace(",", ".")) * srednjiTecajPrvi / srednjiTecajDrugi;
        isNaN(tempRez) ? boxDrugi.value = "" : boxDrugi.value = Math.round(tempRez * 1000) / 1000;
                    
   }
    catch (err) {
        alert("error: " + err);
    }
}


//Splash Screen ico kontrola
var bounceIntervalID1;
var bounceIntervalID2;
var bounceIntervalID3;
var bounceIntervalID4;
var bounceIntervalID5;
function bounceImg(icoID) {
    try {
        clearBounceInterval("");
         for (i = 1; i < 6; i++) {
             document.getElementById("SplashTekst" + i).style.display = "none";
             document.getElementById("splashBackground" + i).style.visibility = "hidden";
         }
         document.getElementById("SplashTekst" + icoID).style.display = "block";
        if (icoID != 1) isNaN(parseInt(document.getElementById("splashScreenIcon1").style.marginLeft)) ? document.getElementById("splashScreenIcon1").style.marginLeft = "0px" : bounceIntervalID1 = setInterval("bounceImgMove('1','right')", 50);
        if (icoID != 2) isNaN(parseInt(document.getElementById("splashScreenIcon2").style.marginLeft)) ? document.getElementById("splashScreenIcon2").style.marginLeft = "0px" : bounceIntervalID2 = setInterval("bounceImgMove('2','right')", 50);
        if (icoID != 3) isNaN(parseInt(document.getElementById("splashScreenIcon3").style.marginLeft)) ? document.getElementById("splashScreenIcon3").style.marginLeft = "0px" : bounceIntervalID3 = setInterval("bounceImgMove('3','right')", 50);
        if (icoID != 4) isNaN(parseInt(document.getElementById("splashScreenIcon4").style.marginLeft)) ? document.getElementById("splashScreenIcon4").style.marginLeft = "0px" : bounceIntervalID4 = setInterval("bounceImgMove('4','right')", 50);
        if (icoID != 5) isNaN(parseInt(document.getElementById("splashScreenIcon5").style.marginLeft)) ? document.getElementById("splashScreenIcon5").style.marginLeft = "0px" : bounceIntervalID5 = setInterval("bounceImgMove('5','right')", 50);
            
            if (isNaN(parseInt(document.getElementById("splashScreenIcon" + icoID).style.marginLeft)))
                document.getElementById("splashScreenIcon" + icoID).style.marginLeft = "0px";

            if (icoID == 1) {
                bounceIntervalID1 = setInterval("bounceImgMove('1','left')", 50);
                document.getElementById("splashBackground1").style.visibility = "visible";
            }
            if (icoID == 2) {
                bounceIntervalID2 = setInterval("bounceImgMove('2','left')", 50);
                document.getElementById("splashBackground2").style.visibility = "visible";
            }
            if (icoID == 3) {
                bounceIntervalID3 = setInterval("bounceImgMove('3','left')", 50);
                document.getElementById("splashBackground3").style.visibility = "visible";
            }
            if (icoID == 4) {
                bounceIntervalID4 = setInterval("bounceImgMove('4','left')", 50);
                document.getElementById("splashBackground4").style.visibility = "visible";
            }
            if (icoID == 5) {
                bounceIntervalID5 = setInterval("bounceImgMove('5','left')", 50);
                document.getElementById("splashBackground5").style.visibility = "visible";
            }
    }
    catch (err) {
        alert(err);
    }
}

function bounceImgMove(icoID, smjer) {
    icon = document.getElementById("splashScreenIcon" + icoID);
    //alert(icon.style.marginLeft + ", " + smjer);
    if(smjer == "right")
        parseInt(icon.style.marginLeft) == 0 ? clearBounceInterval(icoID) : icon.style.marginLeft = parseInt(icon.style.marginLeft) - 1 + "px";
    if (smjer == "left")
        parseInt(icon.style.marginLeft) == 10 ? clearBounceInterval(icoID) : icon.style.marginLeft = parseInt(icon.style.marginLeft) + 1 + "px";
    

}

function clearBounceInterval(icoID) {
    if (isNaN(parseInt(icoID))) {
        //alert("bla");
        clearInterval(bounceIntervalID1);
        clearInterval(bounceIntervalID2);
        clearInterval(bounceIntervalID3);
        clearInterval(bounceIntervalID4);
        clearInterval(bounceIntervalID5);
    }
    if (icoID == 1) clearInterval(bounceIntervalID1);
    if (icoID == 2) clearInterval(bounceIntervalID2);
    if (icoID == 3) clearInterval(bounceIntervalID3);
    if (icoID == 4) clearInterval(bounceIntervalID4);
    if (icoID == 5) clearInterval(bounceIntervalID5);
}