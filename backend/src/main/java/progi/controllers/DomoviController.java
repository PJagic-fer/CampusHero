package progi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi.data.StudentHome;
import progi.services.StudentHomeService;

@RestController
@RequestMapping("/campus-hero/domovi")
public class DomoviController {

    private StudentHomeService studentHomeService;

    @Autowired
    public DomoviController(StudentHomeService studentHomeService) {
        this.studentHomeService = studentHomeService;
    }

    @GetMapping("")
    public List<StudentHome> getDomovi() {
        return studentHomeService.getStudenthomes();
    }
}
