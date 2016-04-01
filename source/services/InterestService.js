'use strict';

var app = angular.module('randomEncounter');

app.service('InterestService', function($http, ENV, $location, $rootScope, $cookies, jwtHelper){
	this.getInterests = function(currentUserId){
		return $http.get(`interests/${currentUserId}`)
	}
	this.addInterestToSchema = function(interest, userId){
		return $http.put(`/interests/addInterest/${interest}/${userId}`)
	}
	this.removeInterestFromSchema = function(interestId, userId){
		return $http.put(`/interests/removeInterest/${interestId}/${userId}`)
	}
})