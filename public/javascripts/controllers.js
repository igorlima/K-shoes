'use strict';

/* Controllers */

angular.module( 'controllers', ['clienteModel', 'fornecedorModel', 'emprestimoModel', 'itemEmprestimoModel'] )

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


.controller( 'EmprestimoCtrl', ['$scope','Emprestimo','ItemEmprestimo','Cliente','Fornecedor', 
function(ng, Emprestimo, ItemEmprestimo, Cliente, Fornecedor) {
  
  var create_a_new_emprestimo = function() {
    ng.fornecedor_selecionado = {};
    ng.dataParaDevolucao = null;
    return {
      cliente: {},
      itens: []
    };
  };
  
  ng.emprestimo = create_a_new_emprestimo();
  ng.emprestimos = [];
  ng.clientes = [];
  ng.livros = [];
  
  Fornecedor.all( function(data){
    ng.livros = data.returnObject;
  });
  
  Cliente.all(function(data){
    ng.clientes = data.returnObject;
  });
  
  var listar_todos_emprestimos = function() {
    Emprestimo.all(function(data){
      ng.emprestimos = data.returnObject;
      ng.has_emprestimos = ng.emprestimos.length > 0 ? true : false;
    });
  };
  listar_todos_emprestimos();
  
  ng.limpar = function() {
    ng.emprestimo = create_a_new_emprestimo();
  };
  
  ng.adicionarItemEmprestimo = function() {
    ng.emprestimo.itens.push({
      dataParaDevolucao: ng.dataParaDevolucao,
      fornecedor: ng.fornecedor_selecionado
    });
    ng.fornecedor_selecionado = {};
    ng.dataParaDevolucao = null;
  };
  
  ng.salvar = function() {
    Emprestimo.save( {tipo:ng.emprestimo.tipo}, ng.emprestimo, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.emprestimo = create_a_new_emprestimo();
          listar_todos_emprestimos();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar_emprestimo_selecionado = function() {
    Emprestimo.update( {tipo:ng.emprestimo.tipo}, ng.emprestimo, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.emprestimo = create_a_new_emprestimo();
          listar_todos_emprestimos();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar = function(emprestimo) {
    ng.emprestimo.id             = emprestimo.id;
    ng.emprestimo.itens          = emprestimo.itens;
    ng.emprestimo.cliente.id     = emprestimo.cliente.id;
    ng.emprestimo.dataEmprestimo = emprestimo.dataEmprestimo;
    ng.fornecedor_selecionado    = {};
  };
  
  ng.selecionar = function(emprestimo) {
    ng.emprestimo_selecionado = emprestimo;
    ng.emprestimo = create_a_new_emprestimo();
  };
  
  ng.excluir = function(emprestimo) {
    Emprestimo.remove( {id:emprestimo.id},
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.emprestimo = create_a_new_emprestimo();
          listar_todos_emprestimos();
        }
      },
      function(data) {
        Message.set(true, data);
        ng.emprestimo = create_a_new_emprestimo();
    });
  };
  
  ng.devolver_emprestimo_selecionado = function() {
    ItemEmprestimo.devolve( {act:'devolucao'}, ng.emprestimo_selecionado, 
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          listar_todos_emprestimos();
          $('#devolverEmprestimo').find('a[data-dismiss=modal]').click();
        }
      },
      function(data) {
        Message.set(true, data);
        $('#devolverEmprestimo').find('a[data-dismiss=modal]').click();
    });
  };
  
  ng.renovar_emprestimo_selecionado = function() {
    ItemEmprestimo.renew( {act:'renovacao'}, ng.emprestimo_selecionado, 
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          listar_todos_emprestimos();
          $('#renovarEmprestimo').find('a[data-dismiss=modal]').click();
        }
      },
      function(data) {
        Message.set(true, data);
        $('#renovarEmprestimo').find('a[data-dismiss=modal]').click();
    });
  };
  
  ng.qte_devolvidos = function(itens) {
    var qte_devolvidos = 0;
    angular.forEach( itens, function(item){
      if (item.dataDaDevolucao!=null) qte_devolvidos++;
    });
    return qte_devolvidos;
  };
  

}]);
