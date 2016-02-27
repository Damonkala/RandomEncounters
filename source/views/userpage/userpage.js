'use strict';

angular.module('randomEncounter')
.controller('userpageCtrl', function($scope, $cookies, jwtHelper, $state, UserService){
	var cookies = $cookies.get('token');
	if(cookies){
		$scope.userInfo = (jwtHelper.decodeToken(cookies))
		console.log($scope.userInfo);
		$scope.loggedIn = true;
	} else {
		$scope.loggedIn = false;
		$state.go('home')
	}
	$scope.findFriendIn = function(location, username){
		var yourName = username;
		UserService.findByCity(location, username)
		.then(function(res){
			for(var userIndex in res.data){
				if(res.data[userIndex].username == yourName){
					res.data.splice(userIndex, 1);
				}
				var possiblePals = res.data
			}
			$scope.newPal = possiblePals[Math.floor(Math.random()*possiblePals.length)];
		})
	}
	$scope.findByCityAndInterest = function(location, interest, username){
		var yourName = username;
		UserService.findByCityAndInterest(location, interest)
		.then(function(res){
			for(var userIndex in res.data){
				if(res.data[userIndex].username == yourName){
					res.data.splice(userIndex, 1);
				}
				var possiblePals = res.data
			}
			$scope.newPal = possiblePals[Math.floor(Math.random()*possiblePals.length)];
		})
	}
	$scope.submitInterest = function(interest, userId){
		$scope.interestInput = '';
		if(!interest){
			alert("You need to type up an interest first!")
		} else {
			UserService.addInterestToSchema(interest, userId)
			.then(function(res){
				console.log(res);
				$scope.userInfo = (jwtHelper.decodeToken(res.data))
			})
		}
	}
})
