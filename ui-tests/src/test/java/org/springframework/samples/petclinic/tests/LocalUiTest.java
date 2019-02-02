package org.springframework.samples.petclinic.tests;

import com.codeborne.selenide.Configuration;

import org.junit.BeforeClass;

public abstract class LocalUiTest {
  @BeforeClass
  public static void setUpClass() {
    Configuration.baseUrl = "http://localhost:3000";
  }

  protected String jdbcHost() {
    return "127.0.0.1";
  }


  protected int jdbcPort() {
    return 5432;
  }

  protected String homePath() {
    return "http://localhost:3000";
  }

  protected String apiLoginPath() {
    return "http://localhost:8080/login";
  }

}
