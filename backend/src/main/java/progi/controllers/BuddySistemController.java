package progi.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/campus-hero/buddy-sistem")
public class BuddySistemController {
    @GetMapping("")
    public String getBuddySistem(){
        return ("Dobrodošli na CampusHero sustav za buddy program");
    }

    @GetMapping("/buddy")
    public String getBuddySistemBuddy(){
        return ("Dobrodošli na CampusHero-stranicu za prijaveljne buddyje");
    }

    @PostMapping("/buddy/prijava")
    public String postBuddySistemBuddyPrijava(){
        return ("Dobrodošli na CampusHero-stranicu gdje se buddyji prijavljuju za mentorstvo");
    }

    @GetMapping("/buddy/zahtjevi")
    public String getBuddySistemBuddyZahtjevi(){
        return ("Dobrodošli na CampusHero-stranicu gdje buddyji mogu pregledavati svoje zahtjeve za mentorstvo");
    }

    @GetMapping("/buddy/zahtjevi/{student}")
    public String getBuddySistemBuddyZahtjeviStudent(@PathVariable String student){
        return "Dobrodošli na CampusHero-stranicu gdje buddyji mogu pregledati određenog (jednog iz liste zahtjeva) studenta: " + student;
    }


    @GetMapping("/student")
    public String getBuddySistemStudent(){
        return ("Dobrodošli na CampusHero-stranicu za prijaveljne studente");
    }

    @PostMapping("/student/ocijeni")
    public String postBuddySistemStudentOcijeni(){
        return ("Dobrodošli na CampusHero-stranicu gdje studenti ocjenjuju buddyje");
    }

    @PostMapping("/student/trazi-buddyja")
    public String postBuddySistemStudentTraziBuddyja(){
        return ("Dobrodošli na CampusHero-stranicu gdje studenti pronalaze buddyje");
    }
}
