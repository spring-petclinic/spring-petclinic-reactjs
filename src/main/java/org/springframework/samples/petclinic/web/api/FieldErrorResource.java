package org.springframework.samples.petclinic.web.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Credits to: Willie Wheeler (http://springinpractice.com/2013/10/09/generating-json-error-object-responses-with-spring-web-mvc)
 *
 * @author Willie Wheeler (@williewheeler)
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class FieldErrorResource {
	private String	resource;
	private String	field;
	private String	code;
	private String	message;

	public String getResource() {
		return resource;
	}

	public void setResource(String resource) {
		this.resource = resource;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}