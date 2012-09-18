
/*
 * GET list of ssh connection.
 */

exports.list = function(req, res){
  res.render('list', { title: 'List of ssh open connection' });
};

