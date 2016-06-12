/**
 * Created by AlvaroBelmonte on 20/05/2016.
 */

angular.module('App').controller('menuCtrl', ['$scope','$http','$state','$localStorage', function ($scope, $http, $state, $localStorage) {



    $scope.disconnect = function () {

        $localStorage.user = undefined;
        $localStorage.pass = undefined;
        $state.go('login');


    };

}]);
