'use strict';

angular.module('randomEncounter')
.controller('userpageCtrl', function($scope, $cookies, jwtHelper, $state, UserService){
	var cookies = $cookies.get('token');
	if(cookies){
		$scope.userInfo = (jwtHelper.decodeToken(cookies))
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
			console.log(possiblePals);
			var newPal = possiblePals[Math.floor(Math.random()*possiblePals.length)];
			console.log(newPal.username);
		})
	}
})
