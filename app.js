'use strict';
var app = angular.module('watchList', []);
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.controller('MainCtrl', ['$scope', 'players', 'getPlayerGameLog', function($scope, players, getPlayerGameLog){
	$scope.watchList = [];
	$scope.Add = function(name){
		$scope.watchList.push(name);
	};
	players.query().then(function(data){
		$scope.names = data;
	});

	getPlayerGameLog.query().then(function(data){
		console.log(data);	
	});
	$scope.gameLog = function(name){

	};
}]);

//use service to grab list of active players
//http://stackoverflow.com/questions/24134117/no-access-control-allow-origin-header-is-present-on-the-requested-resource-an
//^^^ above has some answers for when the request cannot process because the code is in a local env and its trying to request from a remote server or something
//TODO: make grab players for current season using date
app.factory('players',['$http', function($http){
	var url = 'http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season=2015-16';
	var factory = {
		query: function () {
			var config = {
				url: url,
				method: 'GET'
			};
			var data = $http(config).then(function(result){
				var obj = result.data.resultSets['0'].rowSet,
			    arr = [];
				for(var i in obj){
			      arr.push(obj[i][2]);
			     }
				return arr;
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
app.factory('getPlayerGameLog', ['$http', function($http){
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
	var factory = {
		query: function () {
			var data = $http(config).then(function(result){
				return result.data.game_logs;
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
// http://stackoverflow.com/questions/9656523/jquery-autocomplete-with-callback-ajax-json
// http://www.sitepoint.com/api-calls-angularjs-http-service/
// ^^^ use this(first one) for actually calling the service into the source option of the autocomplete
//TODO: make autocomplete grab first option and autofill into input when there is only one option
app.directive('autoComplete', ['$timeout', function($timeout){
    return {
		restrict: 'A',
		scope: '=',
		link: function(scope, element, attrs) {
	        element.autocomplete({
	            source: function(req, res){
					res(scope.names.filter(function(value, index, arr){
						return value.toLowerCase().includes(req.term.toLowerCase());
					}));
	        	},
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

app.directive('playerGameLog', [function(){
	return {
		restrict: 'A'
	}
}]);