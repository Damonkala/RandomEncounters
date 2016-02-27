'use strict';

angular.module('randomEncounter')
.controller('mapCtrl', function($scope, UserService, $state){

	var map;
	require(["esri/map", "dojo/domReady!"], function(Map) {
	  map = new Map("mapDiv", {
	    center: [-56.049, 38.485],
	    zoom: 3,
	    basemap: "streets"
	  });
	});

})
