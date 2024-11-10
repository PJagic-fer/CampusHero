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
            Canteen FERMenza = new Canteen(
                    "Menza - FER",
                    "Unska",
                    "3"
            );

            Canteen ekonomskiMenza = new Canteen(
                    "Menza - Ekonomski",
                    "trg J.F.Kennedyja",
                    "6"
            );

            Canteen medicinskiMenza = new Canteen(
                    "Menza - Medicinski fakultet",
                    "Šalata",
                    "3b"
            );

            Canteen veterinarskiMenza = new Canteen(
                    "Menza - Veterinarski fakultet",
                    "Heinzlova",
                    "55"
            );

            Canteen sumarskiMenza = new Canteen(
                    "Menza - Šumarski fakultet",
                    "Svetošimunska",
                    "25"
            );

            Canteen FSBMenza = new Canteen(
                    "Menza - FSB",
                    "Ivana Lučića",
                    "5"
            );

            Canteen ALUMenza = new Canteen(
                    "Menza - ALU",
                    "Ilica",
                    "85c"
            );

            Canteen TTFMenza = new Canteen(
                    "Menza - TTF",
                    "Prilaz brauna Filipovića",
                    "28a"
            );

            Canteen TVZMenza = new Canteen(
                    "Menza - TVZ",
                    "Vrbik",
                    "8"
            );

            Canteen savska = new Canteen(
                    "Restoran Savska",
                    "Savska cesta",
                    "25"
            );

            Canteen stjepanRadic = new Canteen(
                    "Restoran u SD Stjepan Radić",
                    "Jarunska ulica",
                    "2"
            );

            Canteen cvjetno = new Canteen(
                    "Restoran u SD Cvjetno naselje",
                    "Odranska ulica",
                    "8"

            );

            Canteen lascina = new Canteen(
                    "Restoran u SD Lašćina",
                    "Lašćinska cesta",
                    "32"
            );

            Canteen borongaj = new Canteen(
                    "Restoran Borongaj",
                    "Borongajska cesta",
                    "bb"

            );



            repository.saveAll(
                    List.of(FERMenza, ekonomskiMenza, medicinskiMenza, veterinarskiMenza, sumarskiMenza,
                            FSBMenza, ALUMenza, TTFMenza, TVZMenza, savska, stjepanRadic, cvjetno, borongaj, lascina)
            );
        };
    }
}
