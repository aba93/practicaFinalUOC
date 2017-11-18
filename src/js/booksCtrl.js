/**
 * Created by AlvaroBelmonte on 19/05/2016.
 */

angular.module("App").controller("booksCtrl", [
  "$scope",
  "$http",
  "$state",
  "$localStorage",
  function($scope, $http, $state, $localStorage) {
    var cont = 1;

    $scope.flag = {};
    var logged = $scope.flag;
    logged.dataLoaded = false;

    $scope.books = "";
    $scope.page = 1;

    $scope.checkLocalStorage = function() {
      if (
        $localStorage.email !== undefined &&
        $localStorage.userkey !== undefined
      ) {
        $state.go("tabs.players");
      }
    };

    $scope.checkLocalStorage();

    $scope.checkPage = function() {
      if ($scope.page == 5) return true;
      else return false;
    };

    $scope.getMoreBooks = function() {
      if ($scope.page <= 4) $scope.page++;
      logged.dataLoaded = false;
      $scope.getBooks();
    };

    $scope.getBooks = function() {
      $http({
        method: "POST",
        url:
          "http://multimedia.uoc.edu/frontend/getbooks.php?page=" + $scope.page
      })
        .success(successGetMoreBooks)
        .error(errorGetMoreBooks);
    };

    function successGetMoreBooks(data) {
      if (cont == 1) $scope.books = data;
      else {
        var datos = data;
        $scope.books = $scope.books.concat(datos);
      }
      logged.dataLoaded = true;
      cont++;
    }

    function errorGetMoreBooks(data, status) {
      $scope.flag.error = data;
      console.log(status);
    }
  }
]);
