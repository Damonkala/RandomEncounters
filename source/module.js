'use strict';

var app = angular.module('randomEncounter', ['ui.router', 'angular-jwt', 'ngCookies'])

app.constant('ENV', {
  API_URL: 'http://localhost:3000'
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {url: '/', templateUrl: 'views/home/home.html', controller: 'homeCtrl'})
  .state('login', {url: '/login', templateUrl: 'views/login/login.html', controller: 'loginCtrl'})
  .state('register', {url: '/register', templateUrl: 'views/register/register.html', controller: 'registerCtrl'})
  .state('map', {url: '/map', templateUrl: 'views/map/map.html', controller: 'mapCtrl'})
})
app.controller('MasterController', function(UserService, $cookies, jwtHelper, $scope, $state, $rootScope){
  var cookies = $cookies.get('token');
  if(cookies){
    $scope.loggedIn = true;
  }
  $scope.logout = function(){
    $scope.isLoggedIn = false;
    $cookies.remove('token');
    $state.go('game')
  }
})
