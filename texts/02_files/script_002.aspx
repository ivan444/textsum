if(xClaimInitScript == undefined)
                {
                    var xClaimInitScript = true;

                    function NewXClaimLoad(DOMContentLoadedFunction)
                    {
                        if ( document.addEventListener ) {
                            document.addEventListener( "DOMContentLoaded", DOMContentLoadedFunction, false );
                        } else if ( document.attachEvent ) {
                            document.attachEvent("onreadystatechange", DOMContentLoadedFunction);
                        }else if(window.addEventListener){
                            window.addEventListener( "load", DOMContentLoadedFunction, false );
                        }else if(window.attachEvent){
                            window.attachEvent( "onload", DOMContentLoadedFunction );
                        }
                    }

                    NewXClaimLoad(function () {
                        if (document.createElement ) {
                            var time = '&time='+ Math.round(new Date().getTime());
                            var url = "&url=" + escape( window.location.href );
                            var filename = "http://hr-engine.xclaimwords.net/Xclaim.js?partnerid=116455" + time + url;
                            var fileref=document.createElement('script');
                            fileref.setAttribute("type","text/javascript");
                            fileref.setAttribute("src", filename);
                            if (typeof fileref != "undefined")
                                document.getElementsByTagName("head")[0].appendChild(fileref);
                            }
                     });
                }