'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var User;

var userSchema = Schema({
	email:{type: String, required: true, unique: true},
	username: { type: String, required: true, unique: true},
	name: {type: String, required: true},
	password: { type: String, required: true },
	location: { type: String},
	interests: [{type: Schema.Types.ObjectId, ref: "Interest"}],
	alerts: { type: Array}
});


userSchema.statics.register = function(user, cb){
	var username = user.username;
	var email = user.email;
	var name = user.name;
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, password) {
			User.find({$or: [{username: username}, {email: email}] }, function(err, user){
				if (err || user[0]){return console.log(err) || console.log("Username or email already exists")}
				var newUser = new User;
				newUser.username = username;
				newUser.email = email;
				newUser.name = name;
				newUser.password = password;
				newUser.save(function(err, savedUser){
					savedUser.password = null;
					cb(err, savedUser)
				})
			})
		});
	});
}


userSchema.statics.login = function(user, cb){
	var username = user.username;
	var password = user.password;
	User.findOne({username: username}).populate('interests').exec(function(err, dbUser){
		if(err || !dbUser) return cb(err || 'Incorrect username or password');
		bcrypt.compare(user.password, dbUser.password, function(err, correct){
			if(err || !correct) return cb(err || 'Incorrect username or password');
			dbUser.password = null;
			console.log("We're going somewhere, who knows where", dbUser);
			cb(null, dbUser);
		})
	})
}

User = mongoose.model('User', userSchema);


module.exports = User;
