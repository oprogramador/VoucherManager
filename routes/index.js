var express = require('express');
var router = express.Router();
var voucherRepository = require('../db/voucherRepository.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'VoucherManager' });
});

router.get('/generate/create/:n/:amount', function(req, res, next) {
  var n = req.param('n');
  var amount = req.param('amount');
  voucherRepository.save(res, n, amount);
});

router.get('/generate/getAll/:serieHash', function(req, res, next) {
  var serieHash = req.param('serieHash');
  voucherRepository.getAll(res, serieHash);
});

module.exports = router;
