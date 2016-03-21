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

app.directive('autoComplete', ['$timeout', function($timeout){
    return function(scope, iElement, iAttrs) {
        iElement.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function() {
                $timeout(function() { console.log(iElement);
                  iElement.trigger('input');
                }, 0);
            }
        });
    };
}]);