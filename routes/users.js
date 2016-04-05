'use strict'

var express = require('express')
var router = express.Router();

var User = require('../models/User');

var jwt = require('jwt-simple');


router.post('/login', function(req, res){
  User.login(req.body, function(err, user){
    console.log("Hello babby!", user);
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
  User.find({ $and: [ { location: req.params.city }, { interests: req.params.interest } ] }, function(err, users) {
    res.status(err ? 400 : 200).send(err || users)
  })
})
router.put('/alertUser/:sender/:receiver', function(req,res){
  User.findByIdAndUpdate(req.params.receiver, {$push: {alerts : req.params.sender}}, function(err, user){
    res.status(err ? 400 : 200).send(err || user)
  })
})
router.put('/updateLocation/:user/:location', function(req, res){
  User.findByIdAndUpdate(req.params.user, {$set:{location: req.params.location}}, function(err, user){
    res.status(err ? 400 : 200).send(err || user)
  })
})

module.exports = router;
// {$push: {users : req.params.userId}}
