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
router.put('/alertUser/:sender/:receiver', function(req,res){
  User.findByIdAndUpdate(req.params.receiver, {$push: {alerts : req.params.sender}}, function(err, user){
    res.status(err ? 400 : 200).send(err || user)
  })
})
router.put('/addInterest/:interest/:userId', function(req, res){
  User.findByIdAndUpdate(req.params.userId, {$push: {interests : req.params.interest}}, function(err, user){
    if(err){
      res.status(400).send(err);
    }
    User.findById(req.params.userId, function(err, updatedUser){
      if(err){
        res.status(400).send(err);
      }
      updatedUser.password = null
      var newToken = jwt.encode(updatedUser, process.env.JWT_SECRET)
      res.cookie("token", newToken)
      res.send(newToken)
    })
  })
})

module.exports = router;
