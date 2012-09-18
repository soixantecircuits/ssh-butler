/*
 * GET home page.
 */

var utils = require('../utils.js'),
  _ = require('underscore');

exports.index = function(req, res) {
  // http://nodejs.org/api.html#_child_processes
  var sys = require('sys');
  var exec = require('child_process').exec;
  var child;
  var ssh_list = [];

  child = exec("lsof -i -n | egrep 'ssh'", function(error, stdout, stderr) {
    //sys.print(stdout);
    var param = ['command', 'pid', 'user', 'fd', 'type', 'device', 'size_off', 'node', 'name', 'status'];
    var process = '';
    _.each(stdout.split(/[\n\r]{1,2}/m), function(el, index) {
      if (el != "") {
        process = '{';
        _.each(utils.allTrim(el).split(" "), function(el, index) {
          if (param[index] !== 'status') {
            process += '"' + param[index] + '":' + JSON.stringify(el) + ',';
          } else {
            process += '"' + param[index] + '":' + JSON.stringify(el.replace("(","").replace(")","")).toLowerCase();
          }
        });
        process += '}';
        ssh_list.push(JSON.parse(process));
      }
    });
    //console.log(ssh_list);
    res.render('index', {
      title: 'Ssh Butler v0.1',
      data: ssh_list
    });

    if (stderr != '') sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
};