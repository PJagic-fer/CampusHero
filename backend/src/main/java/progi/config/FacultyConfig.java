package progi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import progi.data.Faculty;
import progi.repositories.FacultyRepository;

import java.util.List;

@Configuration
public class FacultyConfig {
    @Bean
    CommandLineRunner fCommandLineRunner(FacultyRepository repository){
        return args -> {
            Faculty FER = new Faculty(
                    "FER",
                    "Unska ulica",
                    "4"
            );

            Faculty FSB = new Faculty(
                    "FSB",
                    "Ulica Ivana Lučića",
                    "5"
            );
            repository.saveAll(
                    List.of(FER, FSB)
            );
        };
    }
}
