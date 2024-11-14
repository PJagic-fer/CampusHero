package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import jakarta.servlet.http.HttpSession;
import progi.data.ApplicationUser;
import progi.services.ApplicationUserService;
import progi.utils.AuthContextUtil;
import progi.utils.GoogleAuthentificator;

@RestController
@RequestMapping("/campus-hero/prijava")
public class PrijavaController {

   private ApplicationUserService applicationUserService;

   @Autowired
   public PrijavaController(ApplicationUserService applicationUserService) {
      this.applicationUserService = applicationUserService;
   }

   @PostMapping("")
   public ResponseEntity<?> postPrijava(@RequestBody String tokenId, HttpSession session) {
      System.out.printf("TokenId: %s", tokenId);
      // slanje tokena na autentifikaciju
      if (tokenId.startsWith("\"") && tokenId.endsWith("\"")) {
         tokenId = tokenId.substring(1, tokenId.length() - 1);
      }
      GoogleIdToken.Payload payload = GoogleAuthentificator.autentificate(tokenId);

      System.out.printf("Payload: %s", payload);

      if (payload == null) {
         // neuspjela autentifikacija
         System.out.printf("Auth fail!");
         return new ResponseEntity<>("Neuspješna autentifikacija", HttpStatus.UNAUTHORIZED); // 401
      }

      // dohvaćanje podataka o koriniku
      String userId = payload.getSubject();
      String userName = payload.get("name").toString();
      String userSurname = payload.get("family_name").toString();
      String userEmail = payload.getEmail();
      System.out.printf("UserId: %s\tName: %s\tSurname: %s\tEmail: %s", userId, userName, userSurname, userEmail);

      // stvaranje korisnika pomoću dohvaćenih podataka
      ApplicationUser tempUser = new ApplicationUser(userId, userName, userSurname,
            userEmail);
      // dohvaćanje korisnika iz baze, odnosno stvaranje novog ako dosad nije bio
      // zabilježen
      System.out.printf("Made new user?: %s", tempUser != null);

      Pair<ApplicationUser, Boolean> userPair = applicationUserService.getOrCreateApplicationUser(tempUser);
      ApplicationUser user = userPair.getFirst();
      Boolean newUserCreated = userPair.getSecond();
      AuthContextUtil.setContextUserId(session, user.getId());
      System.out.printf("Finished creating new user?: %s", newUserCreated);

      if (newUserCreated) {
         return new ResponseEntity<>(user, HttpStatus.CONFLICT); // 409
      }
      return new ResponseEntity<>(user, HttpStatus.OK);

   }

}
