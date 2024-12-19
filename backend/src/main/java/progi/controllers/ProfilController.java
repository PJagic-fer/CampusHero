package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import progi.services.ApplicationUserService;
import progi.utils.ApplicationUserData;
import progi.utils.AuthContextUtil;

@RestController
@RequestMapping("/campus-hero/profil")
public class ProfilController {

   private ApplicationUserService applicationUserService;

   @Autowired
   public ProfilController(ApplicationUserService applicationUserService) {
      this.applicationUserService = applicationUserService;
   }

   @PostMapping("")
   public ResponseEntity<?> postProfil(@RequestBody ApplicationUserData ApplicationUserData, HttpSession session,
         HttpServletRequest request) {

      String contextUserId = AuthContextUtil.getContextUserId(session);
      applicationUserService.updateApplicationUser(contextUserId, ApplicationUserData);

      return new ResponseEntity<>(HttpStatus.OK);
   }

   @PostMapping("/odjava")
   public ResponseEntity<?> getPrijavaOdjava(HttpSession session) {
      AuthContextUtil.removeContextUserId(session);
      return new ResponseEntity<>(HttpStatus.OK);
   }
}
