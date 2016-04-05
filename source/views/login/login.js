'use strict';

angular.module('randomEncounter')
.controller('loginCtrl', function($scope, UserService, $cookies, jwtHelper, $state, $rootScope){
	$rootScope.authentication = UserService.isLoggedIn();
	$scope.submit = function(user){
		console.log("Step One, controller: ", user);
		UserService.login(user)
		.then(function(res){
			$scope.$emit('loggedIn');
			if(res.data === "Incorrect Username or Password!"){
				swal("Incorrect Username or Password!", "error")
			} else{
				document.cookie = 'token' + "=" + res.data;
				var token = $cookies.get('token');
				var decoded = jwtHelper.decodeToken(token);
				$scope.userInfo = (jwtHelper.decodeToken(token))
				console.log("IMPORTANT INFO:", $scope.userInfo);
				$scope.loggedIn = true;
				$state.go('userpage')
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
