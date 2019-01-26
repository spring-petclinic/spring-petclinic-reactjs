package org.springframework.samples.petclinic.tests;

import com.codeborne.selenide.Selenide;

import org.junit.Test;
import org.springframework.samples.petclinic.LocalUiTest;

public class FirstTest extends LocalUiTest {

  @Test
  public void firstTest() {
    Selenide.open(homePath());
  }
}
