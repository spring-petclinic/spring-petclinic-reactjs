package org.springframework.samples.petclinic.steps;

import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.WebDriverRunner;
import com.jayway.restassured.RestAssured;

import org.openqa.selenium.Cookie;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import lombok.RequiredArgsConstructor;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;

@RequiredArgsConstructor
public class MainSteps {
  private static final String TEST_USERNAME = "test";
  private static final String TEST_PASS = "testovich";

  private final String apiLoginPath;
  private final String loginPath;
  private final String homePath;

  public void login(String username, String password) {
    $("#username").val(username);
    $("#password").val(password);
    $("#login-button").click();
  }

  public void loginUsingApi(String username, String password) throws UnsupportedEncodingException {
    String token = RestAssured.given()
        .body("{\n" +
            "\"username\":\"" + username + "\",\n" +
            "\"password\":\"" + password + "\"\n" +
            "}\n")
        .post(apiLoginPath)
        .then()
        .extract()
        .response()
        .jsonPath()
        .get("token");

    String cookieValue = URLEncoder.encode("{\"username\":\"" + username + "\"," +
        "\"token\":\"" + token + "\"}", StandardCharsets.UTF_8.toString());

    Cookie cookie = new Cookie("user", cookieValue, "/");
    WebDriverRunner.getWebDriver().manage().addCookie(cookie);
  }

  public void assertInvalidLoginOrPassword() {
    $(byText("Incorrect login or password")).shouldBe(visible);
  }

  public void openHomePage() {
    Selenide.open(loginPath);
  }

  public void fastLogin() {
    Selenide.open(homePath + "/test");
    try {
      loginUsingApi(TEST_USERNAME, TEST_PASS);
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }

  public void open(String path) {
    Selenide.open(path);
  }
}
