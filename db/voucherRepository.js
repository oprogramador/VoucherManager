var voucherRepository = {};
var randomstring = require('randomstring');
var connector = require('./connector.js');

voucherRepository.save = function(res, n, amount) {
  var serieHash = randomstring.generate();
  connector.connect(function(err, db) {
    if(!err) {
      var vouchers  = db.collection('vouchers');
      var indexes = [];
      for(var i = 0; i < n; i++) {
        var record = {amount: amount, serieHash: serieHash};
        vouchers.save(record);
        indexes.push(record._id);
      }
      res.json({serieHash: serieHash});
    } else {
      res.send('error with db');
    }
  });
}

voucherRepository.getAll = function(res, serieHash) {
  connector.connect(function(err, db) {
    if(!err) {
      var vouchers  = db.collection('vouchers');
      var result = vouchers.find({serieHash: serieHash}, function(err, cursor) {
        if(!err) {
          cursor.toArray(function(err, data) {
            res.json(data);    
          });
        } else {
          res.send('error with db');
        }
      });
    } else {
      res.send('error with db');
    }
  });
}

module.exports = voucherRepository;
