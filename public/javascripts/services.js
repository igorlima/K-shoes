'use strict';

/* Services */
angular.module('clienteModel', ['ngResource']).
factory('Cliente', ['$resource', function($resource){
  return $resource('clientes/:id', {}, {
    all:    {method:'GET'   , params:{}},
    save:   {method:'POST'  , params:{}},
    update: {method:'PUT'   , params:{}},
    get:    {method:'GET'   , params:{id:'@id'}},
    remove: {method:'DELETE', params:{id:'@id'}}
  });
}]);


angular.module('fornecedorModel', ['ngResource']).
factory('Fornecedor', ['$resource', function($resource){
  return $resource('fornecedores/:id', {}, {
    all:    {method:'GET'   , params:{}},
    save:   {method:'POST'  , params:{}},
    update: {method:'PUT'   , params:{}},
    get:    {method:'GET'   , params:{id:'@id'}},
    remove: {method:'DELETE', params:{id:'@id'}}
  });
}]);

angular.module('produtoModel', ['ngResource']).
factory('Produto', ['$resource', function($resource) {
  return $resource('produtos/:id', {}, {
    all:     {method:'GET'   , params:{}},
    save:    {method:'POST'  , params:{}},
    update:  {method:'PUT'   , params:{}},
    get:     {method:'GET'   , params:{id:'@id'}},
    remove:  {method:'DELETE', params:{id:'@id'}}
  });
}]);

angular.module('vendaModel', ['ngResource']).
factory('Venda', ['$resource', function($resource) {
  return $resource('vendas/:id', {}, {
    all:     {method:'GET'   , params:{}},
    save:    {method:'POST'  , params:{}},
    update:  {method:'PUT'   , params:{}},
    get:     {method:'GET'   , params:{id:'@id'}},
    remove:  {method:'DELETE', params:{id:'@id'}}
  });
}]);

