var process = require("child_process");
var spawn = process.spawn;
var page = require('webpage').create(),
    system = require('system'),
    address;
var fs = require('fs');
var folders = [],header = {};
if (system.args.length === 1) {
    console.log('Usage: netlog.js <some URL>');
    phantom.exit(1);
} else {
    address = system.args[1];
    path = system.args[2];
    originURL = parseURL(address).domain;

    page.onResourceReceived  = function (res) {

		var URL = res.url;

        if(res.redirectURL)
          URL = res.redirectURL;

		if(res.redirectURL && parseURL(res.redirectURL).host == parseURL(URL).host)
			originURL = parseURL(res.redirectURL).domain;

		var parsedURL = parseURL(URL);

		var localPath = parsedURL.path;

		//index 처리
		if(localPath == null || localPath.substr(-1) == "/")
			localPath = "index.html";

		//?date 처리
		if(localPath.indexOf("?") > -1) {
			localPath = localPath.slice(0,localPath.indexOf("?"));
		}

		//Domain Sharding 처리
		if(originURL.replace("www.", "") != parsedURL.domain.replace("www.", ""))
        {
			localPath = parsedURL.domain + "/" + localPath;
            folders.push(localPath);
        }

        //header 처리
		header["host"] = parsedURL.domain;
		header["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36";
        for(var i=0;i<res.headers.length;i++)
	       header[res.headers[i].name] = res.headers[i].value;
        var options = {
			hostname: parsedURL.domain,
			port : parsedURL.protocol=="http"?parsedURL.protocol=80:parsedURL.protocol=443,
			path: parsedURL.path==null?parsedURL.path="/":parsedURL.path="/"+parsedURL.path,
			method: "GET",
			headers: header
		};

		// 다운로드 호출
		var child = spawn("node", ["download.js", JSON.stringify(options), localPath, path]);

		child.stdout.on("data", function (data) {
			console.log(data);
		});
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

	data = fs.read('/usr/local/nginx/html/' + path + '/index.html');
    for(var i=0;i<folders.length;i++)
    {
        var re = new RegExp('http://' + folders[i], 'g');
        data = data.replace(re, '/' + folders[i]);
        re = new RegExp('//' + folders[i],'g');
        data = data.replace(re, '/' + folders[i]);
    }
    re = new RegExp('http://' + originURL,'g');
    data = data.replace(re, '');
    re = new RegExp('https://' + originURL,'g');
    data = data.replace(re, '');
    fs.write('/usr/local/nginx/html/' + path + '/index.html',data,'w');
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
