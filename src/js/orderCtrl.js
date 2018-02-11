/**
 * Created by AlvaroBelmonte on 21/05/2016.
 */

angular.module("App").controller("orderCtrl", [
  "$scope",
  "$http",
  "$state",
  "$localStorage",
  function($scope, $http, $state, $localStorage) {
    $scope.total = 0;
    $scope.totalBooks = 0;
    $scope.orders = 0;

    var bookObject = "sin rellenar";
    var arrayObjects = [];
    var id = 0;
    var quantity = 0;
    var cantidad = 0;
    var i;
    var cont;

    $scope.flag = {};
    var logged = $scope.flag;

    logged.dataLoaded = false;

    $scope.checkLocalStorage = function() {
      if ($localStorage.user === undefined && $localStorage.pass === undefined) {
        $state.go("login");
      }

      if (localStorage.getItem("pedidoId") == "[]") {
        $state.go("header.menu");
      }
    };

    $scope.checkLocalStorage();

    $scope.getBook = function() {
      $http({
        method: "POST",
        url: "http://multimedia.uoc.edu/frontend/bookdetail.php?id=" + id
      })
        .success(successGetBook)
        .error(errorGetBook);
    };

    function successGetBook(data) {
      $scope.flag.res = data;

      $scope.createObject(data);

      if (i == cont.length) logged.dataLoaded = true;
    }

    function errorGetBook(data, status) {
      $scope.flag.error = data;
      console.log(status);
    }

    $scope.createObject = function(data) {
      $scope.imagen = data.cover;
      $scope.id = data.id;
      $scope.titulo = data.title;
      $scope.precio = data.price;
      $scope.precioTotal = $scope.precio * cantidad;

      $scope.total = $scope.total + $scope.precioTotal;

      bookObject = {
        id: $scope.id,
        imagen: $scope.imagen,
        titulo: $scope.titulo,
        precio: $scope.precio,
        cantidad: cantidad,
        precioTotal: $scope.precioTotal
      };

      arrayObjects.push(bookObject);
    };

    $scope.getOrder = function() {
      if (localStorage.getItem("pedidoId") !== null) {
        idBooks = JSON.parse(localStorage.getItem("pedidoId"));
        quantity = JSON.parse(localStorage.getItem("pedidoCantidad"));
        cont = quantity;

        for (i = 0; i < cont.length; i++) {
          id = idBooks[i];
          cantidad = quantity[i];
          $scope.getBook();
          $scope.totalBooks = $scope.totalBooks + cantidad;
        }
        $scope.orders = arrayObjects;
      } else {
        $state.go("header.menu");
      }
    };
    $scope.deleteBook = function(id) {
      var index = idBooks.indexOf(id);

      idBooks.splice(index, 1);
      quantity.splice(index, 1);
      arrayObjects.splice(index, 1);
      $scope.orders.splice(index, 1);

      localStorage.setItem("pedidoId", JSON.stringify(idBooks));
      localStorage.setItem("pedidoCantidad", JSON.stringify(quantity));

      $scope.checkLocalStorage();
    };

    $scope.getOrder();
  }
]);
