# Users schema
 
# --- !Ups
 
CREATE TABLE produto (
    id          bigint(20) NOT NULL AUTO_INCREMENT,
    nome        varchar(255) NOT NULL,
    marca       varchar(255) NOT NULL,
    precoCusto  decimal(10,2) NOT NULL,
    precoVenda  decimal(10,2) NOT NULL,
    quantidade  int NOT NULL,
    modelo      varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE fornecedor (
    id          bigint(20) NOT NULL AUTO_INCREMENT,
    nome        varchar(255) NOT NULL,
    cnpj        int(255) NOT NULL,
    cidade      varchar(255) NOT NULL,
    endereco    varchar(255) NOT NULL,
    telefone    varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE cliente (
    id          bigint(20) NOT NULL AUTO_INCREMENT,
    nome        varchar(255) NOT NULL,
    cpf         int(11) NOT NULL,
    cidade      varchar(255) NOT NULL,
    endereco    varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE venda (
    id             bigint(20) NOT NULL AUTO_INCREMENT,
    dataVenda      DATE NOT NULL,
    valor          decimal(10,2) NOT NULL,
    formaPagamento varchar(255) NOT NULL,
    idCliente      int,
    PRIMARY KEY (id)
);

CREATE TABLE produtos_vendas (
    id             bigint(20) NOT NULL AUTO_INCREMENT,
    idVenda        int,
    idProduto      int,
    PRIMARY KEY (id)
);
 
# --- !Downs
 
DROP TABLE produto;
DROP TABLE fornecedor;
DROP TABLE cliente;
DROP TABLE venda;
DROP TABLE produtos_vendas;
