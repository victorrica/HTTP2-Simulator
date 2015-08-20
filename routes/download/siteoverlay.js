/**
 *  Nethru Script Module
 *  Copyright 2012 nethru, All Rights Reserved.
 *  using at no logging server 
 **/

var _wn_so_pid = null;
var _wn_wlo_image = new Image();

function wn_so_pid(pid)
{
	_wn_so_pid = pid;
}

function wn_so_logging(x,y,w) 
{
	if ( _wn_so_pid == null )
		return;
	
	var _wn_so_value = _wn_so_pid+"|"+x+"|"+y+"|"+w;

	_wn_wlo_image.src = "/wloso.html?wlo_so=" + _wn_so_value + "&dv=" + Math.random();
}

function wn_so_mc(e) 
{
	var db = document.body;
	var w = 0;
	var sl = 0;
	var st = 0;

	if ( e == null ) e = window.event;

	try {
		w = db.clientWidth;
	}
	catch(ex) {
		if ( typeof(window.innerWidth) != "undefined" ) w = window.innerWidth;
		else return;
	}


	try {
		if ( db.scrollLeft || db.scrollTop ) {
			sl = db.scrollLeft;
			st = db.scrollTop;
		}
		else {
			var dd = document.documentElement;
			if ( dd.scrollTop || dd.scrollLeft ) {
				sl = dd.scrollLeft;
				st = dd.scrollTop;
			}
		}
	}
	catch(ex) {
		return;
	}

	x = e.clientX + sl;
	y = e.clientY + st;

	wn_so_logging(x,y,w);
}

document.onmousedown=wn_so_mc;

