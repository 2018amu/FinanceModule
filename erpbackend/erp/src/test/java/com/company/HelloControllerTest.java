package com.company;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloControllerTest {

    @LocalServerPort
    private int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }

    @Test
    public void testHello() {
        when().get("/").then()
                .body(is("Hello World!"));
    }

    @Test
    public void testCalc() {
        given().param("left", 100)
               .param("right", 200)
               .get("/calc")
               .then()
               .body("left", is(100))
               .body("right", is(200))
               .body("answer", is(300));
    }
}