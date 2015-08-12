function reload_captcha(id)
{
	document.getElementById(id).src = './si/show.php?sid=' + Math.random();
}
function good_inc(id,value)
{
	var score = parseInt( $("#good_"+id).attr('score'), 10 );
	$("#good_"+id).text( value + score );
	$("#good_"+id).attr('score', value + score );
}
function req_ll(d,tg)
{
	$.ajax({
		type: "POST",
		url: "linklist.php",
		data: d,
		cache: false,
		dataType: "html",
		success: function(msg)
		{
			// if(msg)
			$(tg).html(msg);
		}
	});
}
var page = 0;
var subtype = 1;
$( function()
{
	var name = $( "#name" ),
		link = $( "#link" ),
		desc = $( "#desc" ),
		pass = $( "#pass" ),
		link_captcha = $( "#captcha_link" ),
		allFields = $( [] ).add( name ).add( link ).add( desc ).add( pass ).add( link_captcha ),
		tips = $( ".validateTips" );

	var memo_name = $( "#memo_name" ),
		memo = $( "#memo" ),
		memo_desc = $( "#memo_desc" ),
		memo_pass = $( "#memo_pass" ),
		memo_captcha = $( "#captcha_memo" ),
		memo_allFields = $( [] ).add( memo_name ).add( memo ).add( memo_desc ).add( memo_pass ).add( memo_captcha ),
		tips = $( ".validateTips" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	function checkLength( o, n, min, max ) {
		if ( o.val().length > max || o.val().length < min ) {
			o.addClass( "ui-state-error" );
			updateTips( n+"의 길이는 "+min+"자 ~ "+max+"자 사이어야 합니다.");
			return false;
		} else {
			return true;
		}
	}

	$( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 520,
		width: 600,
		modal: true,
		buttons: {
			"등록": function() {
				var bValid = true;
				allFields.removeClass( "ui-state-error" );

				// bValid = bValid && checkLength( name, "이름", 2, 20 );
				bValid = bValid && checkLength( link, "링크", 6, 240 );
				// bValid = bValid && checkLength( desc, "제목", 1, 200 );

				// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
				var subtype = $(":input:radio[name=subtype_radio]:checked").val();
				if( subtype == "1" )
				{
					updateTips( "분류는 반드시 선택하셔야 합니다.");
					return;
				}
				if ( bValid ) {
					req_ll("subtype="+encodeURIComponent(subtype)+"&name="+encodeURIComponent(name.val())+"&captcha="+link_captcha.val()+"&pass="+encodeURIComponent(pass.val())+"&link="+encodeURIComponent(link.val())+"&desc="+encodeURIComponent(desc.val()),"#output");
					$( this ).dialog( "close" );
				}
			},
			"취소": function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			$( [] ).add( link ).add( desc ).add( pass ).val( "" ).removeClass( "ui-state-error" );
		},
		open: function() {
			reload_captcha("link_captcha");
			$("#subtype_radio").buttonset();
		}
	});

	$( "#dialog-memo-form" ).dialog({
		autoOpen: false,
		height: 400,
		width: 600,
		modal: true,
		buttons: {
			"등록": function() {
				var bValid = true;
				memo_allFields.removeClass( "ui-state-error" );

				// bValid = bValid && checkLength( name, "이름", 2, 20 );
				bValid = bValid && checkLength( memo, "내용", 6, 500 );
				bValid = bValid && checkLength( memo_desc, "제목", 1, 80 );

				// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
				if ( bValid ) {
					req_ll("name="+encodeURIComponent(memo_name.val())+"&captcha="+memo_captcha.val()+"&pass="+encodeURIComponent(memo_pass.val())+"&memo="+encodeURIComponent(memo.val())+"&desc="+encodeURIComponent(memo_desc.val()),"#output");
					$( this ).dialog( "close" );
				}
			},
			"취소": function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			$( [] ).add( memo_name ).add( memo ).add( memo_desc ).add( memo_pass ).val( "" ).removeClass( "ui-state-error" );
		},
		open: function() {
			reload_captcha("memo_captcha");
		}
	});

	$( ".btn_subtype" ).button().click( function()
	{
		subtype = $(this).attr("subtype");
		// _gaq.push(['_trackEvent', 'Subtype', 'Select', subtype ]);
		ga('send', 'event', 'Subtype', 'Select', subtype);

		var sname = $("#shf_name").text();
		if( sname == 'search' )
		{
			var keyword = $("#shf_keyword").text();
			req_ll("subtype="+subtype+"&page="+page+"&sname="+sname+"&keyword="+keyword,"#ll_main");
		}
		else
		{
			req_ll("subtype="+subtype+"&page="+page+"&sname="+sname,"#ll_main");
		}

		$(".btn_subtype").css("color","");
		$(".btn_subtype").find("SPAN").css("background-color","");
		$(this).css("color","red");
		$(this).find("SPAN").css("background-color","#FFE");
	});

	$( ".reload_captcha" ).button();

	$( "#shf_prev_btn" ).button().button('disable').click( function()
	{
		if(page <= 0) { $(this).button('disable'); return; }
		page -= 1;
		var sname = $("#shf_name").text();
		if( sname == 'search' )
		{
			var keyword = $("#shf_keyword").text();
			req_ll("subtype="+subtype+"&page="+page+"&sname="+sname+"&keyword="+keyword,"#ll_main");
		}
		else
		{
			req_ll("subtype="+subtype+"&page="+page+"&sname="+sname,"#ll_main");
		}
		$("#shf_page").text(page+1);
	});

	$( "#shf_next_btn" ).button().click( function()
	{
		page += 1;
		var sname = $("#shf_name").text();
		if( sname == 'search' )
		{
			var keyword = $("#shf_keyword").text();
			req_ll("subtype="+subtype+"&page="+page+"&sname="+sname+"&keyword="+keyword,"#ll_main");
		}
		else
		{
			req_ll("subtype="+subtype+"&page="+page+"&sname="+sname,"#ll_main");
		}
		$("#shf_page").text(page+1);
	});

	$( "#shf_page" ).button().button('disable');

	$( "#shf_btn" ).button().click(function()
	{
		$( "#dialog-form" ).dialog( "open" );
	});

	$( "#shf_memo_btn" ).button().click(function()
	{
		$( "#dialog-memo-form" ).dialog( "open" );
	});

	$( ".memo_link").live( "click", function()
	{
		$("#memo_"+$(this).attr('cid')).toggle();
	});

	$( ".play_daumlink_flv").live( "click", function()
	{
		var t = $("#memo_"+$(this).attr('cid'));
		// _gaq.push(['_trackEvent', 'Movie', 'Play', $(this).attr('cid') ]);
		ga('send', 'event', 'Movie', 'Play', $(this).attr('cid'));
		if(t.attr('isshow') == 1)
		{
			t.hide();
			t.attr('isshow',0);
			$("#memo_"+t.attr('cid')).empty();
		}
		else
		{
			t.show();
			
			var key = $(this).attr('key');
			$("#memo_"+t.attr('cid')).html("<DIV style='margin-left:-85px;'><IFRAME height='409' width='726' frameborder='0' src='http://videofarm.daum.net/controller/video/viewer/Video.html?vid="+key+"&play_loc=fow&m_player_type=v2&profile=BASE&autoplay=true' frameborder=0 scrolling='no' webkitallowfullscreen mozallowfullscreen allowfullscreen></IFRAME></DIV>");
			// $("#memo_"+t.attr('cid')).html('<DIV style="margin-left:-90px;"><object type="application/x-shockwave-flash" id="'+key+'" width="692px" height="390px" align="middle" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"><param name="autoplay" value="true"><param name="movie" value="http://flvs.daum.net/flvPlayer.swf?vid='+key+'"><param name="allow&#83;criptAccess" value="always"><param name="allowFullScreen" value="true"><param name="bgcolor" value="#000000"><param name="wmode" value="opaque"><embed allowscriptAccess=never allow&#83;criptAccess="never" src="http://flvs.daum.net/flvPlayer.swf?vid='+key+'" width="692px" height="390px" type="application/x-shockwave-flash" allowfullscreen="true" bgcolor="#000000"></object></DIV>');
			t.attr('isshow',1);
		}
	});

	$( ".play_afreeca").live( "click", function()
	{
		var t = $("#memo_"+$(this).attr('cid'));
		ga('send', 'event', 'Movie', 'Play', $(this).attr('cid'));
		if(t.attr('isshow') == 1)
		{
			t.hide();
			t.attr('isshow',0);
			$("#memo_"+t.attr('cid')).empty();
		}
		else
		{
			t.show();
			
			var key = $(this).attr('key');
			$("#memo_"+t.attr('cid')).html("<DIV style='margin-left:-85px;'><IFRAME height='409' width='726' frameborder='0' src='"+key+"' frameborder=0 scrolling='no' webkitallowfullscreen mozallowfullscreen allowfullscreen></IFRAME></DIV>");
			t.attr('isshow',1);
		}
	});

	$( ".play_daumlink").live( "click", function()
	{
		var t = $("#memo_"+$(this).attr('cid'));
		// _gaq.push(['_trackEvent', 'Movie', 'Play', $(this).attr('cid') ]);
		ga('send', 'event', 'Movie', 'Play', $(this).attr('cid'));
		if(t.attr('isshow') == 1)
		{
			t.hide();
			t.attr('isshow',0);
			$("#memo_"+t.attr('cid')).empty();
		}
		else
		{
			t.show();
			
			var key = $(this).attr('key');
			$("#memo_"+t.attr('cid')).html("<DIV style='margin-left:-85px;'><IFRAME height='409' width='726' frameborder='0' src='http://videofarm.daum.net/controller/video/viewer/Video.html?vid="+key+"&play_loc=fow&m_player_type=v2&profile=BASE&autoplay=true' frameborder=0 scrolling='no' webkitallowfullscreen mozallowfullscreen allowfullscreen></IFRAME></DIV>");
			// $("#memo_"+t.attr('cid')).html('<DIV style="margin-left:-90px;"><object type="application/x-shockwave-flash" id="'+key+'" width="692px" height="390px" align="middle" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"><param name="movie" value="http://flvs.daum.net/flvPlayer.swf?vid='+key+'"><param name="allow&#83;criptAccess" value="always"><param name="allowFullScreen" value="true"><param name="bgcolor" value="#000000"><param name="wmode" value="opaque"><embed allowscriptAccess=never allow&#83;criptAccess="never" src="http://flvs.daum.net/flvPlayer.swf?vid='+key+'" width="692px" height="390px" type="application/x-shockwave-flash" allowfullscreen="true" bgcolor="#000000"></object></DIV>');
			t.attr('isshow',1);
		}
	});

	$( ".play_naverlink").live( "click", function()
	{
		var t = $("#memo_"+$(this).attr('cid'));
		// _gaq.push(['_trackEvent', 'Movie', 'Play', $(this).attr('cid') ]);
		ga('send', 'event', 'Movie', 'Play', $(this).attr('cid'));
		if(t.attr('isshow') == 1)
		{
			t.hide();
			t.attr('isshow',0);
			$("#memo_"+t.attr('cid')).empty();
		}
		else
		{
			t.show();
			
			var key = $(this).attr('key');
			$("#memo_"+t.attr('cid')).html('<DIV style="margin-left:-85px;"><iframe width="726" height="409" src="http://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid='+key+'" frameborder="no" scrolling="no"></iframe></DIV>');
			t.attr('isshow',1);
		}
	});
	$( ".play_link").live( "click", function()
	{
		var t = $("#memo_"+$(this).attr('cid'));
		// _gaq.push(['_trackEvent', 'Movie', 'Play', $(this).attr('cid') ]);
		ga('send', 'event', 'Movie', 'Play', $(this).attr('cid'));
		if(t.attr('isshow') == 1)
		{
			t.hide();
			t.attr('isshow',0);
			$("#memo_"+t.attr('cid')).empty();
		}
		else
		{
			t.show();
			
			var p_src = $(this).attr('play');
			$("#memo_"+t.attr('cid')).html("<DIV style='margin-left:-85px;'><IFRAME height='409' width='726' frameborder='0' src='"+p_src+"'  webkitallowfullscreen mozallowfullscreen allowfullscreen></IFRAME></DIV>");
			t.attr('isshow',1);
		}
	});

	$( ".comments" ).live( "click", function()
	{
		var t = $("#comment_"+$(this).attr('tid'));
		if(t.attr('isshow') == 1)
		{
			t.hide();
			t.attr('isshow',0);
		}
		else
		{
			// _gaq.push(['_trackEvent', 'Movie', 'ShowComment', $(this).attr('tid') ]);
			ga('send', 'event', 'Movie', 'ShowComment', $(this).attr('tid'));
			t.show();
			req_ll("action=get_comment&cid="+t.attr('cid'),"#cc_"+t.attr('cid'));
			t.attr('isshow',1);
		}
	});

	$( ".delete_comment" ).live( "click", function()
	{
		if( $(this).attr('is_passwd') == 1 )
		{
			var passwd = prompt("비밀번호를 입력하세요.","");
			if(passwd==null || passwd=="") return;
			else req_ll("action=delete_comment&id="+$(this).attr('cid')+"&passwd="+passwd,"#output");
		}
		else
		{
			var passwd = confirm("정말로 삭제하시겠습니까?");
			if(passwd) req_ll("action=delete_comment&id="+$(this).attr('cid'),"#output");
		}
	});
	$( ".c_delete" ).live("click", function()
	{
		if( $(this).attr('is_passwd') == 1 )
		{
			var passwd = prompt("비밀번호를 입력하세요.","");
			if(passwd==null || passwd=="") return;
			else req_ll("delete="+$(this).attr('tid')+"&passwd="+passwd,"#output");
		}
		else
		{
			var passwd = confirm("정말로 삭제하시겠습니까?");
			if(passwd) req_ll("delete="+$(this).attr('tid'),"#output");
		}
	});

	$( ".ll_thumb" ).live( "mouseover mouseout", function(event)
	{
		if(event.type == 'mouseover')
		{
			$(this).find(".play_btn").show();
		} else {
			$(this).find(".play_btn").hide();
		}
	});

	$(".play_btn").live("click", function()
	{
		$(this).parent().find(".play_link").click();
		$(this).parent().find(".play_daumlink").click();
		$(this).parent().find(".play_naverlink").click();
		$(this).parent().find(".play_afreeca").click();
	});

	$( ".linkbox" ).live( "mouseover mouseout", function(event)
	{
		if(event.type == 'mouseover')
		{
			$(this).css("background-color","#FEEDDB");
		} else {
			$(this).css("background-color","");
		}
	});

	$( ".reply_comment_memo" ).live("keyup", function(ev)
	{
		if(ev.keyCode == 13)
		{
			$(this).parent().find(".reply_comment").click();
		}
	});
	$( ".comment_memo" ).live("keyup", function(ev)
	{
		if(ev.keyCode == 13)
		{
			$(this).parent().find(".do_comment").click();
		}
	});

	$( ".author_hide_comment" ).live("click", function()
	{
		var id = $(this).attr('cid');
		req_ll("action=author_hide_comment&id="+encodeURIComponent(id),"#output");
	});

	$( ".report_comment" ).live("click", function()
	{
		var id = $(this).attr('cid');
		req_ll("action=report_comment&id="+encodeURIComponent(id),"#output");
	});

	$( ".btn_go_gc").live("click", function()
	{
		var gcid = $(this).attr('gcid');
		var hh = $(window).height() / 2;
		$('html, body').animate({
			scrollTop: $(gcid).offset().top - hh + 20
		}, 500);

		$(gcid).parent().parent().effect("highlight", {}, 4000);
		$(gcid).parent().parent().parent().find(".comment_body").effect("highlight", {}, 4000);
	});

	$( ".good_comment" ).live("click", function()
	{
		var id = $(this).attr('cid');
		req_ll("action=good_comment&id="+encodeURIComponent(id),"#output");
	});

	$( ".show_hidden_comment" ).live("click", function()
	{
		var id = $(this).attr('cid');
		req_ll("action=hidden_comment&id="+encodeURIComponent(id),"#output");
	});

	$( ".show_reply_comment" ).live("click", function()
	{
		$(this).parent().parent().find(".reply_form").toggle();
	});

	$( ".reply_comment" ).live("click", function()
	{
		var name = $(this).parent().find("INPUT[name='name']");
		var comment = $(this).parent().find("INPUT[name='comm']");
		var id = $(this).parent().find("INPUT[name='id']");
		var pass = $(this).parent().find("INPUT[name='pass']");
		var from = $(this).parent().find("INPUT[name='from']");

		if ( comment.val().length > 100 || comment.val().length < 2 )
		{
			$(this).parent().find(".error").text(" 내용이 너무 짧습니다. ");
			return;
		}
		req_ll("action=reply_comment&id="+encodeURIComponent(id.val())+"&pass="+encodeURIComponent(pass.val())+"&from="+encodeURIComponent(from.val())+"&name="+encodeURIComponent(name.val())+"&comm="+encodeURIComponent(comment.val()),"#output");

		comment.val('');
		pass.val('');
		$(this).parent().find(".error").text("");
	});
	$( ".do_comment" ).live("click", function()
	{
		var name = $(this).parent().find("INPUT[name='name']");
		var comment = $(this).parent().find("INPUT[name='comm']");
		var id = $(this).parent().find("INPUT[name='id']");
		var pass = $(this).parent().find("INPUT[name='pass']");

		if ( comment.val().length > 100 || comment.val().length < 2 )
		{
			$(this).parent().find(".error").text(" 내용이 너무 짧습니다. ");
			return;
		}
		req_ll("action=do_comment&id="+encodeURIComponent(id.val())+"&pass="+encodeURIComponent(pass.val())+"&name="+encodeURIComponent(name.val())+"&comm="+encodeURIComponent(comment.val()),"#output");

		comment.val('');
		pass.val('');
		$(this).parent().find(".error").text("");
	});
	
	$( ".good_btn" ).live("click", function()
	{
		var cid = $(this).attr("cid");
		req_ll("action=good&id="+cid,"#output");
	});
	$( ".bad_btn" ).live("click", function()
	{
		var cid = $(this).attr("cid");
		req_ll("action=bad&id="+cid,"#output");
	});
	$( ".block_comment_btn" ).live("click", function()
	{
		var cid = $(this).attr("cid");
		req_ll("action=block_comment&id="+cid,"#output");
	});
	$( ".confirm_hack_btn" ).live("click", function()
	{
		var cid = $(this).attr("cid");
		req_ll("action=confirm_hack&id="+cid,"#output");
	});
	$( ".clear_report" ).live("click", function()
	{
		req_ll("action=clear_report&id="+$(this).attr('tid'),"#output");
	});
	$( ".send_report" ).live("click", function()
	{
		var con = confirm("음란물이거나 불건전 콘텐츠일 경우만 신고 부탁드립니다.\n일반 컨텐츠를 신고할 경우 IP블럭 등의 제재를 당하실 수 있습니다.");
		if(con)
		{
			req_ll("action=send_report&id="+$(this).attr('tid'),"#output");
		}
	});
});
