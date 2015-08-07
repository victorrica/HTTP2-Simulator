var fs = require('fs');
var dir = './tmp';

ensureExists('./upload', 0744, function(err) {
    if (err)
    	console.log(err);
    else
    	console.log("make folder");
});

