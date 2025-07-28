package org.heymouad.focusapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FocusAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(FocusAppApplication.class, args);
    }

}
