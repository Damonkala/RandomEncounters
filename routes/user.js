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
    console.log(users);
    res.status(err ? 400 : 200).send(err || users)
  })
})
module.exports = router;
