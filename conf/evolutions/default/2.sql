# Users schema
 
# --- !Ups
 
ALTER TABLE produto
ADD idFornecedor bigint(20);
 
# --- !Downs
 
ALTER TABLE produto
DROP COLUMN idFornecedor;
