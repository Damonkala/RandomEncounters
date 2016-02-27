'use strict';

angular.module('scaffoldApp')
.controller('registerCtrl', function($scope){

})
.directive("registerDirective", function() {
	return {
		restrict: 'AE',
		templateUrl: "directives/register-view.html"
	};
})
