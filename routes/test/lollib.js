var ranktier =
{
	'0'   : 'B5', '100' : 'B4', '200' : 'B3', '300' : 'B2', '400' : 'B1',
	'500' : 'S5', '600' : 'S4', '700' : 'S3', '800' : 'S2', '900' : 'S1',
	'1000': 'G5', '1100': 'G4', '1200': 'G3', '1300': 'G2', '1400': 'G1',
	'1500': 'P5', '1600': 'P4', '1700': 'P3', '1800': 'P2', '1900': 'P1',
	'2000': 'D5', '2100': 'D4', '2200': 'D3', '2300': 'D2', '2400': 'D1',
	'2500': 'C1'
};
function search(d)
{
        if(d.length > 20) d = d.substr(0,20);
        var script = document.createElement('script');
        script.src = 'http://b.fow.kr/users/'+d;
        document.body.appendChild(script);
}
function get_bt(d,t)
{
        var p = $(t).offset().top + 57;
        $("#battle_info").css('top',p);
        if(d.length > 20) d = d.substr(0,20);
        var script = document.createElement('script');
        script.src = 'http://b.fow.kr/battle/'+d;
        document.body.appendChild(script);
}
function get_rg(d)
{
        var script = document.createElement('script');
        script.src = 'http://b.fow.kr/recent_detail.php?UID='+d;
        document.body.appendChild(script);
}
function i_key(ev)
{
        if(ev.keyCode == 13)
        {
                var e = window.event || event; // window.event --> IE 계열
                var obj = e.srcElement || e.target ; // ev.srcElement --> IE 계열, ev.target --> w3c

                var d = $('#s_name').val();
                search(d);
                obj.value = "";
        }
}
function convert_spell(i)
{
	return "<IMG width=20 src='http://lol.fow.kr/spell/"+i+".png'>";
}
function convert_item(i)
{
        if(i)
                return "<IMG width=20 src='http://lol.fow.kr/item/"+i+".png'>";
//              return "<IMG width=20 src='http://leagueoflegends.co.kr/upload/item/"+i+".gif'>";
        else
                return "";
}
function showRG(d)
{
        var sI = new MyIterator(d,'GAMETIME');
        var i;

        while( i = sI.next() )
        {
                var _d = i;

		var skip = false;
		for( p in data.recent )
		{
			if(data.recent[p].GAME_ID == _d.GAME_ID) skip = true;
		}
		if(skip) continue;

                var gameID = _d.GAME_ID;

                var result = (_d.STAT.WIN == 1) ? "승" : "패";
                var isrank = (_d.STAT.ISRANKED == true) ? "RANK" : "NORMAL";
                var r_name = (_d.QUEUETYPE == 'NORMAL') ? "일반" : (
				(_d.QUEUETYPE.substr(0,4) == 'RANK') ? "<B>랭크</B>" : (
				(_d.QUEUETYPE.substr(0,4) == 'ODIN') ? "도미니언" : _d.QUEUETYPE));
                var c_name = convert_champ(_d.CHAMP)+'<BR/>'+(champs['_'+_d.CHAMP].NAME ? champs['_'+_d.CHAMP].NAME : _d.CHAMP);
                var item0 = convert_item(_d.STAT.ITEM0);
                var item1 = convert_item(_d.STAT.ITEM1);
                var item2 = convert_item(_d.STAT.ITEM2);
                var item3 = convert_item(_d.STAT.ITEM3);
                var item4 = convert_item(_d.STAT.ITEM4);
                var item5 = convert_item(_d.STAT.ITEM5);
                var mk = (_d.STAT.MINIONS_KILLED ? _d.STAT.MINIONS_KILLED : 0)
                        +(_d.STAT.NEUTRAL_MINIONS_KILLED ? _d.STAT.NEUTRAL_MINIONS_KILLED : 0);
                var spell1 = convert_spell(_d.SPELL1);
                var spell2 = convert_spell(_d.SPELL2);
                var TEAM1 = '', TEAM2 = '';
                for(j in _d.TEAM1)
                {
                        TEAM1 += convert_champ(_d.TEAM1[j]);
                }
                for(j in _d.TEAM2)
                {
                        TEAM2 += convert_champ(_d.TEAM2[j]);
                }
                TEAM1 = "<DIV style='border:1px solid blue;'>"+TEAM1+"</DIV>";
                TEAM2 = "<DIV style='border:1px solid purple;'>"+TEAM2+"</DIV>";

                var rc = (_d.STAT.WIN == 1) ? "#F4FFF4" : "#FFF4F4";
                var su =
                '<TR onclick="get_bt('+gameID+',this);">'+
                // '<TD style="vertical-align:middle; text-align:center;" title="'+(cd(_d.RATING)+cd(_d.ELOCHANGE))+'">'+result+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;" title="'+cd(_d.ELOCHANGE)+'">'+result+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+r_name+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+c_name+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+spell1+'<BR/>'+spell2+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+cd(_d.STAT.LEVEL)+'</TD>'+
                '<TD style="background:'+rc+';">'+TEAM1+TEAM2+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+cd(_d.STAT.CHAMPIONS_KILLED)+' / '+cd(_d.STAT.NUM_DEATHS)+' / '+cd(_d.STAT.ASSISTS)+'</TD>'+
                '<TD style="background:'+rc+';">'+item0+item1+item2+'<BR/>'+item3+item4+item5+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+cd(_d.STAT.GOLD_EARNED)+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+mk+'</TD>'+
                '</TR>';
                $(su).appendTo('#recent_body');
        }
        $("#recent_table").trigger("update");
}
function convert_champ(i)
{
        if( i == 0 )
                return "<IMG width=20 SRC='http://leagueoflegends.co.kr/upload/rune/8313.gif'>";
//        else if( 0 && i < 90 && i != 72 && i != 62)
//               return "<IMG width=20 SRC='http://leagueoflegends.co.kr/upload/champion/icons/"+i+".jpg'>";
        else
                return "<IMG width=20 SRC='http://lol.fow.kr/champion/icons/"+i+".jpg'>";
}
function merge_checkbox(name)
{
        var s = new Array();

        $(name).each(function(i)
        {
                if($(this).is(':checked'))
		{
                        s[s.length] = $(this).attr('cid');
		}
        }
        );
        return s.join("|");
}
function cd(d)
{
        if(d == undefined) return 0;
        if(d > 500000000) return (d-536870912);
        return d;
}
function put_recent(d)
{
        var sI = new MyIterator(d,'GAME_ID');
        var i;

        while( i = sI.next() )
        {
                var _d = i;

                var gameID = _d.GAME_ID;

                var result = (_d.STAT.WIN == 1) ? "승" : "패";
                var isrank = (_d.STAT.ISRANKED == true) ? "RANK" : "NORMAL";
                var r_name = (_d.QUEUETYPE == 'NORMAL') ? "일반" : (
				(_d.QUEUETYPE.substr(0,4) == 'RANK') ? "<B>랭크</B>" : (
				(_d.QUEUETYPE.substr(0,4) == 'ODIN') ? "도미니언" : _d.QUEUETYPE));
                var c_name = convert_champ(_d.CHAMP)+'<BR/>'+(champs['_'+_d.CHAMP].NAME ? champs['_'+_d.CHAMP].NAME : _d.CHAMP);
                var item0 = convert_item(_d.STAT.ITEM0);
                var item1 = convert_item(_d.STAT.ITEM1);
                var item2 = convert_item(_d.STAT.ITEM2);
                var item3 = convert_item(_d.STAT.ITEM3);
                var item4 = convert_item(_d.STAT.ITEM4);
                var item5 = convert_item(_d.STAT.ITEM5);
                var mk = (_d.STAT.MINIONS_KILLED ? _d.STAT.MINIONS_KILLED : 0)
                        +(_d.STAT.NEUTRAL_MINIONS_KILLED ? _d.STAT.NEUTRAL_MINIONS_KILLED : 0);
                var spell1 = convert_spell(_d.SPELL1);
                var spell2 = convert_spell(_d.SPELL2);
                var TEAM1 = '', TEAM2 = '';
                for(j in _d.TEAM1)
                {
                        TEAM1 += convert_champ(_d.TEAM1[j]);
                }
                for(j in _d.TEAM2)
                {
                        TEAM2 += convert_champ(_d.TEAM2[j]);
                }
                TEAM1 = "<DIV style='border:1px solid blue;'>"+TEAM1+"</DIV>";
                TEAM2 = "<DIV style='border:1px solid purple;'>"+TEAM2+"</DIV>";

                var rc = (_d.STAT.WIN == 1) ? "#F4FFF4" : "#FFF4F4";
                var su =
                '<TR onclick="get_bt('+gameID+',this);">'+
                // '<TD style="vertical-align:middle; text-align:center;" title="'+(cd(_d.RATING)+cd(_d.ELOCHANGE))+'">'+result+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;" title="'+cd(_d.ELOCHANGE)+'">'+result+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+r_name+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+c_name+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+spell1+'<BR/>'+spell2+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+cd(_d.STAT.LEVEL)+'</TD>'+
                '<TD style="background:'+rc+';">'+TEAM1+TEAM2+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+cd(_d.STAT.CHAMPIONS_KILLED)+' / '+cd(_d.STAT.NUM_DEATHS)+' / '+cd(_d.STAT.ASSISTS)+'</TD>'+
                '<TD style="background:'+rc+';">'+item0+item1+item2+'<BR/>'+item3+item4+item5+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+cd(_d.STAT.GOLD_EARNED)+'</TD>'+
                '<TD style="background:'+rc+'; vertical-align:middle; text-align:center;">'+mk+'</TD>'+
                '</TR>';
                $(su).appendTo('#recent_body');
        }
}
function put_summary(id,d)
{
        var s_name = { 'Unranked' : '일반',
                        'RankedSolo3x3' : '랭크(개인) 3x3',
                        'RankedPremade3x3' : '랭크(친구) 3x3',
                        'RankedTeam3x3' : '랭크(팀) 3x3',
                        'RankedSolo5x5' : '랭크(개인)',
                        'RankedPremade5x5' : '랭크(친구)',
                        'RankedTeam5x5' : '랭크(팀)',
                        'OdinUnranked' : '도미니언', 'CoopVsAI' : '협동모드' };

        if(id.substr(0,6) != 'Ranked')
        {
                var rate = (100*d.win/(d.win+d.lose)).toFixed(2)+"%";
        }
        else
        {
                var rate = d.rate;
        }

        var su =
        '<TR>'+
        '<TD>'+(s_name[id] ? s_name[id] : id)+'</TD>'+
        '<TD>'+d.win+'</TD>'+
        '<TD>'+d.lose+'</TD>'+
        '<TD>'+cd(d.stat.TOTAL_CHAMPION_KILLS)+'</TD>'+
        '<TD>'+cd(d.stat.TOTAL_ASSISTS)+'</TD>'+
        '<TD>'+rate+'</TD>'+
        '</TR>';
        $(su).appendTo('#summary_body');
}
function put_champ(d)
{
        var champtype = [];
        var _cnt = 0;

        for(i in d)
        {
                var c_name = convert_champ(i.substr(1))+(champs[i].NAME ? champs[i].NAME : i);
                var win = d[i].TOTAL_SESSIONS_WON;
                var lose = d[i].TOTAL_SESSIONS_LOST;
                var winrate = (100*win/(win+lose)).toFixed(2)+"%";

                for(j in champs[i].TYPE)
                {
                        if(champtype[ champs[i].TYPE[j] ] == undefined)
                        {
                                champtype[ champs[i].TYPE[j] ] = { WIN:0, LOSE:0, KILL:0, DEATH:0, ASSIST:0 };
                        }
                        champtype[ champs[i].TYPE[j] ].WIN += win;
                        champtype[ champs[i].TYPE[j] ].LOSE += lose;
                        champtype[ champs[i].TYPE[j] ].KILL += d[i].TOTAL_CHAMPION_KILLS;
                        champtype[ champs[i].TYPE[j] ].DEATH += d[i].TOTAL_DEATHS_PER_SESSION;
                        champtype[ champs[i].TYPE[j] ].ASSIST += d[i].TOTAL_ASSISTS;
                }
                _cnt = d[i].TOTAL_SESSIONS_PLAYED;
                var su =
                '<TR>'+
                '<TD>'+c_name+'</TD>'+
                '<TD>'+winrate+'</TD>'+
                '<TD>'+_cnt+'</TD>'+
                '<TD>'+d[i].TOTAL_SESSIONS_WON+'</TD>'+
                '<TD>'+d[i].TOTAL_SESSIONS_LOST+'</TD>'+
                '<TD>'+(d[i].TOTAL_CHAMPION_KILLS/_cnt).toFixed(1)+' / '+
                (d[i].TOTAL_DEATHS_PER_SESSION/_cnt).toFixed(1)+' / '+
                (d[i].TOTAL_ASSISTS/_cnt).toFixed(1)+'</TD>'+
                '</TR>';
                $(su).appendTo('#champ_body');
        }
        for(i in champtype)
        {
                if(champtypename(i) == i) continue;
                var c = champtype[i];
                var winrate = (100 * c.WIN/(c.WIN+c.LOSE)).toFixed(2)+"%";

                _cnt = c.WIN + c.LOSE;

                var su =
                '<TR>'+
                '<TD>'+champtypename(i)+'</TD>'+
                '<TD>'+winrate+'</TD>'+
                '<TD>'+(c.WIN+c.LOSE)+'</TD>'+
                '<TD>'+c.WIN+'</TD>'+
                '<TD>'+c.LOSE+'</TD>'+
                '<TD>'+(c.KILL/_cnt).toFixed(1)+' / '+(c.DEATH/_cnt).toFixed(1)+' / '+(c.ASSIST/_cnt).toFixed(1)+'</TD>'+
                '</TR>';
                $(su).appendTo('#champtype_body');
        }
}
function showBattle(d)
{
        $("#battle_detail").empty();
        $("#battle_info").show();
        for(i in d)
        {
                var _d = d[i];

                var c_name = convert_champ(_d.CHAMP)+(champs['_'+_d.CHAMP].NAME ? champs['_'+_d.CHAMP].NAME : _d.CHAMP);
                var champ_name = (champs['_'+_d.CHAMP].NAME ? champs['_'+_d.CHAMP].NAME : _d.CHAMP);
                var champ_img = convert_champ(_d.CHAMP);
                var item0 = convert_item(_d.STAT.ITEM0);
                var item1 = convert_item(_d.STAT.ITEM1);
                var item2 = convert_item(_d.STAT.ITEM2);
                var item3 = convert_item(_d.STAT.ITEM3);
                var item4 = convert_item(_d.STAT.ITEM4);
                var item5 = convert_item(_d.STAT.ITEM5);
                var mk = (_d.STAT.MINIONS_KILLED ? _d.STAT.MINIONS_KILLED : 0)
                        +(_d.STAT.NEUTRAL_MINIONS_KILLED ? _d.STAT.NEUTRAL_MINIONS_KILLED : 0);
                var spell1 = convert_spell(_d.SPELL1);
                var spell2 = convert_spell(_d.SPELL2);

                var class_name = (_d.TEAM == 100) ? 't_blue' : 't_purple';
                var su =
                '<TR>'+
                '<TD class="'+class_name+'" style="vertical-align:middle; text-align:left;" title="'+champ_name+'">'+champ_img+(_d.NAME.substr(3))+'</TD>'+
                '<TD class="'+class_name+'" style="vertical-align:middle; text-align:center;">'+spell1+spell2+'</TD>'+
                '<TD class="'+class_name+'" style="vertical-align:middle; text-align:center;">'+cd(_d.STAT.LEVEL)+'</TD>'+
                '<TD class="'+class_name+'" style="vertical-align:middle; text-align:center;">'+cd(_d.STAT.CHAMPIONS_KILLED)+' / '+cd(_d.STAT.NUM_DEATHS)+' / '+cd(_d.STAT.ASSISTS)+'</TD>'+
                '<TD class="'+class_name+'" >'+item0+item1+item2+item3+item4+item5+'</TD>'+
                '<TD class="'+class_name+'" style="vertical-align:middle; text-align:center;">'+cd(_d.STAT.GOLD_EARNED)+'</TD>'+
                '<TD class="'+class_name+'" style="vertical-align:middle; text-align:center;">'+mk+'</TD>'+
                '</TR>';
                $(su).appendTo('#battle_detail');
        }
        $("#battle_sorter").trigger("update");
}

