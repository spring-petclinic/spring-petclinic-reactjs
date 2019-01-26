package org.springframework.samples.petclinic.security;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TokenAuthentication {

  private static final String SECRET = UUID.randomUUID().toString();

  private final long expirationTimeSeconds;
  private final String tokenPrefix;

  public TokenAuthentication(long expirationTimeSeconds, String tokenPrefix) {
    this.expirationTimeSeconds = expirationTimeSeconds;
    this.tokenPrefix = tokenPrefix;
  }

  void addAuthentication(HttpServletResponse res, String username) throws IOException {
    String jwtToken = Jwts.builder()
        .setSubject(username)
        .setExpiration(Date.from(LocalDateTime.now().plusSeconds(expirationTimeSeconds).atZone(ZoneOffset.UTC).toInstant()))
        .signWith(SignatureAlgorithm.HS512, SECRET)
        .compact();
    res.addHeader(HttpHeaders.AUTHORIZATION, tokenPrefix + " " + jwtToken);
    res.getWriter().write("{\"token\":\"" + jwtToken + "\"}");
  }

  Authentication getAuthentication(HttpServletRequest request) {
    String token = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (token == null) {
      return null;
    }

    try {
      String user = Jwts.parser()
          .setSigningKey(SECRET)
          .parseClaimsJws(token.replace(tokenPrefix, ""))
          .getBody()
          .getSubject();

      return user != null ?
          new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()) :
          null;
    } catch (ExpiredJwtException e) {
      return null;
    }
  }
}