package progi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import progi.data.Canteen;
import progi.data.StudentHome;
import progi.repositories.CanteenRepository;
import progi.repositories.StudentHomeRepository;

import java.util.List;

@Configuration
public class StudentHomeConfig {
    @Bean
    CommandLineRunner shCommandLineRunner(StudentHomeRepository repository){
        return args -> {
            StudentHome cvjetno = new StudentHome(
                    "Studentski dom Cvjetno naselje",
                    "Odranska ulica",
                    "8"
            );

            repository.saveAll(
                    List.of(cvjetno)
            );
        };
    }
}
