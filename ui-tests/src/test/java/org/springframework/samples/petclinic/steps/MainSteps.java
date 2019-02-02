package org.springframework.samples.petclinic.steps;

import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.WebDriverRunner;
import com.jayway.restassured.RestAssured;

import org.apache.http.HttpStatus;
import org.openqa.selenium.Cookie;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@RequiredArgsConstructor
public class MainSteps {
  private static final String TEST_USERNAME = "test";
  private static final String TEST_PASSWORD = "testovich";

  private final String homePath;
  private final String apiLoginPath;

  @SneakyThrows
  public void loginUsingApi(String username, String password) {
    String token = RestAssured.given()
        .body("{\n" +
            "\"username\":\"" + username + "\",\n" +
            "\"password\":\"" + password + "\"\n" +
            "}\n")
        .post(apiLoginPath)
        .then()
        .assertThat()
        .statusCode(HttpStatus.SC_OK)
        .and()
        .extract()
        .response()
        .jsonPath()
        .get("token");

    String cookieValue = URLEncoder.encode(token, StandardCharsets.UTF_8.toString());

    Cookie cookie = new Cookie("user", cookieValue, "/");
    WebDriverRunner.getWebDriver().manage().addCookie(cookie);
  }

  public void fastLogin() {
    Selenide.open(homePath + "/test.html");
    loginUsingApi(TEST_USERNAME, TEST_PASSWORD);
  }

  public void openFindOwnersTab() {
    Selenide.open("/#/owners/list");
  }
}
