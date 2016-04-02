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
router.put('/editInterest/:oldInterest/:newInterest/:user', function(req, res){
  Interest.findOne({name: req.params.newInterest}, function(err, newInterest){
    if(newInterest){
      var newInterest = newInterest;
      Interest.findByIdAndUpdate(newInterest._id, {$push: {users: req.params.user}}, function(err, newInterest){
        if(newInterest){
          console.log("ADD THIS ONE", newInterest._id);
          console.log("REMOVE THIS ONE", req.params.oldInterest);
          Interest.findByIdAndUpdate(req.params.oldInterest, {$pull: {users: req.params.user}}, function(err, oldInterest){
            if(oldInterest){
              console.log("All is going as planned.", console.log(oldInterest));
              User.findByIdAndUpdate(req.params.user, {$pull: {interests: oldInterest._id}}, function(err, user){
                if(user){
                  console.log("All is still going as planned");
                  User.findByIdAndUpdate(user._id, {$push: {interests: newInterest._id}}, function(err, user){
                    if(user){
                      console.log("Upd8d user: ", user);
                      res.send(user);
                    } else if (err) {
                      console.log(err);
                      console.log("SUPER FUCK");
                    }
                  })
                }
              })
            }
          })
        }
      })
    } else{
      console.log("YOUSER!", req.params.user);
      Interest.create({name: req.params.newInterest, users : req.params.user}, function(err, interest){
        console.log("Gate 1: ", interest);
        if(interest){
          console.log("YES NOW MOVE ON!");
          User.findByIdAndUpdate(req.params.user, {$push: {interests: interest._id}}, function(err, user){
            console.log("Gate 2: ", user);
            if(err){
              console.log("ERROR SQUAD!: ", err);
            }
            User.findByIdAndUpdate(user._id, {$pull: {interests: req.params.oldInterest}}).populate('interests').exec(function(err, user){
              console.log("Gate 3: ", user);
              res.send(user);
            })
          })
        }
      })
    }
  })
})
module.exports = router;
// {$push: {users : req.params.userId}}


















//
