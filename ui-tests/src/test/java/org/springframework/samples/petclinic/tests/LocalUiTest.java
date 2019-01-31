package org.springframework.samples.petclinic.tests;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.WebDriverRunner;

import org.junit.BeforeClass;

public abstract class LocalUiTest {
  @BeforeClass
  public static void setUpClass() {
    Configuration.browser = WebDriverRunner.CHROME;
    Configuration.holdBrowserOpen = true;
    Configuration.baseUrl = "http://localhost:3000";
  }
}
