
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HTTP2-Simulator::Main' });
};


exports.Webpagetest = function(req, res){
  res.render('Webpagetest', { title: 'HTTP2-Simulator::Webpagetest' });
};