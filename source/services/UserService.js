'use strict';

var app = angular.module('randomEncounter');

app.service('UserService', function($http, ENV, $location, $rootScope, $cookies, jwtHelper){
	this.login = function(user){
		return $http.post(`${ENV.API_URL}/user/login`, user);
	};
	this.register = function(user){
		return $http.post(`${ENV.API_URL}/user/register`, user);
	};
})