'use strict';

angular.module('randomEncounter')
.controller('homeCtrl', function($scope, $cookies, $state, jwtHelper, $rootScope, UserService){
	$rootScope.authentication = UserService.isLoggedIn().isAuthed;
})
