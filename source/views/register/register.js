'use strict';

angular.module('randomEncounter')
.controller('registerCtrl', function($scope, UserService, $state, $cookies, jwtHelper, $rootScope){
	$rootScope.authentication = UserService.isLoggedIn();
	$scope.submit = function(user){
		if(user.password !== user.password2){
			swal("The passwords don't match!", "error")
			return;
		}
		if(!user.email){
			swal("You didn't put in an email address!", "error")
			return;
		}
		UserService.register(user)
		.then(function(data){
			swal("Welcome to the Random Encounter Club!")
			$state.go('login');
		}, function(err){
			console.log(err);
		});
	}
})
.directive("registerDirective", function() {
	return {
		restrict: 'AE',
		templateUrl: "directives/register-view.html"
	};
})
