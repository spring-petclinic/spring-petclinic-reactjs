CREATE SEQUENCE IF NOT EXISTS visits_seq
  START WITH 1
  INCREMENT BY 1;

CREATE TABLE IF NOT EXISTS visits (
  id          INT DEFAULT nextval('visits_seq') PRIMARY KEY,
  pet_id      INT,
  visit_date  DATE,
  description VARCHAR(255),
  CONSTRAINT visit_pet_fk
  FOREIGN KEY (pet_id) REFERENCES pets
);