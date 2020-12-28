package org.springframework.samples.petclinic.config;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.Locale;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@Configuration
public class AppConfig extends WebMvcConfigurerAdapter {
	
	   @Bean
	   public LocaleResolver localeResolver() {
	       SessionLocaleResolver sessionLocaleResolver = new SessionLocaleResolver();
	       sessionLocaleResolver.setDefaultLocale(Locale.US);
	       return sessionLocaleResolver;
	   }
	 
	   @Bean
	   public LocaleChangeInterceptor localeChangeInterceptor() {
	       LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
	       lci.setParamName("lang");
	       return lci;
	   }
	 
	   @Override
	   public void addInterceptors(InterceptorRegistry registry) {
	       registry.addInterceptor(localeChangeInterceptor());
	   }

}
