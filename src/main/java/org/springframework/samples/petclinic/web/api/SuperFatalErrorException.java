package org.springframework.samples.petclinic.web.api;

public class SuperFatalErrorException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public SuperFatalErrorException(String message) {
		super(message);
	}

}
