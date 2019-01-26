package org.springframework.samples.petclinic.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

public class JWTAuthenticationProvider implements AuthenticationProvider {
  private final AuthenticationHelper authenticationService;

  public JWTAuthenticationProvider(AuthenticationHelper authenticationService) {
    this.authenticationService = authenticationService;
  }

  @Override
  public Authentication authenticate(Authentication authentication) {
    return authenticationService.authenticate(authentication);
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}
