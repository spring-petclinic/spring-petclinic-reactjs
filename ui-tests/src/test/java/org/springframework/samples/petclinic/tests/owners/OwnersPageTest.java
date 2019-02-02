package org.springframework.samples.petclinic.tests.owners;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.Selenide;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;

import org.junit.Test;
import org.springframework.samples.petclinic.steps.MainSteps;
import org.springframework.samples.petclinic.steps.OwnersSteps;
import org.springframework.samples.petclinic.tests.CiUiTest;
import org.springframework.samples.petclinic.util.LoginUtil;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.open;

public class OwnersPageTest extends CiUiTest {

  private MainSteps mainSteps = new MainSteps(homePath(), apiLoginPath());
  private OwnersSteps ownersSteps = new OwnersSteps();
  private LoginUtil loginUtil = new LoginUtil(homePath(), apiLoginPath());

  @Test
  public void shouldSearchOwnersByLastName() {
    mainSteps.fastLogin();
    mainSteps.openFindOwnersTab();
    ownersSteps.searchOwnersByLastName("F");
    ownersSteps.assertOwnersTableHasSize(1);
    ownersSteps.assertOwnersTableHasData(
        2,
        "George Franklin",
        "110 W. Liberty St.",
        "Madison",
        "6085551023",
        "Leo"
    );
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

    $(byText("Owner Information")).shouldBe(visible);
    $$("#owners-information-table tbody").shouldHaveSize(1);

    ElementsCollection newOwners = $$("#owners-information-table tbody tr td");
    newOwners.get(0).shouldHave(text("test-name test-lastname"));
    newOwners.get(1).shouldHave(text("test address"));
    newOwners.get(2).shouldHave(text("test city"));
    newOwners.get(3).shouldHave(text("555543434"));
  }

  @Test
  @DataSet(
      value = {
          "datasets/test_user.xml",
          "datasets/owners/owner-to-edit.xml"
      },
      executeScriptsBefore = "datasets/cleanup.sql",
      strategy = SeedStrategy.INSERT
  )
  public void shouldEditOwner() {
    /*Selenide.open("/");

    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();

    $(byText("FIND OWNERS")).click();

    $("#owner-last-name-input").val("Dmitriev");
    $(byText("Find Owner")).click();

    $(linkText("Igor Dmitriev")).click();*/

    mainSteps.fastLogin();
    Selenide.open("/#/owners/1000");

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
