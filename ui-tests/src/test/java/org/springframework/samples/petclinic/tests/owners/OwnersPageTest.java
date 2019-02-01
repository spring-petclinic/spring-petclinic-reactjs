package org.springframework.samples.petclinic.tests.owners;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.Selenide;
import com.github.database.rider.core.api.dataset.DataSet;

import org.junit.Test;
import org.springframework.samples.petclinic.tests.LocalUiTest;
import org.springframework.samples.petclinic.util.LoginUtil;

import lombok.extern.slf4j.Slf4j;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

@Slf4j
public class OwnersPageTest extends LocalUiTest {

  private final LoginUtil loginUtil = new LoginUtil(homePath(), apiLoginPath());

  @Test
  public void shouldBePossibleToSearchOwnersByLastName() {
    Selenide.open("/");
    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();
    $(byText("FIND OWNERS")).click();
    $("#owner-last-name-input").val("F");
    $(byText("Find Owner")).click();

    $$("#owners-table tbody tr").shouldHaveSize(1);

    ElementsCollection owners = $$("#owners-table tbody tr:nth-child(1) td");
    owners.get(0).shouldHave(text("George Franklin"));
    owners.get(1).shouldHave(text("110 W. Liberty St."));
    owners.get(2).shouldHave(text("Madison"));
    owners.get(3).shouldHave(text("6085551023"));
    owners.get(4).shouldHave(text("Leo"));
  }

  @Test
  public void ownerMayBeCreated() {
    Selenide.open("/");
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
      executeScriptsBefore = "datasets/cleanup.sql"
  )
  public void ownerMayBeEdited() {
    /*Selenide.open("/");

    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();

    $(byText("FIND OWNERS")).click();

    $("#owner-last-name-input").val("Dmitriev");
    $(byText("Find Owner")).click();

    $(linkText("Igor Dmitriev")).click();
    $(byText("Edit Owner")).click();*/

    loginUtil.fastLogin();
    Selenide.open("/#/owners/1000/edit");

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
