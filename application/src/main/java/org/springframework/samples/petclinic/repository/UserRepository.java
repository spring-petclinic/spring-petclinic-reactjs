package org.springframework.samples.petclinic.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.samples.petclinic.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByName(String name);
}
