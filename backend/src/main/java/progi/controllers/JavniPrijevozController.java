package progi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/campus-hero/javni-prijevoz")
public class JavniPrijevozController {

    @GetMapping("")
    public String getJavniPrijevoz(){
        return "Općenito o javnom prijevozu";
    }
}
