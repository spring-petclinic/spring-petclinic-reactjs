CREATE TABLE vet_specialties (
  vet_id INT NOT NULL,
  specialty_id INT NOT NULL,
  FOREIGN KEY (vet_id) REFERENCES vets (id),
  FOREIGN KEY (specialty_id) REFERENCES specialties (id),
  UNIQUE (vet_id,specialty_id)
);