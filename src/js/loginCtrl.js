/**
 * Created by AlvaroBelmonte on 19/05/2016.
 */

angular.module("App").controller("loginCtrl", [
  "$scope",
  "$http",
  "$state",
  "$localStorage",
  function($scope, $http, $state, $localStorage) {
    var name;
    var key;
    var res;

    $scope.flag = {};
    $scope.error = false;
    var logged = $scope.flag;

    logged.dataLoaded = false;
    $scope.change = function() {
      if ($scope.error === true) $scope.error = false;
    };

    $scope.logIn = function(user) {
      name = user.name;
      pass = user.pass;

      $http({
        method: "POST",
        url:
          "http://multimedia.uoc.edu/frontend/auth.php?user=" +
          name +
          "&passwd=" +
          pass
      })
        .success(successLogin)
        .error(errorLogin);
    };

    function successLogin(data) {
      $scope.flag.res = data;
      res = data;
      if (res.status == "OK") {
        $state.go("header.menu");
        logged.dataLoaded = true;
        $localStorage.user = name;
        $localStorage.pass = pass;
      } else $scope.error = true;
    }

    function errorLogin(data, status) {
      $scope.flag.error = data;
      console.log(status);
    }
  }
]);
