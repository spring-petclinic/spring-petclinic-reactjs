CREATE SEQUENCE IF NOT EXISTS pets_seq
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE IF NOT EXISTS pets (
  id         INT DEFAULT nextval('pets_seq') PRIMARY KEY,
  name       VARCHAR(32),
  birth_date DATE,
  type_id    INT,
  owner_id   INT,
  CONSTRAINT pet_owner_fk
  FOREIGN KEY (owner_id) REFERENCES pet_owners,
  CONSTRAINT pet_type_fk
  FOREIGN KEY (type_id) REFERENCES types
);