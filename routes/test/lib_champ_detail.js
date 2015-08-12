function calc_elo(a,b)
{
        if(a == 1000 && b == 2200)
        {
                return "All";
        }
        var as = a.toString();
        var bs = b.toString();
        if(a == 1000) as = "0";
        if(b == 2200) bs = "";
        return as+"~"+bs;
}
function calc_string(a,b)
{
        var an = (a - 800) / 200;
        var bn = (b - 800) / 200;

        var s = new Array();
        for(i = an;i < bn;i++)
        {
                s[s.length] = i.toString();
        }
        return s.join("|");
}
function getCWR()
{
        var script = document.createElement('script');
        script.src = 'http://b.fow.kr/sc.php';
        document.body.appendChild(script);
}
function reCWR()
{
        var _S = $("#s_date").val();
        var _E = $("#e_date").val();
        var _R = calc_string( $( "#slider_elo" ).slider( "values", 0 ), $( "#slider_elo" ).slider( "values", 1 ) );
        var _Q = merge_checkbox(".Q");

        var script = document.createElement('script');
        script.src = 'http://b.fow.kr/sc.php?S='+_S+'&E='+_E+'&R='+_R+'&Q='+_Q;
        document.body.appendChild(script);
}
function showCD(CWR)
{
        $("#CWRbody").empty();

        for(i in CWR)
        {
                var c_name = convert_champ(i)+(champs["_"+i].NAME ? champs["_"+i].NAME : i);
                var r_all = cd(CWR[i]['COUNT']);
                var r_win = cd(CWR[i]['WIN']);

                var r_k = cd(CWR[i]['KILL']);
                var r_d = cd(CWR[i]['DEATH']);
                var r_a = cd(CWR[i]['ASSIST']);

                var winRate = (100*r_win/(r_all)).toFixed(2)+"%";

                var kRate = (r_k/(r_all)).toFixed(1);
                var dRate = (r_d/(r_all)).toFixed(1);
                var aRate = (r_a/(r_all)).toFixed(1);

                var ITEM = "";
                var SPELL = "";
                var ITEM_PER = new Array();
                var SPELL_PER = new Array();
                var ITEM_STR = "";
                var SPELL_STR = "";
                var ITEM_ALL = 0;
                var SPELL_ALL = 0;

                var cnt = 0;
                for( j in CWR[i]['ITEM'] )
                {
                        if(j.substr(1) == '2003' || j.substr(1) == '2044') continue;
                        if(cnt++ > 9) break;
                        ITEM += convert_item(j.substr(1));
                        ITEM_PER[ITEM_PER.length] = CWR[i]['ITEM'][j];
                        ITEM_ALL += CWR[i]['ITEM'][j];
                }
                cnt = 0;
                for( j in CWR[i]['SPELL'] )
                {
                        if(cnt++ > 3) break;
                        SPELL += convert_spell(j.substr(1));
                        SPELL_PER[SPELL_PER.length] = CWR[i]['SPELL'][j];
                        SPELL_ALL += CWR[i]['SPELL'][j];
                }

                for( j in ITEM_PER )
                {
                        ITEM_STR += ITEM_PER[j].toString()+"( "+(100*ITEM_PER[j]/ITEM_ALL).toFixed(2)+"% )\n";
                }
                for( j in SPELL_PER )
                {
                        SPELL_STR += SPELL_PER[j].toString()+"( "+(100*SPELL_PER[j]/SPELL_ALL).toFixed(2)+"% )\n";
                }

                var su =
                '<TR>'+
                '<TD>'+c_name+'</TD>'+
                '<TD>'+r_all+'</TD>'+
                '<TD>'+winRate+'</TD>'+
                '<TD>'+kRate+'</TD>'+
                '<TD>'+dRate+'</TD>'+
                '<TD>'+aRate+'</TD>'+
                '<TD title="'+SPELL_STR+'">'+SPELL+'</TD>'+
                '<TD title="'+ITEM_STR+'">'+ITEM+'</TD>'+
                '</TR>';
                $(su).appendTo('#CWRbody');
        }
        $("#champrank_tb .tablesorter").trigger("update");
}
