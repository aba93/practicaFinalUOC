/**
 * Created by AlvaroBelmonte on 30/04/2016.
 */
angular.module("App", ["ui.router", "ngStorage", "ngSanitize"]).config([
  "$stateProvider",
  "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/header/menu");

    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "login.html"
      })
      .state("header", {
        url: "/header",
        templateUrl: "header.html"
      })
      .state("header.menu", {
        url: "/menu",
        templateUrl: "main-menu.html"
      })
      .state("header.books", {
        url: "/books",
        templateUrl: "books.html"
      })
      .state("header.order", {
        url: "/order",
        templateUrl: "order.html"
      })
      .state("header.book", {
        url: "/book/:bookId",
        templateUrl: "book-detail.html"
      });
  }
]);
