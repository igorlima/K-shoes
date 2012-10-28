# Users schema
 
# --- !Ups
 
ALTER TABLE Produto
ADD idFornecedor bigint(20);
 
# --- !Downs
 
ALTER TABLE Produto
DROP COLUMN idFornecedor;
