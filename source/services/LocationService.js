'use strict';

var app = angular.module('randomEncounter');

app.service('LocationService', function($http){
	this.coordsToAddress = function(lat, long){
		return $http.put(`/locations/getCoords/${lat}/${long}`)
	}
})
