/**
 * Created by AlvaroBelmonte on 19/05/2016.
 */

angular.module('App').controller('bookDetailCtrl', ['$scope','$http','$state','$localStorage', function ($scope, $http, $state, $localStorage) {

    var id = 2;
    var idBooks = [];
    var quantity = [];

    $scope.cantidad = 1;
    $scope.added = false;

    $scope.id = $state.params.bookId;
    id = $scope.id;
    $scope.flag = {};
    var logged = $scope.flag;

    logged.dataLoaded = false;


    $scope.checkLocalStorage = function () {
        if ($localStorage.email  !== undefined && $localStorage.userkey !== undefined) {
            $state.go('login');
        }

    };

    $scope.checkLocalStorage();

    $scope.getBook = function () {

        $http({
            method: 'POST',
            url: 'http://multimedia.uoc.edu/frontend/bookdetail.php?id='+id
        }).success(successGetBook)
            .error(errorGetBook);

    };

    function successGetBook(data) {
        $scope.flag.res = data;

        $scope.imagen = data.cover;
        $scope.titulo = data.title;
        $scope.autor = data.author;
        $scope.isbn = data.ISBN;
        $scope.review = data.review;

        logged.dataLoaded = true;

    }


    function errorGetBook(data, status) {
        $scope.flag.error = data;

    }



    $scope.addBook = function () {

        if(localStorage.getItem("pedidoId") != null){
            idBooks = JSON.parse(localStorage.getItem("pedidoId"));
            quantity = JSON.parse(localStorage.getItem("pedidoCantidad"));

            //Comprobar si existe libro en idBooks
            var inOrder = idBooks.indexOf(id) > -1;

            //Si existe, se añade al existente
            if(inOrder == true){
                var pos = idBooks.indexOf(id);
                quantity[pos] = quantity[pos]+$scope.cantidad;

            }
            //Si no existe, se crea otro elemento
            else{
                idBooks.push(id);
                quantity.push($scope.cantidad);
            }

        }

        else{
            idBooks = [id];
            quantity = [$scope.cantidad];
        }

        localStorage.setItem("pedidoId", JSON.stringify(idBooks));
        localStorage.setItem("pedidoCantidad", JSON.stringify(quantity));

        $scope.added = true;

    };

    $scope.getBook();
}]);