
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HTTP2-Simulator::Main' });
};


exports.Webpagetest = function(req, res){
  res.render('Webpagetest', { title: 'HTTP2-Simulator::Webpagetest' });
};

exports.contactus = function(req, res){
  res.render('contactus', { title: 'HTTP2-Simulator::Contact Us' });
};

exports.rank = function(req, res){
  res.render('rank', { title: 'HTTP2-Simulator::Rank' });
};

exports.check_result = function(req, res){
  res.render('check_result', { title: 'HTTP2-Simulator::Check Result' });
};


exports.progress_page = function(req, res){
  res.render('progress_page', { title: 'HTTP2-Simulator::Progress Page' });
};

exports.mysql = function(req, res){
  res.render('mysql', { title: 'HTTP2-Simulator::Mysql test page' });
};