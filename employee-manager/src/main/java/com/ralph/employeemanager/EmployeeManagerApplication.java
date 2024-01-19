package com.ralph.employeemanager;

import com.ralph.employeemanager.user.User;
import com.ralph.employeemanager.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class EmployeeManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagerApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(UserRepository repository) {
		return args -> {
//			User user = new User(
//					"Ralph",
//					"Szakacs",
//					"rakph28@gmail.com",
//					"12345"
//			);
//			User user2 = new User(
//					"Ioana",
//					"Moldovan",
//					"ioana@gmail.com",
//					"12345"
//			);
//			repository.insert(user);
//			repository.insert(user2);
		};
	}
}
