package org.springframework.samples.petclinic.tests;

import com.github.database.rider.core.DBUnitRule;
import com.p6spy.engine.spy.P6DataSource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import org.junit.Rule;

import javax.sql.DataSource;

public abstract class TestDataSource {
  @Rule
  public DBUnitRule dbUnitRule = DBUnitRule.instance(() -> dataSource().getConnection());

  private DataSource dataSource() {
    HikariConfig hikariConfig = new HikariConfig();
    hikariConfig.setJdbcUrl(String.format("jdbc:postgresql://%s:%d/petclinic", jdbcHost(), jdbcPort()));
    hikariConfig.setUsername("petclinic");
    hikariConfig.setPassword("q9KqUiu2vqnAuf");
    hikariConfig.setConnectionTestQuery("SELECT 1");
    hikariConfig.setMinimumIdle(3);
    hikariConfig.setMaximumPoolSize(10);
    return new P6DataSource(new HikariDataSource(hikariConfig));
  }

  protected abstract String jdbcHost();

  protected abstract int jdbcPort();

}
