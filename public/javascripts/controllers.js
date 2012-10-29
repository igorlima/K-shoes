'use strict';

/* Controllers */

angular.module( 'controllers', ['clienteModel', 'fornecedorModel', 'produtoModel', 'vendaModel'] )

.controller( 'ClienteCtrl', ['$scope', 'Cliente', 
function(ng, Cliente) {

  ng.cliente = {};
  
  ng.clientes = []; 
  
  var listar_todos_clientes = function() {
    Cliente.all(function(data){
      ng.clientes = data.returnObject;
      ng.has_clientes = ng.clientes.length > 0 ? true : false;
    });
  };
  listar_todos_clientes();
  
  ng.limpar = function() {
    ng.cliente = {};
  };
  
  ng.salvar = function() {
    Cliente.save( {}, ng.cliente, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_clientes();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar_cliente_selecionado = function() {
    Cliente.update( {}, ng.cliente, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_clientes();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar = function(cliente) {
    ng.cliente.id              = cliente.id;
    ng.cliente.nome            = cliente.nome;
    ng.cliente.endereco        = cliente.endereco;
    ng.cliente.cpf             = cliente.cpf;
    ng.cliente.telefone        = cliente.telefone;
  };
  
  ng.visualizar = function(cliente) {
    ng.cliente_para_visualizacao = cliente;
    ng.limpar();
  };
  
  ng.excluir = function(cliente) {
    Cliente.remove( {id:cliente.id},
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_clientes();
        }
      },
      function(data) {
        Message.set(true, data);
        ng.limpar();
    });
  };

}])

.controller( 'FornecedorCtrl', ['$scope','Fornecedor', 
function(ng, Fornecedor) {
  
  ng.fornecedor = {};
  ng.fornecedores = []; 
  
  var listar_todos_fornecedores = function() {
    Fornecedor.all(function(data){
      ng.fornecedores = data.returnObject;
      ng.has_fornecedores = ng.fornecedores.length > 0 ? true : false;
    });
  };
  listar_todos_fornecedores();
  
  ng.limpar = function() {
    ng.fornecedor = {};
  };
  
  ng.salvar = function() {
    Fornecedor.save( {}, ng.fornecedor, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_fornecedores();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar_fornecedor_selecionado = function() {
    Fornecedor.update( {}, ng.fornecedor, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_fornecedores();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar = function(fornecedor) {
    ng.fornecedor.id         = fornecedor.id;
    ng.fornecedor.nome       = fornecedor.nome;
    ng.fornecedor.cnpj       = fornecedor.cnpj;
    ng.fornecedor.cidade     = fornecedor.cidade;
    ng.fornecedor.endereco   = fornecedor.endereco;
    ng.fornecedor.telefone   = fornecedor.telefone;
  };
  
  ng.visualizar = function(fornecedor) {
    ng.fornecedor_para_visualizacao = fornecedor;
    ng.limpar();
  };
  
  ng.excluir = function(fornecedor) {
    Fornecedor.remove( {id:fornecedor.id},
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_fornecedores();
        }
      },
      function(data) {
        Message.set(true, data);
        ng.limpar();
    });
  };

}])


.controller( 'ProdutoCtrl', ['$scope','Produto','Fornecedor', 
function(ng, Produto, Fornecedor) {
  
  ng.limpar = function() {
    ng.produto = {};
    ng.produto.fornecedor = {};
    return ng.produto;
  };
  
  ng.produto = ng.limpar();
  ng.produtos = [];
  ng.fornecedores = [];
  
  Fornecedor.all( function(data){
    ng.fornecedores = data.returnObject;
  });
  
  var listar_todos_produtos = function() {
    Produto.all(function(data){
      ng.produtos = data.returnObject;
      ng.has_produtos = ng.produtos.length > 0 ? true : false;
    });
  };
  listar_todos_produtos();
  
  ng.salvar = function() {
    Produto.save( {}, ng.produto, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_produtos();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar_produto_selecionado = function() {
    Produto.update( {}, ng.produto, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_produtos();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar = function(produto) {
    ng.produto.id            = produto.id;
    ng.produto.precoCusto    = produto.precoCusto;
    ng.produto.precoVenda    = produto.precoVenda;
    ng.produto.nome          = produto.nome;
    ng.produto.marca         = produto.marca;
    ng.produto.quantidade    = produto.quantidade;
    ng.produto.modelo        = produto.modelo;
    ng.produto.fornecedor    = produto.fornecedor;
  };
  
  ng.selecionar = function(produto) {
    ng.produto_selecionado = produto;
    ng.limpar();
  };
  
  ng.excluir = function(produto) {
    Produto.remove( {id:produto.id},
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todos_produtos();
        }
      },
      function(data) {
        Message.set(true, data);
        ng.limpar();
    });
  };
  
}])





.controller( 'VendaCtrl', ['$scope','Venda','Produto','Cliente', 
function(ng, Venda, Produto, Cliente) {
  
  ng.limpar = function() {
    ng.venda = {};
    ng.venda.cliente = {};
    ng.venda.produtos = [];
    return ng.venda;
  };
  
  ng.venda    = ng.limpar();
  ng.vendas   = [];
  ng.produtos = [];
  ng.clientes = [];
  
  Produto.all( function(data){ ng.produtos = data.returnObject; });
  Cliente.all( function(data){ ng.clientes = data.returnObject; });
  
  var listar_todas_vendas = function() {
    Venda.all(function(data){
      ng.vendas = data.returnObject;
      ng.has_vendas = ng.vendas.length > 0 ? true : false;
    });
  };
  listar_todas_vendas();
  
  ng.salvar = function() {
    Venda.save( {}, ng.venda, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todas_vendas();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.selecionar = function(venda) {
    ng.venda_selecionada = venda;
    ng.limpar();
  };
  
  ng.excluir = function(venda) {
    Venda.remove( {id:venda.id},
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.limpar();
          listar_todas_vendas();
        }
      },
      function(data) {
        Message.set(true, data);
        ng.limpar();
    });
  };
  
  ng.adicionarProdutoAoCarrinho = function() {
    ng.venda.produtos.push(ng.produto);
    
    var valorAtual = parseFloat(ng.venda.valor); 
    valorAtual = isNaN(valorAtual) ? 0 : valorAtual; 
    ng.venda.valor = valorAtual + parseFloat(ng.produto.precoVenda);
    
  };
  
  ng.removerProdutoDoCarrinho = function(produto) {
    
    ng.venda.produtos.splice(ng.venda.produtos.indexOf(produto),1);
    var valorAtual = parseFloat(ng.venda.valor); 
    valorAtual = isNaN(valorAtual) ? 0 : valorAtual; 
    ng.venda.valor = valorAtual - parseFloat(produto.precoVenda);
    
  };
  
  
  
}])


;
