var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Lunch Out Server',
		tagline: 'where you can see who in the office is going out for lunch.'
	});
});

module.exports = router;