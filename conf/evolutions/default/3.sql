# Users schema
 
# --- !Ups
 
ALTER TABLE venda modify valor decimal(10,2);
 
# --- !Downs
 
ALTER TABLE venda modify valor decimal(10,2) NOT NULL;
