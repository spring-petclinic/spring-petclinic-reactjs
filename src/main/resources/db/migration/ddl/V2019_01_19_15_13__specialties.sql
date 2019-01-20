CREATE SEQUENCE IF NOT EXISTS specialties_seq
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE IF NOT EXISTS specialties (
  id   INT DEFAULT nextval('specialties_seq') PRIMARY KEY,
  name VARCHAR(80)
);