package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import jakarta.servlet.http.HttpSession;
import progi.data.ApplicationUser;
import progi.services.ApplicationUserService;
import progi.utils.ApplicationUserData;
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
      // slanje tokena na autentifikaciju
      if (tokenId.startsWith("\"") && tokenId.endsWith("\"")) {
         tokenId = tokenId.substring(1, tokenId.length() - 1);
      }
      GoogleIdToken.Payload payload = GoogleAuthentificator.autentificate(tokenId);

      if (payload == null) {
         // neuspjela autentifikacija
         return new ResponseEntity<>("Neuspješna autentifikacija", HttpStatus.UNAUTHORIZED); // 401
      }

      // dohvaćanje podataka o koriniku
      String userId = payload.getSubject();
      String userName = payload.get("given_name").toString();
      String userSurname = payload.get("family_name").toString();
      String userEmail = payload.getEmail();

      // stvaranje korisnika pomoću dohvaćenih podataka
      ApplicationUser tempUser = new ApplicationUser(userId, userName, userSurname, userEmail);

      // dohvaćanje korisnika iz baze ili stvaranje novog
      // ako dosad nije bio zabilježen
      Pair<ApplicationUser, Boolean> userPair = applicationUserService.getOrCreateApplicationUser(tempUser);
      ApplicationUser user = userPair.getFirst();
      ApplicationUserData userData = ApplicationUserData.parseApplicationUserData(user);
      Boolean newUserCreated = userPair.getSecond();
      AuthContextUtil.setContextUserId(session, user.getId());

      if (newUserCreated) {
         return new ResponseEntity<>(userData, HttpStatus.CONFLICT); // 409
      }
      return new ResponseEntity<>(userData, HttpStatus.OK);
   }

   @GetMapping("")
   public ResponseEntity<?> getPrijava(HttpSession session) {
      // čitanje id-ja trenutnog korisnika iz sessiona
      String contextUserId = AuthContextUtil.getContextUserId(session);
      // ako korisnik nije prijavljen, id je null
      if (contextUserId == null) {
         return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
      }
      ApplicationUser user = applicationUserService.getApplicationUser(contextUserId);
      ApplicationUserData userData = ApplicationUserData.parseApplicationUserData(user);
      // povratna vrijednost su korisnikovi atributi
      return new ResponseEntity<>(userData, HttpStatus.OK);
   }
}
