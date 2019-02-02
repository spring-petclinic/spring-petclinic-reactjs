package org.springframework.samples.petclinic.tests.owners;

import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.WebDriverRunner;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.springframework.samples.petclinic.util.TestContainerUtil;
import org.testcontainers.containers.BrowserWebDriverContainer;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.io.File;
import java.time.Duration;

import static com.codeborne.selenide.Condition.exactText;
import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.open;

public class OwnersPageTest {
  @ClassRule
  public static DockerComposeContainer dockerComposeContainer = new DockerComposeContainer(new File("../docker-compose.yml"))
      .withLocalCompose(true)
      .withExposedService("application_1", 8080, Wait.forListeningPort().withStartupTimeout(Duration.ofMinutes(3)))
      .withExposedService("postgres_1", 5432);

  private static BrowserWebDriverContainer chrome;

  @Before
  public void setUp() {
    chrome = new BrowserWebDriverContainer().withCapabilities(DesiredCapabilities.chrome());
    TestContainerUtil.linkContainersNetworks(dockerComposeContainer, chrome, "application_1");
    chrome.start();
    Configuration.baseUrl = "http://application:8080";
    WebDriverRunner.setWebDriver(chrome.getWebDriver());
  }

  @Test
  public void shouldSearchOwnersByLastName() {
    Selenide.open("/");
    $("#username").val("test");
    $("#password").val("testovich");
    $(byText("Login")).click();
    $(byText("FIND OWNERS")).click();
    $("#owner-last-name-input").val("F");
    $(byText("Find Owner")).click();
    $$("#owners-table tbody tr").shouldHaveSize(1);

    ElementsCollection owners = $$("owners-table tbody tr:nth-child(1) td");
    owners.get(0).shouldHave(exactText("George Franklin"));
    owners.get(1).shouldHave(exactText("110 W. Liberty St."));
    owners.get(2).shouldHave(exactText("Madison"));
    owners.get(3).shouldHave(exactText("6085551023"));
    owners.get(4).shouldHave(exactText("Leo"));
  }

  @Test
  public void shouldCreateOwner() {
    open("/");
    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();
    $(byText("FIND OWNERS")).click();

    $(byText("Add Owner")).click();
    $("#firstname-input").val("test-name");
    $("#lastname-input").val("test-lastname");
    $("#address-input").val("test address");
    $("#city-input").val("test city");
    $("#telephone-input").val("555543434");

    $(byText("Add Owner")).click();

    $(byText("Owner Information")).shouldBe(Condition.visible);
    $$("#owners-information-table tbody").shouldHaveSize(1);

    ElementsCollection newOwners = $$("#owners-information-table tbody tr td");
    newOwners.get(0).shouldHave(text("test-name test-lastname"));
    newOwners.get(1).shouldHave(text("test address"));
    newOwners.get(2).shouldHave(text("test city"));
    newOwners.get(3).shouldHave(text("555543434"));
  }
}
