package progi.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/campus-hero/menze")
public class MenzeController {

    @GetMapping("")
    public String getMenze(){
        return ("Općenito o menzama");
    }


    @GetMapping("/{menza}")
    public String getMenzeFakultet(@PathVariable String menza){
        return "podstranica za menzu: " + menza;
    }


    @PostMapping("/{menza}/ocijeni")
    public String postMenzeFakultetOcijeni(@PathVariable String menza){
        return "Ocijeni menzu: " + menza;
    }


    @PostMapping("/{menza}/prijavi-guzvu")
    public String postMenzeFakultetPrijaviGuzvu(@PathVariable String menza){
        return "Prijavi gužvu u menzi: " + menza;
    }
}
