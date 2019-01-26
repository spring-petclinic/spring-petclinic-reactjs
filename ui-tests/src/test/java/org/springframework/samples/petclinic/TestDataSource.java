package org.springframework.samples.petclinic;

import com.github.database.rider.core.DBUnitRule;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import org.junit.Rule;

import javax.sql.DataSource;

public abstract class TestDataSource {
  @Rule
  public DBUnitRule dbUnitRule = DBUnitRule.instance(() -> dataSource().getConnection());

  private DataSource dataSource() {
    HikariConfig hikariConfig = new HikariConfig();
    hikariConfig.setJdbcUrl(String.format("jdbc:postgresql://%s:%d/hsa_crawler", jdbcHost(), jdbcPort()));
    hikariConfig.setUsername("hsa_crawler");
    hikariConfig.setPassword("q9KqUiu2vqnAuf");
    hikariConfig.setConnectionTestQuery("SELECT 1");
    hikariConfig.setMinimumIdle(3);
    hikariConfig.setMaximumPoolSize(10);
    // return new P6DataSource(new HikariDataSource(hikariConfig));
    return new HikariDataSource(hikariConfig);
  }

  protected abstract String jdbcHost();

  protected abstract int jdbcPort();
}