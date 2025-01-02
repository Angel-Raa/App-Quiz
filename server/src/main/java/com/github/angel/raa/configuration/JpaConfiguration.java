package com.github.angel.raa.configuration;

import io.hypersistence.utils.spring.repository.BaseJpaRepositoryImpl;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@EntityScan(basePackages = "com.github.angel.raa.entity")
@EnableJpaRepositories(
        basePackages = "com.github.angel.raa.repository",
        value = {"com.github.angel.raa.repository", "io.hypersistence.utils.spring.repository"},
        repositoryBaseClass = BaseJpaRepositoryImpl.class
)
@Configuration
public class JpaConfiguration {

}
