package progi.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import progi.data.Faculty;
import progi.repositories.FacultyRepository;

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

            Faculty Agronomski = new Faculty(
                "Agronomski fakultet",
                "Svetošimunska", 
                "25"
            );

            Faculty Arhitektonski = new Faculty(
                "Arhitektonski fakultet",
                "Fra Andrije Kačića Miošića", 
                "26"
            );

            Faculty EduRehab = new Faculty(
                "Edukacijsko-rehabilitacijski fakultet",
                "Borongajska cesta", 
                "83f"
            );

            Faculty Ekonomski = new Faculty(
                "Ekonomski fakultet",
                "Kennedyjev trg", 
                "6"
            );

            Faculty FiloReligZnan= new Faculty(
                "Fakultet filozofije i religijskih znanosti",
                "Jordanovac", 
                "110"
            );

            Faculty HrvStudija = new Faculty(
                "Fakultet hrvatskih studija",
                "Borongajska cesta", 
                "83d"
            );

            Faculty KemInz= new Faculty(
                "Fakultet kemijskog inženjerstva i tehnologije",
                "Marulićev trg", 
                "19"
            );

            Faculty OrgInf= new Faculty(
                "Fakultet organizacije i informatike",
                "Pavlinska", 
                "2"  
            );

            Faculty PolitZnan= new Faculty(
                "Fakultet političkih znanosti",
                "Lepušićeva", 
                "6"
            );

            Faculty PromZnan= new Faculty(
                "Fakultet prometnih znanosti",
                "Vukelićeva", 
                "4"
            );
            
            Faculty Sumarstvo= new Faculty(
                "Fakultet šumarstva i drvne tehnologije",
                "Svetošimunska", 
                "25"
            );

            Faculty Biokemijski= new Faculty(
                "Farmaceutsko-biokemijski fakultet",
                "Ante Kovačića", 
                "1"
            );

            Faculty Filozofski= new Faculty(
                "Filozofski fakultet",
                "Ivana Lučića", 
                "3"
            );

            Faculty Geodetski = new Faculty(
                "Geodetski fakultet",
                "Kačićeva", 
                "26"
            );

            Faculty Geotehnicki = new Faculty(
                "Geotehnički fakultet",
                "Hallerova aleja", 
                "7"
            );

            Faculty Građevinski = new Faculty(
                "Građevinski fakultet",
                "Fra Andrije Kačića Miošića", 
                "26"
            );

            Faculty Graficki= new Faculty(
                "Grafički fakultet",
                "Getaldićeva", 
                "2"
            );

            Faculty Katolicki= new Faculty(
                "Katolički bogoslovni fakultet",
                "Vlaška", 
                "38"
            );

            Faculty Kinezioloski= new Faculty(
                "Kineziološki fakultet",
                "Horvaćanski zavoj", 
                "15"
            );

            Faculty Medicinski = new Faculty(
                "Medicinski fakultet",
                "Šalata", 
                "3b"
            );

            Faculty Metalurski = new Faculty(
               "Metalurški fakultet",
                "Aleja narodnih heroja", 
                "3" 
            );

            Faculty Pravni = new Faculty(
                "Pravni fakultet",
                "Trg Republike Hrvatske", 
                "14"
            );

            Faculty PrehBioTehn= new Faculty(
                "Prehrambeno-biotehnološki fakultet",
                "Pierottijeva", 
                "6"
            );

            Faculty PMF = new Faculty(
                "Prirodoslovno-matematički fakultet",
                "Horvatovac", 
                "102a"
            );

            Faculty RudGeoNaft= new Faculty(
                "Rudarsko-geološko-naftni fakultet",
                "Pierottijeva", 
                "6"
            );

            Faculty Stomatoloski = new Faculty(
                "Stomatološki fakultet",
                "Gundulićeva", 
                "5"
            );
            Faculty TekstilnoTehn = new Faculty(
                "Tekstilno-tehnološki fakultet",
                "Prilaz baruna Filipovića", 
                "28a"
            );

            Faculty Uciteljski = new Faculty(
               "Učiteljski fakultet",
                "Savska cesta", 
                "7"
            );
            Faculty Veterinarski = new Faculty(
                "Veterinarski fakultet",
                "Heinzelova", 
                "55"
            );
            repository.saveAll(
                    List.of(FER, FSB, Agronomski, Arhitektonski, EduRehab, Ekonomski, FiloReligZnan, HrvStudija, KemInz,
                    OrgInf, PolitZnan, PromZnan, Sumarstvo, Biokemijski, Filozofski, Geodetski, Geotehnicki, Građevinski, 
                    Graficki, Katolicki, Kinezioloski, Medicinski, Metalurski, Pravni, PrehBioTehn, PMF, RudGeoNaft, 
                    Stomatoloski, TekstilnoTehn, Uciteljski, Veterinarski)
            );
        };
    }
}
