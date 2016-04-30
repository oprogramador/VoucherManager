var userRepository = {};
var connector = require('./connector.js');
var bcrypt = require('bcrypt');

userRepository.verify = function(username, password, callback) {
  connector.connect(function(err, db) {
    if(!err) {
      var users  = db.collection('users');
      var result = users.findOne({username: username}, function(err, record) {
        if(!record) {
          callback(false);
        } else {
          var result = bcrypt.compareSync(password, record.password);
          callback(result);
        }
      });
    } else {
      callback(false);
    }
  });
}

module.exports = userRepository;
