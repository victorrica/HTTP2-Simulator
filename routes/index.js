
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HTTP/2 Simulator::Main' });
};


exports.Webpagetest = function(req, res){
  res.render('wpt_result', { title: 'HTTP/2 Simulator::Webpagetest' });
};

exports.contactus = function(req, res){
  res.render('contactus', { title: 'HTTP/2 Simulator::Contact Us' });
};

exports.rank = function(req, res){
  res.render('rank', { title: 'HTTP/2 Simulator::Rank' });
};

exports.result = function(req, res){
  res.render('result', { title: 'HTTP/2 Simulator::Result' });
};

exports.check_result = function(req, res){
  res.render('check_result', { title: 'HTTP/2 Simulator::Check Result' });
};


exports.check_result_http2 = function(req, res){
  res.render('check_result_http2', { title: 'HTTP/2 Simulator::Check Result' });
};


exports.progress_page = function(req, res){
  res.render('progress_page', { title: 'HTTP/2 Simulator::Progress Page' });
};

exports.mysql = function(req, res){
  res.render('mysql', { title: 'HTTP/2 Simulator::Mysql test page' });
};