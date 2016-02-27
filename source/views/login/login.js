'use strict';

angular.module('scaffoldApp')
.controller('loginCtrl', function($scope){

})
.directive("loginDirective", function() {
	return {
		restrict: 'AE',
		templateUrl: "directives/login-view.html"
	};
})
