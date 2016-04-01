'use strict';

angular.module('randomEncounter')
.controller('userpageCtrl', function($scope, $cookies, jwtHelper, $state, UserService, $rootScope, InterestService){

	$rootScope.authentication = UserService.isLoggedIn();
	if(!$rootScope.authentication.isAuthed){
		$state.go('login')
	}

	$scope.getInterests = function(currentUserId){
		InterestService.getInterests(currentUserId)
		.then(function(res){
			$scope.interests = res.data.interests
			console.log("interests", $scope.interests);
		})
	}
	$scope.getInterests($rootScope.authentication.userInfo._id);
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
	$scope.submitInterest = function(interest){
		if(!interest){
			alert("You need to type up an interest first!")
		} else {
			InterestService.addInterestToSchema(interest, $rootScope.authentication.userInfo._id)
			.then(function(res){
				$scope.getInterests($rootScope.authentication.userInfo._id);
			})
		}
	}
	$scope.removeInterest = function(interestId){
		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this imaginary file!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel plx!",
			closeOnConfirm: false,
			closeOnCancel: false },
			function(isConfirm){
				if (isConfirm) {
					InterestService.removeInterestFromSchema(interestId, $rootScope.authentication.userInfo._id)
					.then(function(res){
						$scope.getInterests($rootScope.authentication.userInfo._id);
						swal("Deleted!", "Your imaginary file has been deleted.", "success");
					})
				} else {
					swal("Cancelled", "Your imaginary file is safe :)", "error");   } });
				}
			})


















			//
