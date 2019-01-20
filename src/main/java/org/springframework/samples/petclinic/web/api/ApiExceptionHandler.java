package org.springframework.samples.petclinic.web.api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {
  @ExceptionHandler({SuperFatalErrorException.class})
  public ResponseEntity<?> badRequest(HttpServletRequest req, Exception exception) {
    Map<String, Object> result = new Hashtable<>();
    result.put("status", HttpStatus.BAD_REQUEST);
    result.put("message", exception.getMessage());
    return ResponseEntity.badRequest().body(result);
  }

  /**
   * Credits to: Willie Wheeler (http://springinpractice.com/2013/10/09/generating-json-error-object-responses-with-spring-web-mvc)
   *
   * @author Willie Wheeler (@williewheeler)
   */
  @ExceptionHandler({InvalidRequestException.class})
  protected ResponseEntity<Object> handleInvalidRequest(InvalidRequestException ire, WebRequest request) {
    logger.info("InvalidRequestException caught", ire);
    List<FieldErrorResource> fieldErrorResources = new ArrayList<>();

    List<FieldError> fieldErrors = ire.getErrors().getFieldErrors();
    for (FieldError fieldError : fieldErrors) {
      FieldErrorResource fieldErrorResource = new FieldErrorResource();
      fieldErrorResource.setResource(fieldError.getObjectName());
      fieldErrorResource.setField(fieldError.getField());
      fieldErrorResource.setCode(fieldError.getCode());
      fieldErrorResource.setMessage(fieldError.getDefaultMessage());
      fieldErrorResources.add(fieldErrorResource);
    }

    ErrorResource error = new ErrorResource("InvalidRequest", ire.getMessage());
    error.setFieldErrors(fieldErrorResources);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    return handleExceptionInternal(ire, error, headers, HttpStatus.UNPROCESSABLE_ENTITY, request);
  }

  @ExceptionHandler({BadRequestException.class})
  protected ResponseEntity<Object> handleBadRequest(BadRequestException bre, WebRequest request) {
    logger.info("BadRequestException caught", bre);

    ErrorResource error = new ErrorResource("BadRequest", bre.getMessage());
    error.addGlobalError(bre.getMessage());

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    return handleExceptionInternal(bre, error, headers, HttpStatus.BAD_REQUEST, request);
  }

  @ResponseBody
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(value = {Exception.class})
  public ResponseEntity<Object> unhandledException(Exception ex, WebRequest request) {
    logger.error(ex.getMessage(), ex);
    ErrorResource error = new ErrorResource("Internal Server Error", ex.getMessage());
    error.addGlobalError(ex.getMessage());

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    return handleExceptionInternal(ex, error, headers, HttpStatus.UNPROCESSABLE_ENTITY, request);
  }
}