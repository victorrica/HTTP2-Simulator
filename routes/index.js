
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HTTP2-Simulator::Main' });
};