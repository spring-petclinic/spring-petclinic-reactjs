package org.springframework.samples.petclinic.security;

import org.springframework.security.core.Authentication;

public interface AuthenticationHelper {
  Authentication authenticate(Authentication authentication);
}
