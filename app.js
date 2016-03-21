'use strict';
var app = angular.module('watchList', []);
app.controller('MainCtrl', ['$scope', function($scope){
	$scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
	$scope.watchList = [];
	$scope.Add = function(name){
		$scope.watchList.push(name);
		console.log($scope.watchList);
	}

}]);
//use service to grab data
//app.factory('PlayerData', [function(){}]);
app.directive('autoComplete', ['$timeout', function($timeout){
    return {
			restrict: 'A',
			link: function(scope, element, attrs) {
        element.autocomplete({
            source: scope[attrs.uiItems],
            select: function(event, ui) {
                $timeout(function() {
									scope.Add(ui.item.value);
									$('#player-input').val('');
                }, 0);
            }
        });
    }
	}
}]);