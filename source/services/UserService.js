'use strict';

var app = angular.module('randomEncounter');

app.service('UserService', function($http, ENV, $location, $rootScope, $cookies, jwtHelper){
	this.login = function(user){
		return $http.post(`${ENV.API_URL}/user/login`, user);
	};
	this.register = function(user){
		return $http.post(`${ENV.API_URL}/user/register`, user);
	};
	this.findByCity = function(city){
		return $http.get(`${ENV.API_URL}/user/find/${city}`)
	}
	this.findByCityAndInterest = function(city, interest){
		return $http.get(`${ENV.API_URL}/user/find/${city}/${interest}`)
	}
	this.addInterestToSchema = function(interest, userId){
		return $http.put(`${ENV.API_URL}/user/addInterest/${interest}/${userId}`)
	}
	this.alertUser = function(userOneUsername, userTwoId){
		return $http.put(`${ENV.API_URL}/user/alertUser/${userOneUsername}/${userTwoId}`)
	}
	this.isLoggedIn = function(token){
		var authentication = {};
		if(token){
			authentication.userInfo = (jwtHelper.decodeToken($cookies.get('token')));
			authentication.isAuthed = true;
			console.log(authentication, 'cookies authentication');
			return authentication;
		}
		else if($cookies.get('token')){
			authentication.userInfo = (jwtHelper.decodeToken($cookies.get('token')));
			authentication.isAuthed = true;
			return authentication;
		} else {
			authentication.userInfo = null;
			authentication.isAuthed = false;
			return authentication;
		}
	}
})
