CREATE SEQUENCE IF NOT EXISTS pet_owners_seq
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE IF NOT EXISTS pet_owners (
  id         INT DEFAULT nextval('pet_owners_seq') PRIMARY KEY,
  first_name VARCHAR(32),
  last_name  VARCHAR(32),
  address    VARCHAR(255),
  city       VARCHAR(80),
  telephone  VARCHAR(20)
);