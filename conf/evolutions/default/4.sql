# Users schema
 
# --- !Ups
 
ALTER TABLE ProdutosVendas
DROP COLUMN id;
 
# --- !Downs

ALTER TABLE ProdutosVendas
ADD id bigint(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE ProdutosVendas ADD PRIMARY KEY (id);