# Users schema
 
# --- !Ups
 
ALTER TABLE produtos_vendas
DROP COLUMN id;
 
# --- !Downs

ALTER TABLE produtos_vendas
ADD id bigint(20) NOT NULL AUTO_INCREMENT;

ALTER TABLE produtos_vendas ADD PRIMARY KEY (id);