package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.web.client.RestClient;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DemoApplicationTests {

    @LocalServerPort
    private int port;

    @Test
    void helloEndpointReturnsExpectedMessage() {
        String response = RestClient.create()
                .get()
                .uri("http://localhost:" + port + "/api/hello")
                .retrieve()
                .body(String.class);

        assertThat(response).isEqualTo("Hello Spring Boot API");
    }
}
