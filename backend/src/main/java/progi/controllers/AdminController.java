package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi.services.ApplicationUserService;

@RestController
@RequestMapping("/campus-hero/admin")
public class AdminController {

    private ApplicationUserService applicationUserService;

    @Autowired
    public AdminController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @GetMapping("")
    public String getAdmin() {
        return applicationUserService.getAllApplicationUsers().toString();
    }
}
