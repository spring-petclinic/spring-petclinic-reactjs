package org.springframework.samples.petclinic.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LocaleController {
	
	@RequestMapping(value="/locale", method = RequestMethod.GET)
	public String getLocalePage() {
		return "welcome";
	}

}
