var express = require('express');
var router = express.Router();
var voucherRepository = require('../db/voucherRepository.js');
var dbResponseAdapter = require('../db_response/dbResponseAdapter.js');
var voucherValidator = require('../validator/voucherValidator.js');

	router.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

router.post('/generate/create/:params', function(req, res, next) {
  var params = JSON.parse(req.params['params']);
  if(!voucherValidator.validateNumber(params['n'])) {
    res.json({error: true, msg: 'invalid number'});   
  } else {
    voucherRepository.save(dbResponseAdapter.create(res), params);
  }
});

router.post('/generate/getAll/:params', function(req, res, next) {
  var params = JSON.parse(req.params['params']);
  voucherRepository.getAll(dbResponseAdapter.create(res), params);
});

router.post('/generate/get/:params', function(req, res, next) {
  var params = JSON.parse(req.params['params']);
  voucherRepository.get(dbResponseAdapter.create(res), params);
});

router.post('/generate/use/:id', function(req, res, next) {
  var id = req.params['id'];
  voucherRepository.use(dbResponseAdapter.create(res), id);
});

module.exports = router;
