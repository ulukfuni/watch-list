'use strict';
var app = angular.module('watchList', []);

app.controller('MainCtrl', ['$scope', 'players', '$http', function($scope, players, $http) {
  $scope.watchList = [];
  $scope.Add = function(name) {
    $scope.watchList.push(name);
  };
  players.query().then(function(data) {
    $scope.names = data;
  });

}]);

//use service to grab list of active players
//http://stackoverflow.com/questions/24134117/no-access-control-allow-origin-header-is-present-on-the-requested-resource-an
//^^^ above has some answers for when the request cannot process because the code is in a local env and its trying to request from a remote server or something
//TODO: make grab players for current season using date
app.factory('players', ['$http', function($http) {
  var url = 'http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season=2015-16';
  var factory = {
    query: function() {
      var config = {
        url: url,
        method: 'GET'
      };
      var data = $http(config).then(function(result) {
          var obj = result.data.resultSets['0'].rowSet,
            arr = [];
          for (var i in obj) {
            arr.push(obj[i][2]);
          }
          return arr;
        },
        function(result) {
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
app.directive('autoComplete', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    scope: '=',
    link: function(scope, element, attrs) {
      element.autocomplete({
        source: function(req, res) {
          res(scope.names.filter(function(value, index, arr) {
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
//http://stackoverflow.com/questions/16839259/angular-calling-controller-function-inside-a-directive-link-function-using
//link function to directive
app.directive('gameLogs', ['$http', function($http) {
  return {
    restrict: 'E',
    templateUrl: 'game-logs.html',
    scope: {},
    link: function(scope, element, attrs) {
      var playerName = attrs.player;
      scope.getGameLog = function() {
        var config = {
          url: 'https://www.stattleship.com/basketball/nba/game_logs?player_id=nba-' + playerName.replace(' ', '-').toLowerCase(),
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token token=371939afa66fa11f4d1095251c7c9f65',
            'Accept': 'application/vnd.stattleship.com; version=1'
          }
        };
        $http(config).then(function(result) {
          var obj = result.data.game_logs;
          var arr = [];
          for (var i in obj) {
            if (i < 5) {
              arr.push(obj[i]);
            }
          }
          scope.gameLogsFive = arr;
        });
      };
    }
  }
}]);
app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);