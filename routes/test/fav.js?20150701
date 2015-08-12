function objectLength(obj)
{
        var result = 0;
        for(var prop in obj)
        {
                if (obj.hasOwnProperty(prop))
                {
                        result++;
                }
        }
        return result;
}

function fav_internalName(s)
{
        s = s.toLowerCase();
        s = s.replace(/ /g,'');
        return s;
}
function add_fav(iname,name)
{
        if(typeof(Storage) !== "undefined" && localStorage)
        {
                var users;
                if( localStorage.fav_user )
                {
                        users = JSON.parse(localStorage.fav_user);
                }
                else
                {
                        users = new Object();
                }
                users[iname] = name;
                localStorage.fav_user = JSON.stringify(users);
		// _gaq.push(['_trackEvent', 'fav', 'add']);
		ga('send', 'event', 'fav', 'add');
        }
        else
        {
                var users;
                var ck = $.cookie('FAV');
                if( ck )
                {
                        users = JSON.parse(ck);
                }
                else
                {
                        users = new Object();
                }
                if( objectLength(users) > 10 )
                {
			alert('쿠키모드에서는 10명까지만 지원합니다.');
                }
                else
                {
                        users[iname] = name;
                        $.cookie('FAV',JSON.stringify(users));
			// _gaq.push(['_trackEvent', 'fav', 'cookie_add']);
			ga('send', 'event', 'fav', 'cookie_add');
                }
        }

}
function del_fav(name)
{
        if(typeof(Storage) !== "undefined" && localStorage)
        {
                var users;
                if( localStorage.fav_user )
                {
                        users = JSON.parse(localStorage.fav_user);
                }
                else
                {
                        return;
                }
                delete users[fav_internalName(name)];
                localStorage.fav_user = JSON.stringify(users);
		// _gaq.push(['_trackEvent', 'fav', 'del']);
		ga('send', 'event', 'fav', 'del');
        }
        else
        {
                var users;
                var ck = $.cookie('FAV');
                if( ck )
                {
                        users = JSON.parse(ck);
                }
                else
                {
                        return;
                }
                delete users[fav_internalName(name)];
                $.cookie('FAV',JSON.stringify(users));
		// _gaq.push(['_trackEvent', 'fav', 'cookie_del']);
		ga('send', 'event', 'fav', 'cookie_del');
        }

}
function get_fav(name)
{
        if(typeof(Storage) !== "undefined" && localStorage)
        {
                var users;
                if( localStorage.fav_user )
                {
                        users = JSON.parse(localStorage.fav_user);
			if(users[fav_internalName(name)])
				return users[fav_internalName(name)];
			else
				return null;
                }
		return null;
        }
        else
        {
                var users;
                var ck = $.cookie('FAV');
                if( ck )
                {
                        users = JSON.parse(ck);
                        if(users[fav_internalName(name)])
                                return users[fav_internalName(name)];
                        else
                                return null;
                }
                return null;
        }

	return false;
}
function clear_fav()
{
        if(typeof(Storage) !== "undefined" && localStorage)
        {
                if( localStorage.fav_user )
                {
                        localStorage.removeItem("fav_user");
                }
        }
        else
        {
                var users;
                var ck = $.cookie('FAV');
                if( ck )
                {
                        $.cookie('FAV',null);
                }
        }

}
function get_all_fav()
{
        if(typeof(Storage) !== "undefined" && localStorage)
        {
                var users;
                if( localStorage.fav_user )
                {
                        users = JSON.parse(localStorage.fav_user);
                        return users;
                }
        }
        else
        {
                var users;
                var ck = $.cookie('FAV');
                if( ck )
                {
                        users = JSON.parse(ck);
                        return users;
                }
        }
}

