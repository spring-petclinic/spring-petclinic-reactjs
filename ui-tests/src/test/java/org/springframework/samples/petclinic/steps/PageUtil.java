package org.springframework.samples.petclinic.steps;

import static com.codeborne.selenide.Condition.not;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;

public class PageUtil {

  public static final long TIMEOUT_MILLISECONDS = 4000L;
  public static final long POLLING_INTERVAL_MILLISECONDS = 10L;

  public static void waitWhileDataIsLoaded(String spinnerId) {
    String spinner = String.format("#%s .v-spinner", spinnerId);
    $(spinner).waitUntil(visible, TIMEOUT_MILLISECONDS, POLLING_INTERVAL_MILLISECONDS);
    $(spinner).waitUntil(not(visible), TIMEOUT_MILLISECONDS, POLLING_INTERVAL_MILLISECONDS);
  }
}
