package org.springframework.samples.petclinic.tests.owners;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.Selenide;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;

import org.junit.Test;
import org.springframework.samples.petclinic.CiUiTest;
import org.springframework.samples.petclinic.steps.MainSteps;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static org.openqa.selenium.By.linkText;

public class OwnersPageTest extends CiUiTest {

  private MainSteps mainSteps = new MainSteps(apiLoginPath(), loginPath(), homePath());

  @Test
  @DataSet(
      value = {"datasets/test_user.xml", "datasets/owners/owners-search.xml"},
      executeScriptsBefore = "datasets/cleanup.sql",
      strategy = SeedStrategy.INSERT
  )
  public void itIsPossibleToSearchOwnersByLastName() {
    Selenide.open(homePath());
    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();

    $(byText("FIND OWNERS")).click();

    $("#owner-last-name-input").val("D");
    $(byText("Find Owner")).click();

    // TODO
    // $(byText("1 Owners found")).shouldBe(visible);

    $$("#owners-table tbody tr").shouldHaveSize(1);
    ElementsCollection owners = $$("#owners-table tbody tr td");
    owners.get(0).shouldHave(text("Igor Dmitriev"));
    owners.get(1).shouldHave(text("a"));
    owners.get(2).shouldHave(text("a"));
    owners.get(3).shouldHave(text("09323"));
    owners.get(3).shouldHave(text(""));
  }

  @Test
  @DataSet(
      value = {"datasets/test_user.xml"},
      executeScriptsBefore = "datasets/cleanup.sql",
      strategy = SeedStrategy.INSERT
  )
  public void ownerMayBeCreated() {
    Selenide.open(homePath());
    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();

    $(byText("FIND OWNERS")).click();

    $(byText("Add Owner")).click();
    $("#firstname-input").val("Tony");
    $("#lastname-input").val("Stark");
    $("#address-input").val("1st Street");
    $("#city-input").val("New York");
    $("#telephone-input").val("0321321");
    $(byText("Add Owner")).click();

    $(byText("Owner Information")).shouldBe(visible);
    $$("#owners-information-table tbody").shouldHaveSize(1);
    ElementsCollection owners = $$("#owners-information-table tbody tr td");
    owners.get(0).shouldHave(text("Tony Stark"));
    owners.get(1).shouldHave(text("1st Street"));
    owners.get(2).shouldHave(text("New York"));
    owners.get(3).shouldHave(text("0321321"));
  }

  @Test
  @DataSet(
      value = {"datasets/test_user.xml", "datasets/owners/owner-to-edit.xml"},
      executeScriptsBefore = "datasets/cleanup.sql",
      strategy = SeedStrategy.INSERT
  )
  public void ownerMayBeEdited() {
    Selenide.open(homePath());
    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();

    $(byText("FIND OWNERS")).click();

    $("#owner-last-name-input").val("Dmitriev");
    $(byText("Find Owner")).click();

    $(linkText("Igor Dmitriev")).click();
    $(byText("Edit Owner")).click();

    $("#firstname-input").val("newfirstname");
    $("#lastname-input").val("newlastname");
    $("#address-input").val("new street");
    $("#city-input").val("new city");
    $("#telephone-input").val("1111");

    $(byText("Update Owner")).click();

    $(byText("Owner Information")).shouldBe(visible);
    $$("#owners-information-table tbody").shouldHaveSize(1);
    ElementsCollection owners = $$("#owners-information-table tbody tr td");
    owners.get(0).shouldHave(text("newfirstname newlastname"));
    owners.get(1).shouldHave(text("new street"));
    owners.get(2).shouldHave(text("new city"));
    owners.get(3).shouldHave(text("1111"));
  }
}
