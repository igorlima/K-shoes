'use strict';

/* Controllers */

angular.module( 'controllers', ['clienteModel', 'publicacaoModel', 'emprestimoModel', 'itemEmprestimoModel'] )

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
          ng.cliente = {};
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
          ng.cliente = {};
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
    ng.cliente = {};
  };
  
  ng.excluir = function(cliente) {
    Cliente.remove( {id:cliente.id},
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.cliente = {};
          listar_todos_clientes();
        }
      },
      function(data) {
        Message.set(true, data);
        ng.cliente = {};
    });
  };

}])

.controller( 'PublicacaoCtrl', ['$scope','Publicacao', 
function(ng, Publicacao) {
  
  ng.publicacao = {tipo:'LIVRO'};
  
  ng.publicacoes = []; 
  
  var listar_todas_publicacoes = function() {
    Publicacao.all(function(data){
      ng.publicacoes = data.returnObject;
      ng.has_publicacoes = ng.publicacoes.length > 0 ? true : false;
    });
  };
  listar_todas_publicacoes();
  
  ng.limpar = function() {
    ng.publicacao = {tipo:'LIVRO'};
  };
  
  ng.salvar = function() {
    Publicacao.save( {tipo:ng.publicacao.tipo}, ng.publicacao, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.publicacao = {tipo:'LIVRO'};
          listar_todas_publicacoes();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar_publicacao_selecionado = function() {
    Publicacao.update( {tipo:ng.publicacao.tipo}, ng.publicacao, 
      function(data){
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.publicacao = {tipo:'LIVRO'};
          listar_todas_publicacoes();
        }
      },
      function(data){
        Message.set(true, data);
    });
  };
  
  ng.editar = function(publicacao) {
    ng.publicacao.id            = publicacao.id;
    ng.publicacao.titulo        = publicacao.titulo;
    ng.publicacao.editora       = publicacao.editora;
    ng.publicacao.ano           = publicacao.ano;
    ng.publicacao.tipo          = publicacao.tipo;
    ng.publicacao.autores       = publicacao.autores;
    ng.publicacao.qtdExemplares = publicacao.qtdExemplares;
    ng.publicacao.numEdicao     = publicacao.numEdicao;
    ng.publicacao.mes           = publicacao.mes;
  };
  
  ng.visualizar = function(publicacao) {
    ng.publicacao_para_visualizacao = publicacao;
    ng.publicacao = {tipo:'LIVRO'};
  };
  
  ng.excluir = function(publicacao) {
    Publicacao.remove( {id:publicacao.id, tipo:publicacao.tipo},
      function(data) {
        if (data.status=='ERROR') Message.set(true, data.message);
        else{
          Message.set(false, data.message);
          ng.publicacao = {tipo:'LIVRO'};
          listar_todas_publicacoes();
        }
      },
      function(data) {
        Message.set(true, data);
        ng.publicacao = {tipo:'LIVRO'};
    });
  };

}])


.controller( 'EmprestimoCtrl', ['$scope','Emprestimo','ItemEmprestimo','Cliente','Publicacao', 
function(ng, Emprestimo, ItemEmprestimo, Cliente, Publicacao) {
  
  var create_a_new_emprestimo = function() {
    ng.publicacao_selecionada = {};
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
  
  Publicacao.all( {pathTipo: 'tipo', tipo:'LIVRO'}, function(data){
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
      publicacao: ng.publicacao_selecionada
    });
    ng.publicacao_selecionada = {};
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
    ng.publicacao_selecionada    = {};
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
