package org.springframework.samples.petclinic.tests;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.WebDriverRunner;

import org.junit.Before;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.springframework.samples.petclinic.util.JmxUtil;
import org.springframework.samples.petclinic.util.TestContainerUtil;
import org.testcontainers.containers.BrowserWebDriverContainer;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.io.File;
import java.time.Duration;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class CiUiTest extends TestDataSource {
  private static DockerComposeContainer dockerComposeContainer = new DockerComposeContainer(new File("../docker-compose.yml"))
      .withLocalCompose(true)
      .withExposedService("application_1", 8080, Wait.forListeningPort().withStartupTimeout(Duration.ofMinutes(3)))
      //.withLogConsumer("application_1", new Slf4jLogConsumer(log))
      .withExposedService("postgres_1", 5432);

  private BrowserWebDriverContainer chromeContainer;

  static {
    dockerComposeContainer.start();
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      JmxUtil.generateJacocoDump();
      dockerComposeContainer.stop();
    }));
  }

  @Before
  public void setUp() {
    chromeContainer = new BrowserWebDriverContainer()
        .withDesiredCapabilities(DesiredCapabilities.chrome())
        .withRecordingMode(BrowserWebDriverContainer.VncRecordingMode.RECORD_FAILING, new File(Configuration.reportsFolder));

    TestContainerUtil.linkContainersNetworks(dockerComposeContainer, chromeContainer, "application_1");
    chromeContainer.start();

    Configuration.baseUrl = "http://application:8080";
    WebDriverRunner.setWebDriver(chromeContainer.getWebDriver());
  }

  @Override
  protected String jdbcHost() {
    return dockerComposeContainer.getServiceHost("postgres_1", 5432);
  }

  @Override
  protected int jdbcPort() {
    return dockerComposeContainer.getServicePort("postgres_1", 5432);
  }
}
