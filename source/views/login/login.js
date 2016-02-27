'use strict';

angular.module('randomEncounter')
.controller('loginCtrl', function($scope, UserService, $cookies, jwtHelper, $state){
	$scope.submit = function(user){
		UserService.login(user)
		.then(function(res){
			$scope.$emit('loggedIn');
			if(res.data === "Incorrect Username or Password!"){
				alert("Incorrect Username or Password!")
			} else{
				document.cookie = 'token' + "=" + res.data;
				var token = $cookies.get('token');
				var decoded = jwtHelper.decodeToken(token);
				$scope.loggedIn = true;
				$state.go('home')
			}
		}, function(err) {
			console.error(err);
		});
	}
})
.directive("loginDirective", function() {
	return {
		restrict: 'AE',
		templateUrl: "directives/login-view.html"
	};
})
