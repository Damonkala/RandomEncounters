'use strict';

var app = angular.module('randomEncounter');

app.service('InterestService', function($http, $location, $rootScope, $cookies, jwtHelper){
	this.getInterests = function(currentUserId){
		return $http.get(`interests/${currentUserId}`)
	}
	this.addInterestToSchema = function(interest, userId){
		return $http.put(`/interests/addInterest/${interest}/${userId}`)
	}
	this.removeInterestFromSchema = function(interestId, userId){
		return $http.put(`/interests/removeInterest/${interestId}/${userId}`)
	}
	this.editInterest = function(oldInterest, newInterest, user){
		return $http.put(`/interests/editInterest/${oldInterest}/${newInterest}/${user}`)
	}
})
