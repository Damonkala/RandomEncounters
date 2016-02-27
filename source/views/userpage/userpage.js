'use strict';

angular.module('randomEncounter')
.controller('userpageCtrl', function($scope, $cookies, jwtHelper, $state, UserService, $rootScope){
	$rootScope.authentication = UserService.isLoggedIn();
	if(!$rootScope.authentication.isAuthed){
		$state.go('login')
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
			console.log("HOW ABOUT NOW!?", res.data);
			for(var userIndex in res.data){
				if(res.data[userIndex].username == yourName){
					res.data.splice(userIndex, 1);
				}
				var possiblePals = res.data
				console.log("And now?!", possiblePals);
			}
			$scope.newPal = possiblePals[Math.floor(Math.random()*possiblePals.length)];
			UserService.alertUser($rootScope.authentication.userInfo.username, $scope.newPal._id)
			.then(function(res){
				console.log(res);
			})
		})
	}
	$scope.submitInterest = function(interest, userId){
		if(!interest){
			alert("You need to type up an interest first!")
		} else {
			UserService.addInterestToSchema(interest, userId)
			.then(function(res){
				$rootScope.authentication = UserService.isLoggedIn(res.data);
			})
		}
	}
})
