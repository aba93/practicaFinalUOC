/**
 * Created by AlvaroBelmonte on 20/05/2016.
 */

angular.module('App').controller('mainCtrl', ['$scope','$http', '$state', '$localStorage', '$rootScope', function ($scope, $http, $state, $localStorage, $rootScope) {

    $scope.inDetail = false;

    $scope.checkLocalStorage = function () {
        if ($localStorage.user  === undefined && $localStorage.pass === undefined) {
            $state.go('login');
        }

    };

    $scope.checkLocalStorage();

    $scope.checkState = function () {

        if($state.current.name == 'header.book')
            $scope.inDetail = true;
        else
            $scope.inDetail = false;

    };

    $scope.checkState();

    $rootScope
        .$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                $scope.checkState();
            });

}]);