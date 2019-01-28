package org.springframework.samples.petclinic.web;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
//@Profile("ui-tests") https://stackoverflow.com/questions/25427684/using-profile-in-spring-boot
//@ConditionalOnProperty(value = "spring.profiles.active", havingValue = "ui-tests")
public class TestController {

  @GetMapping("/test")
  public String test() {
    return "test.html";
  }
}
