package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import progi.data.ApplicationUser;
import progi.services.ApplicationUserService;
import progi.utils.AuthContextUtil;
import progi.utils.GoogleAuthentificator;
import java.util.Optional;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.data.util.Pair;

@RestController
@RequestMapping("/campus-hero/prijava")
public class PrijavaController {

    private ApplicationUserService applicationUserService;

    @Autowired
    public PrijavaController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @PostMapping("")
    public ResponseEntity<?> postPrijava(@RequestBody String tokenId) {
        // slanje tokena na autentifikaciju
        Optional<GoogleIdToken.Payload> payload = GoogleAuthentificator.autentificate(tokenId);

        if (payload.isEmpty()) {
            // neuspjela autentifikacija
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED); // 401
        }

        // dohvaćanje podataka o koriniku
        String userId = payload.get().getSubject();
        String userName = payload.get().get("name").toString();
        String userSurname = payload.get().get("family_name").toString();
        String userEmail = payload.get().getEmail();

        // stvaranje korisnika pomoću dohvaćenih podataka
        ApplicationUser tempUser = new ApplicationUser(userId, userName, userSurname, userEmail);
        // dohvaćanje korisnika iz baze, odnosno stvaranje novog ako dosad nije bio
        // zabilježen

        Pair<ApplicationUser, Boolean> userPair = applicationUserService.getOrCreateApplicationUser(tempUser);
        ApplicationUser user = userPair.getFirst();
        Boolean newUserCreated = userPair.getSecond();
        AuthContextUtil.setContext(user);

        if (newUserCreated) {
            return new ResponseEntity<>(user, HttpStatus.CONFLICT); // 409
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
