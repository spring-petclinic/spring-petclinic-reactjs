package org.springframework.samples.petclinic.web.api;

import org.springframework.validation.Errors;

/**
 * Credits to: Willie Wheeler (http://springinpractice.com/2013/10/09/generating-json-error-object-responses-with-spring-web-mvc)
 *
 * @author Willie Wheeler (@williewheeler)
 */
public class InvalidRequestException extends RuntimeException {
	/**
	 * 
	 */
	private static final long	serialVersionUID	= 1L;
	private Errors						errors;

	public InvalidRequestException(String message, Errors errors) {
		super(message);
		this.errors = errors;
	}

	public Errors getErrors() {
		return errors;
	}

}
