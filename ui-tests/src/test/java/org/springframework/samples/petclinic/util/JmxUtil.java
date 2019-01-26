package org.springframework.samples.petclinic.util;

import javax.management.MBeanServerConnection;
import javax.management.ObjectName;
import javax.management.remote.JMXConnector;
import javax.management.remote.JMXConnectorFactory;
import javax.management.remote.JMXServiceURL;

import lombok.SneakyThrows;

public class JmxUtil {
  @SneakyThrows
  public static void generateJacocoDump() {
    JMXServiceURL jmxURL = new JMXServiceURL("service:jmx:rmi:///jndi/rmi://localhost:9999/jmxrmi");
    try (JMXConnector jmxc = JMXConnectorFactory.connect(jmxURL)) {
      MBeanServerConnection connection = jmxc.getMBeanServerConnection();
      ObjectName objName = new ObjectName("org.jacoco:type=Runtime");
      connection.invoke(objName, "dump",
          new Object[]{true},
          new String[]{Boolean.TYPE.getName()}
      );
    }
  }
}
