'use strict';


// Declare app level module which depends on filters, and services
angular.module('kshoes', ['controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/clientes',     {templateUrl: '/public/html/partials/clientes.html', controller: 'ClienteCtrl'});
    $routeProvider.when('/fornecedores', {templateUrl: '/public/html/partials/fornecedores.html', controller: 'FornecedorCtrl'});
    $routeProvider.when('/emprestimo', {templateUrl: '/public/html/partials/emprestimo.html', controller: 'EmprestimoCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
