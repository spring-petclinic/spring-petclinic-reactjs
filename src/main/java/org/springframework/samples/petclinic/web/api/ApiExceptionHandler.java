package org.springframework.samples.petclinic.web.api;

import java.util.Hashtable;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler  {
  @ExceptionHandler({SuperFatalErrorException.class})
  public ResponseEntity<?> badRequest(HttpServletRequest req, Exception exception) {
  	Map<String, Object> result = new Hashtable<>();
  	result.put("status", HttpStatus.BAD_REQUEST);
  	result.put("message", exception.getMessage());
  	return ResponseEntity.badRequest().body(result);
  }
}