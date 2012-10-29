'use strict';


// Declare app level module which depends on filters, and services
angular.module('kshoes', ['controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/clientes',     {templateUrl: '/public/html/partials/clientes.html',     controller: 'ClienteCtrl'});
    $routeProvider.when('/fornecedores', {templateUrl: '/public/html/partials/fornecedores.html', controller: 'FornecedorCtrl'});
    $routeProvider.when('/produtos',     {templateUrl: '/public/html/partials/produtos.html',     controller: 'ProdutoCtrl'});
    $routeProvider.when('/vendas',       {templateUrl: '/public/html/partials/vendas.html',       controller: 'VendaCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
