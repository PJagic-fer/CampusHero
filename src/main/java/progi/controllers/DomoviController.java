package progi.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/campus-hero/domovi")
public class DomoviController {

    @GetMapping("")
    public String getDomovi(){
        return ("Općenito o domovima");
    }

    @GetMapping("/pomoc")
    public String getDomoviPomoc(){
        return ("Pomoć pri prijavi za dom");
    }


    @GetMapping("/{dom}")
    public String getDomoviDom(@PathVariable String dom){
        return "podstranica za dom: " + dom;
    }


    @PostMapping("/{dom}/ocijeni")
    public String postDomoviDomOcijeni(@PathVariable String dom){
        return "Ocijeni dom: " + dom;
    }


    @GetMapping("/{dom}/forum")
    public String getDomoviDomForum(@PathVariable String dom){
        return "Forum za dom: " + dom;
    }

    @PostMapping("/{dom}/forum/nova-objava")
    public String postDomoviDomForumNovaObjava(@PathVariable String dom){
        return "Napiši objavu na forumu";
    }

    @GetMapping("/{dom}/forum/{objava}")
    public String getDomoviDomForumObjava(@PathVariable String dom, @PathVariable String objava){
        return ("Čita se objava: " + objava + " na forumu");
    }


    @PostMapping("/{dom}/forum/{objava}/odgovori")
    public String postDomoviDomForumObjavaOdgovori(@PathVariable String dom, @PathVariable String objava){
        return "Odgovara se na objavu: " + objava;
    }
}

