package org.springframework.samples.petclinic.steps;

import com.codeborne.selenide.ElementsCollection;

import static com.codeborne.selenide.Condition.exactText;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

public class OwnersSteps {
  private static final int NAME_COLUMN_INDEX = 0;
  private static final int ADDRESS_COLUMN_INDEX = 1;
  private static final int CITY_COLUMN_INDEX = 2;
  private static final int TELEPHONE_COLUMN_INDEX = 3;
  private static final int PETS_COLUMN_INDEX = 4;

  public void searchOwnersByLastName(String lastName) {
    $("#owner-last-name-input").val("F");
    $(byText("Find Owner")).click();
  }

  public void assertOwnersTableHasSize(int expectedSize) {
    $$("#owners-table tbody tr").shouldHaveSize(expectedSize);
  }

  public void assertOwnersTableHasData(int row, String expectedFullName, String expectedAddress, String expectedCity, String expectedTelephone, String expectedPets) {
    ElementsCollection owners = $$("#owners-table tbody tr:nth-child(" + row + ") td");
    owners.get(NAME_COLUMN_INDEX).shouldHave(exactText(expectedFullName));
    owners.get(ADDRESS_COLUMN_INDEX).shouldHave(exactText(expectedAddress));
    owners.get(CITY_COLUMN_INDEX).shouldHave(exactText(expectedCity));
    owners.get(TELEPHONE_COLUMN_INDEX).shouldHave(exactText(expectedTelephone));
    owners.get(PETS_COLUMN_INDEX).shouldHave(exactText(expectedPets));
  }
}
