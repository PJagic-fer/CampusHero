package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import progi.data.ApplicationUser;
import progi.data.services.ApplicationUserService;

@RestController
@RequestMapping("/campus-hero/prijava")
public class PrijavaController {

    private ApplicationUserService applicationUserService;

    @Autowired
    public PrijavaController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @PostMapping("")
    public void postPrijava(@RequestBody ApplicationUser newUser){
        applicationUserService.addNewApplicationUser(newUser);
    }

    @GetMapping("")
    public String getPrijava(){
        return "prijava-get";
    }
}
