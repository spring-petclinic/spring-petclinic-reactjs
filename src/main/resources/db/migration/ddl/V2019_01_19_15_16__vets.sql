CREATE SEQUENCE IF NOT EXISTS vets_seq
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE IF NOT EXISTS vets (
  id         INT DEFAULT nextval('vets_seq') PRIMARY KEY,
  first_name VARCHAR(32),
  last_name  VARCHAR(32)
);