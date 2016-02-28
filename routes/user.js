'use strict'

var express = require('express')
var router = express.Router();

var User = require('../models/User');
var Interest = require('../models/Interest');

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
  User.find({ $and: [ { location: req.params.city }, { interests: req.params.interest } ] }, function(err, users) {
    res.status(err ? 400 : 200).send(err || users)
  })
})
router.put('/alertUser/:sender/:receiver', function(req,res){
  User.findByIdAndUpdate(req.params.receiver, {$push: {alerts : req.params.sender}}, function(err, user){
    res.status(err ? 400 : 200).send(err || user)
  })
})
router.put('/addInterest/:interest/:userId', function(req, res){
  Interest.findOne({name: req.params.interest}, function(err, interest){
    if(!interest){
      Interest.create({name: req.params.interest, users : req.params.userId}, function(err, interest){
        User.findByIdAndUpdate(req.params.userId, {$push: {interests : interest._id}}, function(err, user){
          user.password = null;
          console.log("NEW user?:", user);
          // res.send(user)
          User.findById(user._id).populate('interests').exec(function(err, user){
            res.send(user)
          })
        })
      })
    } else {
      if(interest.users.indexOf(req.params.userId) == -1){
        console.log("If the interest does not have the user it will be added now");
        interest.users.push(req.params.userId)
        interest.save(function(err, savedInterest){
          User.findByIdAndUpdate(req.params.userId, {$push: {interests : savedInterest._id}}, function(err, user){
            user.password = null;
            console.log("NEW user?:", user);
            // res.send(user)
            User.findById(user._id).populate('interests').exec(function(err, user){
              res.send(user)
            })
          })
        })
      }
    }
  })
})
router.put('/removeInterest/:interestId/:userId', function(req, res){
  User.findByIdAndUpdate(req.params.userId, {$pull: {interests: req.params.interestId}}).populate('interests').exec(function(err, user){
    Interest.findByIdAndUpdate(req.params.interestId, {$pull: {users: req.params.userId}})
    console.log("We have a ", user);
    res.send(user)
  })
})

module.exports = router;
// {$push: {users : req.params.userId}}
