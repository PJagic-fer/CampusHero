package progi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import progi.data.StudentHome;
import progi.repositories.StudentHomeRepository;

import java.util.List;

@Configuration
public class StudentHomeConfig {
    @Bean
    CommandLineRunner shCommandLineRunner(StudentHomeRepository repository){
        return args -> {
            StudentHome cvjetno = new StudentHome(
                    "SD Cvjetno naselje",
                    "Odranska ulica",
                    "8"
            );

            StudentHome stjepan = new StudentHome(
                    "SD Stjepan Radić",
                    "Jarunska",
                    "2"
            );

            StudentHome lascina = new StudentHome(
                    "SD Lašćina",
                    "lašćinska cesta",
                    "32"
            );

            StudentHome starcevic = new StudentHome(
                    "SD Dr. Ante Starčević",
                    "Zagrebačka avenija",
                    "2"
            );

            repository.saveAll(
                    List.of(cvjetno, stjepan, lascina, starcevic)
            );
        };
    }
}
