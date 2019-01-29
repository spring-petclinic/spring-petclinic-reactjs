package org.springframework.samples.petclinic;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.WebDriverRunner;

import org.junit.Before;
import org.junit.Rule;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.springframework.samples.petclinic.util.FailingUiTestsWatcher;
import org.springframework.samples.petclinic.util.TestContainerUtil;
import org.testcontainers.containers.BrowserWebDriverContainer;
import org.testcontainers.containers.BrowserWebDriverContainer.VncRecordingMode;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.io.File;
import java.time.Duration;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class CiUiTest extends TestDataSource implements ApplicationEndpoints {
  private static final String APPLICATION_SERVICE = "application_1";
  private static final String POSTGRES_SERVICE = "postgres_1";
  private static final int APPLICATION_PORT = 8080;
  private static final int POSTGRES_PORT = 5432;

  private static DockerComposeContainer composeContainer = new DockerComposeContainer(new File("../docker-compose.yml"))
      .withLocalCompose(true)
      .withExposedService(APPLICATION_SERVICE, APPLICATION_PORT, Wait.forListeningPort().withStartupTimeout(Duration.ofMinutes(3)))
      .withLogConsumer(APPLICATION_SERVICE, new Slf4jLogConsumer(log))
      .withExposedService(POSTGRES_SERVICE, POSTGRES_PORT);

  private static BrowserWebDriverContainer chromeContainer = new BrowserWebDriverContainer<>()
      .withDesiredCapabilities(DesiredCapabilities.chrome())
      .withRecordingMode(VncRecordingMode.SKIP, null) // managed by UiTestsWatcher
      .withEnv("SCREEN_WIDTH", "1280")
      .withEnv("SCREEN_HEIGHT", "1024"); // SXGA resolution for tests

  static {
    composeContainer.start();
    TestContainerUtil.linkContainersNetworks(composeContainer, chromeContainer, APPLICATION_SERVICE);
    //System.setProperty("user.timezone", "UTC");
    chromeContainer.start();

    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      // JmxUtil.generateJacocoDump();
      composeContainer.stop();
    }));

    Configuration.baseUrl = "http://application:" + APPLICATION_PORT + "/#";
  }

  @Rule
  public FailingUiTestsWatcher failingUiTestsWatcher = new FailingUiTestsWatcher(chromeContainer);

  @Override
  public String homePath() {
    return "http://application:8080";
  }

  @Override
  public String loginPath() {
    return homePath() + "/#/login";
  }

  @Override
  public String apiLoginPath() {
    return "http://localhost:8070/login";
  }

  @Override
  protected String jdbcHost() {
    return composeContainer.getServiceHost(POSTGRES_SERVICE, POSTGRES_PORT);
  }

  @Override
  protected int jdbcPort() {
    return composeContainer.getServicePort(POSTGRES_SERVICE, POSTGRES_PORT);
  }

  @Before
  public void setUp() {
    WebDriverRunner.setWebDriver(chromeContainer.getWebDriver());
  }
}
