
    if (typeof(OA_zones) != 'undefined') {
        var OA_zoneids = '';
        for (var zonename in OA_zones) OA_zoneids += escape(zonename+'=' + OA_zones[zonename] + "|");
        OA_zoneids += '&amp;nz=1';
    } else {
        var OA_zoneids = escape('1|2|9|15|21|27|33|51|71|81|91|101|219|220|221|111|112|113|114|123|125|126|127|217|218|137|138|139|141|144|145|147|148|149|150|163|164|165|166|167|168|169|170|171|172|173|174|175|176|177|178|179|180|181|182|183|184|185|186|187|188|189|190|191|192|193|194|195|196|197|198|199|200|201|202|203|204|205|206|207|208|209|210|211|212|213|214|215|216');
    }

    if (typeof(OA_source) == 'undefined') { OA_source = ''; }
    var OA_p=location.protocol=='https:'?'https://ads.slobodnadalmacija.com/www/delivery/spc.php':'http://ads.slobodnadalmacija.com/www/delivery/spc.php';
    var OA_r=Math.floor(Math.random()*99999999);
    OA_output = new Array();

    var OA_spc="<"+"script type='text/javascript' ";
    OA_spc+="src='"+OA_p+"?zones="+OA_zoneids;
    OA_spc+="&amp;source="+escape(OA_source)+"&amp;r="+OA_r;
    OA_spc+=(document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));

    if (window.location) OA_spc+="&amp;loc="+escape(window.location);
    if (document.referrer) OA_spc+="&amp;referer="+escape(document.referrer);
    OA_spc+="'><"+"/script>";
    document.write(OA_spc);

    function OA_show(name) {
        if (typeof(OA_output[name]) == 'undefined') {
            return;
        } else {
            document.write(OA_output[name]);
        }
    }

    function OA_showpop(name) {
        zones = window.OA_zones ? window.OA_zones : false;
        var zoneid = name;
        if (typeof(window.OA_zones) != 'undefined') {
            if (typeof(zones[name]) == 'undefined') {
                return;
            }
            zoneid = zones[name];
        }

        OA_p=location.protocol=='https:'?'https://ads.slobodnadalmacija.com/www/delivery/apu.php':'http://ads.slobodnadalmacija.com/www/delivery/apu.php';

        var OA_pop="<"+"script type='text/javascript' ";
        OA_pop+="src='"+OA_p+"?zoneid="+zoneid;
        OA_pop+="&amp;source="+escape(OA_source)+"&amp;r="+OA_r;
        if (window.location) OA_pop+="&amp;loc="+escape(window.location);
        if (document.referrer) OA_pop+="&amp;referer="+escape(document.referrer);
        OA_pop+="'><"+"/script>";

        document.write(OA_pop);
    }
var OA_fo = '';
OA_fo += "<"+"script type=\'text/javascript\' src=\'http://ads.slobodnadalmacija.com/www/delivery/fl.js\'><"+"/script>\n";
document.write(OA_fo);
