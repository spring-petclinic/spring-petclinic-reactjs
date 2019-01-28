package org.springframework.samples.petclinic.tests.pets;

import com.codeborne.selenide.Selenide;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.SeedStrategy;

import org.junit.Test;
import org.springframework.samples.petclinic.CiUiTest;
import org.springframework.samples.petclinic.steps.MainSteps;

import static com.codeborne.selenide.CollectionCondition.texts;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static org.openqa.selenium.By.linkText;

public class PetsPageTest extends CiUiTest {
  private MainSteps mainSteps = new MainSteps(apiLoginPath(), loginPath(), homePath());

  @Test
  @DataSet(
      value = {
          "datasets/test_user.xml",
          "datasets/owners/owner-to-edit.xml",
          "datasets/pets/types.xml"
      },
      executeScriptsBefore = "datasets/cleanup.sql",
      strategy = SeedStrategy.INSERT
  )
  public void addNewPet() {
    //mainSteps.fastLogin();
    Selenide.open(homePath());
    $("#username").val("test");
    $("#password").val("testovich");
    $("#login-button").click();

    $(byText("FIND OWNERS")).click();
    $("#owner-last-name-input").val("Dmitriev");
    $(byText("Find Owner")).click();
    $(linkText("Igor Dmitriev")).click();
    $(byText("Add New Pet")).click();
    $("#name").val("Jacky").click();
    $("#birth-date").val("2019-10-10");
    $(byText("Igor")).click();
    $("#type").selectOption("dog");
    $("#add-pet-button").click();

    $$("#pets-and-visits-table  tbody tr dl dd")
        .shouldHave(texts("Jacky", "2019/10/10", "dog"));
  }
}
