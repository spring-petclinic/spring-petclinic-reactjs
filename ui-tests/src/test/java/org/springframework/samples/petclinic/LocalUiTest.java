package org.springframework.samples.petclinic;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.WebDriverRunner;

import org.junit.BeforeClass;

/*
  This class is intended only for local development process.
  Do not run all tests if you use LocalUiTest class.
 */
public abstract class LocalUiTest extends TestDataSource implements ApplicationEndpoints {

  private static final String LOCALHOST = "127.0.0.1";

  @BeforeClass
  public static void setupClass() {
    Configuration.browser = WebDriverRunner.CHROME;
    Configuration.holdBrowserOpen = true;
  }

  @Override
  public String loginPath() {
    return homePath() + "/#/login";
  }

  @Override
  public String homePath() {
    return "http://localhost:3000";
  }

  @Override
  public String apiLoginPath() {
    return "http://localhost:8080/login";
  }

  @Override
  protected String jdbcHost() {
    return LOCALHOST;
  }

  @Override
  protected int jdbcPort() {
    return 5432;
  }

}
