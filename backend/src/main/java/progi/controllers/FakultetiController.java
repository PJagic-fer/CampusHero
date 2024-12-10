package progi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi.data.Faculty;
import progi.services.FacultyService;

@RestController
@RequestMapping("/campus-hero/fakulteti")
public class FakultetiController {

    private FacultyService facultyService;

    @Autowired
    public FakultetiController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping("")
    public List<Faculty> getFakulteti() {
        return facultyService.getFaculties();
    }

    @GetMapping("/{fakultet}")
    public String getFakultetiFakultet(@PathVariable String fakultet) {
        return "podstranica za fakultet: " + fakultet;
    }

    @PostMapping("/{fakultet}/ocijeni")
    public String postFakultetiFakultetOcijeni(@PathVariable String fakultet) {
        return "Ocijeni fakultet: " + fakultet;
    }

    @GetMapping("/{fakultet}/forum")
    public String getFakultetiFakultetForum(@PathVariable String fakultet) {
        return "Forum za fakultet: " + fakultet;
    }

    @PostMapping("/{fakultet}/forum/nova-objava")
    public String postFakultetiFakultetForumNovaObjava(@PathVariable String fakultet) {
        return "Napiši objavu na forumu";
    }

    @GetMapping("/{fakultet}/forum/{objava}")
    public String getFakultetiFakultetForumObjava(@PathVariable String fakultet, @PathVariable String objava) {
        return ("Čita se objava: " + objava + " na forumu");
    }

    @PostMapping("/{fakultet}/forum/{objava}/odgovori")
    public String postFakultetiFakultetForumObjavaOdgovori(@PathVariable String fakultet, @PathVariable String objava) {
        return "Odgovara se na objavu: " + objava;
    }
}
