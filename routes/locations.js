'use strict'

var express = require('express')
var router = express.Router();

var request = require('request');

var http = require("http");
var https = require("https");

var GOOGLE_KEY = process.env.GOOGLE_MAP;
var unirest = require('unirest');

router.put('/getCoords/:lat/:long', function(req, res){
	unirest.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.long}&key=${GOOGLE_KEY}`)
		.end(function (result) {
			console.log(result);
			res.send(result.body);
		});
	// https.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.long}&key=${GOOGLE_KEY}`)

	// var req = https.request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.long}&key=${GOOGLE_KEY}`, (res) => {
	// 	console.log(`STATUS: ${res.statusCode}`);
	// 	console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	// 	res.setEncoding('utf8');
	// 	res.on('data', (chunk) => {
	// 		console.log(`BODY: ${chunk}`);
	// 	});
	// 	res.on('end', () => {
	// 		console.log('No more data in response.')
	// 	})
	// });
	// req.end();
})



module.exports = router;
// {$push: {users : req.params.userId}}
