'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var Interest;

var interestSchema = Schema({
	name: String,
	users: [{type: Schema.Types.ObjectId, ref: "User"}]
});


Interest = mongoose.model('Interest', interestSchema);


module.exports = Interest;
