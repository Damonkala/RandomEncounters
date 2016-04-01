'use strict'

var express = require('express')
var router = express.Router();

var User = require('../models/User');
var Interest = require('../models/Interest');

var jwt = require('jwt-simple');

router.get('/:id', function(req, res){
  User.findById(req.params.id, 'interests -_id').populate('interests').exec(function(err, user){
    if(user){
      console.log("We didn't fuck up and got the interests");
      res.send(user)
    } else if (err) {
      console.log("I probably fucked up on the select sytax");
      res.status('404')
    } else {
      console.log("I done fucked up completely!");
    }
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
  Interest.findByIdAndUpdate(req.params.interestId, {$pull: {users: req.params.userId}}, function(err, interest){
    if(interest){
      User.findByIdAndUpdate(req.params.userId, {$pull: {interests: interest._id}}).populate('interests').exec(function(err, user){
        if(user){
          res.send(user)
        }
      })
    }
  })
})

module.exports = router;
// {$push: {users : req.params.userId}}


















//
