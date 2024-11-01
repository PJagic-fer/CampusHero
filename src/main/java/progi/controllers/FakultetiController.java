package progi.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/campus_hero/fakulteti")
public class FakultetiController {
    @GetMapping("")
    public String getFakulteti(){
        return ("Općenito o fakultetima");
    }


    @GetMapping("/{fakultet}")
    public String getFakultetiFakultet(@PathVariable String fakultet){
        return "podstranica za fakultet: " + fakultet;
    }


    @PostMapping("/{fakultet}/ocijeni")
    public String postFakultetiFakultetOcijeni(@PathVariable String fakultet){
        return "Ocijeni fakultet: " + fakultet;
    }


    @GetMapping("/{fakultet}/forum")
    public String getFakultetiFakultetForum(@PathVariable String fakultet){
        return "Forum za fakultet: " + fakultet;
    }

    @PostMapping("/{fakultet}/forum/nova_objava")
    public String postFakultetiFakultetForumNovaObjava(@PathVariable String fakultet){
        return "Napiši objavu na forumu";
    }

    @GetMapping("/{fakultet}/forum/{objava}")
    public String getFakultetiFakultetForumObjava(@PathVariable String fakultet, @PathVariable String objava){
        return ("Čita se objava: " + objava + " na forumu");
    }


    @PostMapping("/{fakultet}/forum/{objava}/odgovori")
    public String postFakultetiFakultetForumObjavaOdgovori(@PathVariable String fakultet, @PathVariable String objava){
        return "Odgovara se na objavu: " + objava;
    }
}
