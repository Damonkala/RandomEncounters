'use strict';

var app = angular.module('randomEncounter');

app.service('UserService', function($http, ENV, $location, $rootScope, $cookies, jwtHelper){
	this.login = function(user){
		return $http.post(`/user/login`, user);
	};
	this.register = function(user){
		return $http.post(`/user/register`, user);
	};
	this.findByCity = function(city){
		return $http.get(`/user/find/${city}`)
	}
	this.findByCityAndInterest = function(city, interest){
		return $http.get(`/user/find/${city}/${interest._id}`)
	}
	this.alertUser = function(userOneUsername, userTwoId){
		return $http.put(`/user/alertUser/${userOneUsername}/${userTwoId}`)
	}
	this.loadUserPage = function(user){
		return $http.get(`/user/userpage`, user)
	}
	this.isLoggedIn = function(token){
		var authentication = {};
		if(token){
			authentication.userInfo = (jwtHelper.decodeToken($cookies.get('token')));
			authentication.isAuthed = true;
			console.log(authentication, 'cookies authentication');
			return authentication;
		}
		else
		if($cookies.get('token')){
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
