package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.data.ApplicationUser;
import progi.services.ApplicationUserService;

import java.util.Optional;

@RestController
@RequestMapping("/campus-hero/prijava")
public class PrijavaController {

    public static class RegistrationData {
        private String tokenId;
        private ApplicationUser user;

        public RegistrationData(){}

        public RegistrationData(String tokenId, ApplicationUser newUser) {
            this.tokenId = tokenId;
            this.user = newUser;
        }

        public String getTokenId() {
            return tokenId;
        }

        public void setTokenId(String tokenId) {
            this.tokenId = tokenId;
        }

        public ApplicationUser getUser() {
            return user;
        }

        public void setUser(ApplicationUser user) {
            this.user = user;
        }
    }

    private ApplicationUserService applicationUserService;

    @Autowired
    public PrijavaController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @PostMapping("")
    public ResponseEntity<?> postPrijava(@RequestBody String tokenId){
        System.out.println(tokenId);
        //TODO pošalji token na autentifikaciju
        //autentifikacija varaća sub, što je zapravo AppUser id
        Optional<ApplicationUser> user = applicationUserService.getApplicationUser(tokenId);
        if (user.isEmpty())
        {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/registracija")
    public ResponseEntity<?> postPrijava(@RequestBody RegistrationData registrationData){
        String tokenId = registrationData.tokenId;
        //TODO pošalji token na autentifikaciju
        //autentifikacija varaća sub, što je zapravo AppUser id
        ApplicationUser newUser = registrationData.user;
        newUser.setId(tokenId);
        applicationUserService.addNewApplicationUser(newUser);
        return new ResponseEntity<>(tokenId, HttpStatus.OK);
    }

    @GetMapping("")
    public String getPrijava(){
        return "prijava-get";
    }
}
