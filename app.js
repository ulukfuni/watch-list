'use strict';
var app = angular.module('watchList', []);
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.controller('MainCtrl', ['$scope', 'players', 'playerGameLog', function($scope, players, playerGameLog){
	// $scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
	$scope.watchList = [];
	$scope.Add = function(name){
		$scope.watchList.push(name);
	}

	players.query().then(function(data){
    var obj = data.data.resultSets['0'].rowSet;
    var arr = [];
		//console.log(typeof data.data.resultSets['0'].rowSet);
		for(var i in obj){
      arr.push(obj[i][2]);
      }
      console.log(arr);
    $scope.names = arr;
	}, function(err){
		console.log('no data');
	});

	// playerGameLog.query().then(function(data){
	// 	console.log(data);	
	// }, function(err){
	// 	console.log(err);
	// });

}]);

//use service to grab list of active players
//http://stackoverflow.com/questions/24134117/no-access-control-allow-origin-header-is-present-on-the-requested-resource-an
//^^^ above has some answers for when the request cannot process because the code is in a local env and its trying to request from a remote server or something
//TODO: make grab players for current season
app.factory('players',['$http', function($http){
	var url = 'http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season=2015-16';
	var factory = {
		query: function () {
			var config = {
				url: url,
				method: 'GET'
			};
			var data = $http(config).then(function(result){
				return result;
			},
			function(result){
				console.log('error: no data');
			});
			return data;
		}
	}
	return factory;
}]);

//service for grab a specified players game logs
//TODO: place player name into this function and spit out player data
app.factory('playerGameLog', ['$http', function($http){
	var factory = {
		query: function () {
			var playerName = 'goran-dragic';
			var config = {
				url: 'https://www.stattleship.com/basketball/nba/game_logs?player_id=nba-' + playerName,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Token token=371939afa66fa11f4d1095251c7c9f65',
					'Accept': 'application/vnd.stattleship.com; version=1'
				}
			};
			var data = $http(config).then(function(result){
				return result;
			},
			function(result){
				console.log('error: no data');
			});
			return data;
		}
	}
	return factory;
}]);


// pass in players factory and set to source
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