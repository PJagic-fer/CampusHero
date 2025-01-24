package progi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}
