package progi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;


@RestController
public class CampusHeroController {

    @GetMapping("")
    public RedirectView redirectToCampusHero(){
        return  new RedirectView("/campus-hero");
    }

    @GetMapping("/campus-hero")
    public String getCampusHero(){
        return ("Dobrodošli na CampusHero");
    }
}
