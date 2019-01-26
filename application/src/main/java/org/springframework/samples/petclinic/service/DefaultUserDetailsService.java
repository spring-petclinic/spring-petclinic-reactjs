package org.springframework.samples.petclinic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class DefaultUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Autowired
  public DefaultUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) {
    return userRepository.findByName(username)
        .map(usr -> new User(usr.getName(), usr.getPassword(), Collections.emptyList()))
        .orElseThrow(() -> new UsernameNotFoundException("User with permissions was not found for this username: " + username));
  }
}
