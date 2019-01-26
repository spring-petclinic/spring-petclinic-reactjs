package org.springframework.samples.petclinic.util;

import com.codeborne.selenide.Configuration;

import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.VncRecordingContainer;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static java.time.format.DateTimeFormatter.ofPattern;

public class FailingUiTestsWatcher extends TestWatcher {

  private final GenericContainer targetContainer;

  private VncRecordingContainer vncRecordingContainer;
  private static final String FILE_NAME_PATTERN = "%s-%s-%s.flv";
  private static final DateTimeFormatter DATE_TIME_FORMATTER = ofPattern("dd-MM-YYYY__HH-mm-ss");

  public FailingUiTestsWatcher(GenericContainer targetContainer) {
    this.targetContainer = targetContainer;
  }

  @Override
  protected void starting(Description description) {
    vncRecordingContainer = new VncRecordingContainer(targetContainer)
        .withVncPassword("secret")
        .withVncPort(5900);
    vncRecordingContainer.start();
  }

  @Override
  protected void failed(Throwable e, Description description) {
    String fileName = String.format(
        FILE_NAME_PATTERN,
        description.getTestClass().getSimpleName(),
        description.getMethodName(),
        DATE_TIME_FORMATTER.format(LocalDateTime.now())
    );
    File path = new File(Configuration.reportsFolder + "/" + fileName);
    vncRecordingContainer.saveRecordingToFile(path);
  }

  @Override
  protected void finished(Description description) {
    vncRecordingContainer.stop();
  }
}
