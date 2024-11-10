package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.data.ApplicationUser;
import progi.services.ApplicationUserService;
import progi.utils.GoogleAuthentificator;

import java.util.Optional;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

@RestController
@RequestMapping("/campus-hero/prijava")
public class PrijavaController {

    public static class RegistrationData {
        private String tokenId;
        private ApplicationUser user;

        public RegistrationData() {
        }

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
    public ResponseEntity<?> postPrijava(@RequestBody String tokenId) {
        System.out.println(tokenId);
        Optional<GoogleIdToken.Payload> payload = GoogleAuthentificator.autentificate(tokenId);

        if (payload.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED); // 401
        }

        String userId = payload.get().getSubject();
        String userName = payload.get().get("name").toString();
        String userSurname = payload.get().get("family_name").toString();
        String userEmail = payload.get().getEmail();

        ApplicationUser tempUser = new ApplicationUser(userId, userName, userSurname, userEmail);

        ApplicationUser user = applicationUserService.getOrCreateApplicationUser(tempUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
