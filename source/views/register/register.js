'use strict';

angular.module('randomEncounter')
.controller('registerCtrl', function($scope, UserService, $state){
	$scope.submit = function(user){
		if(user.password !== user.password2){
			alert("The passwords don't match!")
			return;
		}
		if(!user.email){
			alert("You didn't put in an email address!")
			return;
		}
		UserService.register(user)
		.then(function(data){
			alert("Welcome to the Random Encounter Club!")
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
