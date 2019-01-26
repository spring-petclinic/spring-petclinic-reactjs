package org.springframework.samples.petclinic.util;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.InspectContainerResponse;

import org.junit.runner.Description;
import org.junit.runners.model.Statement;
import org.testcontainers.DockerClientFactory;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.Network;
import org.testcontainers.containers.SocatContainer;
import org.testcontainers.containers.traits.LinkableContainer;

import java.lang.reflect.Field;

import lombok.SneakyThrows;

public class TestContainerUtil {
  public static void linkContainersNetworks(DockerComposeContainer composeContainer, GenericContainer genericContainer, String applicationName) {
    String network = findApplicationServiceNetwork(applicationName, composeContainer);
    Network tcNet = createNetwork(network);
    genericContainer.withNetwork(tcNet);
  }

  private static Network createNetwork(String network) {
    return new Network() {
      @Override
      public String getId() {
        return network;
      }

      @Override
      public void close() {

      }

      @Override
      public Statement apply(Statement base, Description description) {
        return null;
      }
    };
  }

  @SneakyThrows
  private static String findApplicationServiceNetwork(String applicationName, DockerComposeContainer compose) {
    Field ambassadorContainerField = compose.getClass().getDeclaredField("ambassadorContainer");
    ambassadorContainerField.setAccessible(true);
    SocatContainer ambassadorContainer = (SocatContainer) ambassadorContainerField.get(compose);
    LinkableContainer linkedContainer = ambassadorContainer.getLinkedContainers().get(applicationName);

    DockerClient client = DockerClientFactory.instance().client();
    InspectContainerResponse containerInfo = client.inspectContainerCmd(linkedContainer.getContainerName()).exec();
    String networkName = containerInfo.getNetworkSettings().getNetworks().keySet().stream().findFirst().get();
    return client.inspectNetworkCmd().withNetworkId(networkName).exec().getId();
  }
}
