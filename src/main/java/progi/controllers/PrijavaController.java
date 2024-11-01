package progi.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/campus_hero/prijava")
public class PrijavaController {

    @PostMapping("")
    public String postPrijava(){
        return "prijava-post";
    }

    @GetMapping("")
    public String getPrijava(){
        return "prijava-get";
    }
}
