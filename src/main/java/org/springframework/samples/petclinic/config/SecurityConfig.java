package org.springframework.samples.petclinic.config;


import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.samples.petclinic.security.AuthenticationHelper;
import org.springframework.samples.petclinic.security.JWTAuthenticationFilter;
import org.springframework.samples.petclinic.security.JWTAuthenticationHelper;
import org.springframework.samples.petclinic.security.JWTAuthenticationProvider;
import org.springframework.samples.petclinic.security.JWTLoginFilter;
import org.springframework.samples.petclinic.security.TokenAuthentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserDetailsService userDetailsService;
  private final ObjectMapper objectMapper;

  @Value("${security.custom.login-url}")
  private String loginUrl;

  @Value("${security.custom.excluded-api}")
  private String[] excludedApi;

  @Value("${security.token.expiration-time-seconds}")
  private long expirationTimeSeconds;

  @Value("${security.token.token-prefix}")
  private String tokenPrefix;

  @Autowired
  public SecurityConfig(UserDetailsService userDetailsService, ObjectMapper objectMapper) {
    this.userDetailsService = userDetailsService;
    this.objectMapper = objectMapper;
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public AuthenticationHelper authenticationHelper() {
    return new JWTAuthenticationHelper(userDetailsService, passwordEncoder());
  }

  @Bean
  public JWTLoginFilter jwtLoginFilter() throws Exception {
    JWTLoginFilter jwtLoginFilter = new JWTLoginFilter(loginUrl, tokenAuthentication(), objectMapper);
    jwtLoginFilter.setAuthenticationManager(authenticationManager());
    return jwtLoginFilter;
  }

  @Bean
  public JWTAuthenticationProvider jwtAuthenticationProvider() {
    return new JWTAuthenticationProvider(authenticationHelper());
  }

  @Bean
  public TokenAuthentication tokenAuthentication() {
    return new TokenAuthentication(expirationTimeSeconds, tokenPrefix);
  }

  @Bean
  public JWTAuthenticationFilter jwtAuthenticationFilter() {
    return new JWTAuthenticationFilter(tokenAuthentication());
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Collections.singletonList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Collections.singletonList("*"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .cors()
        .and()
        .csrf()
        .disable()
        .authorizeRequests()
        .anyRequest()
        .permitAll()
        .and()
        .exceptionHandling()
        .and()
        .addFilterBefore(jwtLoginFilter(), UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
  }

  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(jwtAuthenticationProvider());
    auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
