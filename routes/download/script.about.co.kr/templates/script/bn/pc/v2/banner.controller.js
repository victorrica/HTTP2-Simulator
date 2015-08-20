function adbayGetFileExtension(filename)
{
    var extension = filename.replace(/^.*\./, '');
    if (extension == filename)
        extension = '';
    else
        extension = extension.toLowerCase();
    return extension;
}

function adbayGetFlashBannerCode(src, click, width, height)
{
	var code = '<div class="flashAvdArea" style="position:relative;">' +
	'<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
	'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" WIDTH="'+width+'" HEIGHT="'+height+'" id="mx" ALIGN="">' +
	'<PARAM NAME=movie VALUE="'+src+'?click='+click+'">' +
	'<PARAM NAME=quality VALUE=high><PARAM NAME=wmode VALUE=transparent>' +
	'<PARAM NAME=bgcolor VALUE=#FFFFFF>' +
	'<param name="allowScriptAccess" value="always">' +
	'<EMBED src="'+src+'?click='+click+'"' +
	'quality=high wmode=transparent bgcolor="#FFFFFF" ALIGN="" WIDTH="'+width+'" HEIGHT="'+height+'" TYPE="application/x-shockwave-flash" allowScriptAccess="always"' +
	'PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>' +
	'</div>';
	return code;
}

function adbayBannerCallback()
{
	var code		= '';
	var extension	= adbayGetFileExtension(adbayAdsContents['creatives'][0]['src']);

	if(extension == 'swf')
		code	= adbayGetFlashBannerCode(adbayAdsContents['creatives'][0]['src'], adbayAdsContents['creatives'][0]['click'], adbayAdsContents['width'], adbayAdsContents['height']);
	else
		code	= '<a href="'+adbayAdsContents['creatives'][0]['click']+'" target="_blank"><img src="'+adbayAdsContents['creatives'][0]['src']+'" width="'+adbayAdsContents['width']+'" height="'+adbayAdsContents['height']+'" /></a>';

	$("#adbay_bn_layer").html(code);
	$("#iBan span").css('border-color', adbayAdsContents['bg-color']);
	$("#iBan").show();
	noImageCheck();
}