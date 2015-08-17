var process = require("child_process");
var spawn = process.spawn;
var page = require('webpage').create(),
    system = require('system'),
    address;
var fs = require('fs');
var folders = [];
if (system.args.length === 1) {
    console.log('Usage: netlog.js <some URL>');
    phantom.exit(1);
} else {
    address = system.args[1];
    originURL = parseURL(address).domain;

    page.onResourceRequested  = function (req) {

		var URL = req.url;

		var parsedURL = parseURL(req.url);

		var localPath = parsedURL.path;

		//index 처리
		if(localPath.substr(-1) == "/")
			localPath = "index.html";

		//?date 처리
		if(localPath.indexOf("?") > -1) {
			localPath = localPath.slice(0,localPath.indexOf("?"));
		}
		//console.log(URL + "\n" + originURL.replace("www.", ""));
		//Domain Sharding 처리
		if(originURL.replace("www.", "") != parsedURL.domain.replace("www.", ""))
        {
			localPath = parsedURL.domain + "/" + localPath;
            folders.push(localPath);
        }

		var child = spawn("node", ["download.js", URL, localPath]);

	//	console.log(JSON.stringify(res, undefined, 4));
		//console.log(res.url + "\n" + localPath);
/*
		child.stdout.on("data", function (data) {
			console.log(data);
		});
*/
		child.stderr.on("data", function (data) {
		    console.log("Download Error : " + parseURL(req.url).path);
		});
/*
		child.on("exit", function (code) {
		  	console.log("Download Done : " + parseURL(res.url).path);
		});
		*/

    };

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        }
        exit(0);
    });
}

function exit(code) {
    setTimeout(function(){ phantom.exit(code); }, 0);
	phantom.onError = function(){};

	data = fs.read('./download/index.html');
    for(var i=0;i<folders.length;i++)
    {
        var re = new RegExp('http://' + folders[i], 'g');
        data = data.replace(re, '/' + folders[i]);
        re = new RegExp('//' + folders[i],'g');
        data = data.replace(re, '/' + folders[i]);
    }
    re = new RegExp('http://' + originURL,'g');
    data = data.replace(re, '');
    fs.write('./download/index.html',data,'w');
}
function parseURL(url){
    parsed_url = {}

    if ( url == null || url.length == 0 )
        return parsed_url;

    protocol_i = url.indexOf('://');
    parsed_url.protocol = url.substr(0,protocol_i);

    remaining_url = url.substr(protocol_i + 3, url.length);
    domain_i = remaining_url.indexOf('/');
    domain_i = domain_i == -1 ? remaining_url.length : domain_i;
    parsed_url.domain = remaining_url.substr(0, domain_i);
    parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

    domain_parts = parsed_url.domain.split('.');
    switch ( domain_parts.length ){
        case 2:
          parsed_url.subdomain = null;
          parsed_url.host = domain_parts[0];
          parsed_url.tld = domain_parts[1];
          break;
        case 3:
          parsed_url.subdomain = domain_parts[0];
          parsed_url.host = domain_parts[1];
          parsed_url.tld = domain_parts[2];
          break;
        case 4:
          parsed_url.subdomain = domain_parts[0];
          parsed_url.host = domain_parts[1];
          parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
          break;
    }

    parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;

    return parsed_url;
}
