package progi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import progi.data.Canteen;
import progi.repositories.CanteenRepository;


import java.util.List;

@Configuration
public class CanteenConfig {
    @Bean
    CommandLineRunner cCommandLineRunner(CanteenRepository repository){
        return args -> {
            Canteen FERmenza = new Canteen(
                    "FER menza",
                    "Unska",
                    "3"
            );

            repository.saveAll(
                    List.of(FERmenza)
            );
        };
    }
}
