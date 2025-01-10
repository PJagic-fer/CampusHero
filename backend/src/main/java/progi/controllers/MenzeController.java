package progi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import progi.data.Canteen;
import progi.services.CanteenService;

@RestController
@RequestMapping("/campus-hero/menze")
public class MenzeController {

    private CanteenService canteenService;

    @Autowired
    public MenzeController(CanteenService canteenService) {
        this.canteenService = canteenService;
    }

    @GetMapping("")
    public List<Canteen> getMenze() {
        return canteenService.getCanteenes();
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
