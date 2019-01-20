package org.springframework.samples.petclinic.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

public class JWTAuthenticationHelper implements AuthenticationHelper {
  private final UserDetailsService userDetailsService;
  private final PasswordEncoder passwordEncoder;

  public JWTAuthenticationHelper(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
    this.userDetailsService = userDetailsService;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public Authentication authenticate(Authentication authentication) {
    UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());
    return authenticateUser(userDetails, authentication);
  }

  private Authentication authenticateUser(UserDetails userDetails, Authentication authentication) {
    if (userDetails.getUsername().equals(authentication.getName()) &&
        passwordEncoder.matches(authentication.getCredentials().toString(), userDetails.getPassword())) {
      return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(), new ArrayList<>());
    }
    return null;
  }
}
