var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var randomstring = require('randomstring');

var vouchers;
MongoClient.connect('mongodb://localhost:27017/VoucherManager', function(err, db) {
  if(!err) {
    vouchers  = db.collection('vouchers');
  }
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'VoucherManager' });
});

router.get('/generate/create/:n/:amount', function(req, res, next) {
  var n = req.param('n');
  var amount = req.param('amount');
  var serieHash = randomstring.generate();
  MongoClient.connect('mongodb://localhost:27017/VoucherManager', function(err, db) {
    if(!err) {
      var vouchers  = db.collection('vouchers');
      var indexes = [];
      for(var i = 0; i < n; i++) {
        var record = {amount: amount, serieHash: serieHash};
        vouchers.save(record);
        indexes.push(record._id);
      }
    }
  });
  res.json({serieHash: serieHash});
});

router.get('/generate/getAll/:serieHash', function(req, res, next) {
  var serieHash = req.param('serieHash');
  if(vouchers) {
    var result = vouchers.find({serieHash: serieHash}, function(err, cursor) {
      if(!err) {
        cursor.toArray(function(err, data) {
          res.json(data);   
        });
      }
    });
  }
});

module.exports = router;
