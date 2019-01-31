package org.springframework.samples.petclinic.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

  private final TokenAuthentication tokenAuthentication;
  private final ObjectMapper objectMapper;

  public JWTLoginFilter(String url,
                        TokenAuthentication tokenAuthentication,
                        ObjectMapper objectMapper
  ) {
    super(new AntPathRequestMatcher(url));
    this.tokenAuthentication = tokenAuthentication;
    this.objectMapper = objectMapper;
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
      throws IOException {

    Map<String, String> map;
    try {
      TypeReference<HashMap<String, String>> typeRef = new TypeReference<HashMap<String, String>>() {
      };
      map = objectMapper.readValue(req.getInputStream(), typeRef);
    } catch (Exception e) {
      unsuccessfulAuthenticationResponse(res);
      return null;
    }

    return getAuthenticationManager().authenticate(
        new UsernamePasswordAuthenticationToken(
            map.get("username"),
            map.get("password"),
            Collections.emptyList()
        )
    );
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest req,
                                          HttpServletResponse res,
                                          FilterChain chain,
                                          Authentication auth) throws IOException {
    tokenAuthentication.addAuthentication(res, auth.getName());
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            AuthenticationException failed) throws IOException {
    unsuccessfulAuthenticationResponse(response);
  }

  private void unsuccessfulAuthenticationResponse(HttpServletResponse response) throws IOException {
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.getWriter().print(HttpStatus.UNAUTHORIZED.getReasonPhrase());
  }
}