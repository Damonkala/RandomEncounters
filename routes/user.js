'use strict'

var express = require('express')
var router = express.Router();

var User = require('../models/User');

var jwt = require('jwt-simple');

router.post('/login', function(req, res){
  User.login(req.body, function(err, user){
    if(user){
      var token = jwt.encode(user, process.env.JWT_SECRET);
      res.send(token)
    } else{
      res.send('Incorrect Username or Password!')
    }
  })
})

router.post('/register', function(req, res){
  User.register(req.body, function(err, user){
    res.send(user)
  })
})

router.get('/find/:city', function(req, res){
  User.find({'location' : req.params.city}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users)
  })
})

router.get('/find/:city/:interest', function(req, res){
  console.log("CITY AND INTEREST", req.params.city, req.params.interest);
  User.find({ $and: [ { location: req.params.city }, { interests: req.params.interest } ] }, function(err, users) {
    console.log("Hey guys!", users);
    res.status(err ? 400 : 200).send(err || users)
  })
})
module.exports = router;
