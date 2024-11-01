package progi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/campus_hero/admin")
public class AdminController {

    @GetMapping("")
    public String getAmin(){
        return ("Admin stranica; nerazrađeno");
    }
}
