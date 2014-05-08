var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

// connect to mongodb
var db = mongojs('JJsOrderServer', ['orders']);

router.get('/add', function(req, res) {
	if (req.query.name && req.query.place && req.query.time) {
		var d = new Date();
		var dateQuery = d.getDay() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
		db.orders.save({
			date: dateQuery,
			name: req.query.name,
			place: req.query.place,
			time: req.query.time
		}, function(err, doc) {
			res.jsonp({
				success: true
			});
		});
	} else {
		res.jsonp({
			success: false,
			message: 'Invalid prameters.'
		});
	}
});

router.get('/remove/:id', function(req, res) {
	if (req.params.id) {
		db.orders.remove({
			_id: mongojs.ObjectId(req.params.id)
		}, function(err, success) {
			res.jsonp({
				success: true
			});
		});
	} else {
		res.jsonp({
			success: false,
			message: 'Invalid prameters.'
		});
	}
});

router.get('/list', function(req, res) {
	var d = new Date();
	var dateQuery = d.getDay() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	db.orders.find({
		date: dateQuery
	}, function(err, docs) {
		res.jsonp({
			success: true,
			orders: docs
		});
	});
});

router.get('/count', function(req, res) {
	var d = new Date();
	var dateQuery = d.getDay() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	db.orders.count({
		date: dateQuery
	}, function(err, count) {
		res.jsonp({
			success: true,
			count: count
		});
	});
});

module.exports = router;