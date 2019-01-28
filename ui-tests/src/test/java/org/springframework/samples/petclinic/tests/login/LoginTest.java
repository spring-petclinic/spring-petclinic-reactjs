package org.springframework.samples.petclinic.tests.login;

import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Selenide;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.samples.petclinic.CiUiTest;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;

@Ignore
public class LoginTest extends CiUiTest {

  @Test
  @DataSet(
      value = {"datasets/test_user.xml"},
      executeScriptsBefore = "datasets/cleanup.sql",
      strategy = SeedStrategy.INSERT
  )
  public void firstTest() {
    Selenide.open(loginPath());
    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();
    $(byText("Welcome")).shouldBe(visible);
  }

  @Test
  public void invalid() {
    Selenide.open(loginPath());
    $("#username").val("invalid username");
    $("#password").val("invalid password");
    $("#login-button").click();
    $(byText("Welcome")).shouldBe(Condition.not(visible));
    $(byText("Incorrect username or password")).shouldBe(visible);
  }
}
