package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import progi.data.ApplicationUser;
import progi.services.ApplicationUserService;
import progi.utils.ApplicationUserData;
import progi.utils.AuthContextUtil;
import progi.utils.CheckDataValidity;

@RestController
@RequestMapping("/campus-hero/profil")
public class ProfilController {

    private ApplicationUserService applicationUserService;

    @Autowired
    public ProfilController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @PostMapping("")
    public ResponseEntity<?> postProfil(@RequestBody ApplicationUserData applicationUserData, HttpSession session) {

        if (applicationUserData.getJmbag().length() != 10) {
            return new ResponseEntity<>(HttpStatus.PAYLOAD_TOO_LARGE); // 413
        }

        String contextUserId = AuthContextUtil.getContextUserId(session);

        if (!CheckDataValidity.checkTextINputLength(applicationUserData.getName(), 255)) {
            return new ResponseEntity<>(HttpStatus.PAYLOAD_TOO_LARGE); // 413
        }
        if (!CheckDataValidity.checkTextINputLength(applicationUserData.getSurname(), 255)) {
            return new ResponseEntity<>(HttpStatus.PAYLOAD_TOO_LARGE); // 413
        }
        if (!CheckDataValidity.checkTextINputLength(applicationUserData.getEmail(), 255)) {
            return new ResponseEntity<>(HttpStatus.PAYLOAD_TOO_LARGE); // 413
        }

        ApplicationUser foundUser = applicationUserService.getApplicationUserByJmbag(applicationUserData.getJmbag());
        if (foundUser != null) {
            if (contextUserId != foundUser.getGoogleId()) {
                return new ResponseEntity<>(HttpStatus.CONFLICT); // 409
            }
        }

        applicationUserService.updateApplicationUserData(contextUserId, applicationUserData);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/odjava")
    public ResponseEntity<?> getPrijavaOdjava(HttpSession session) {
        AuthContextUtil.removeContextUserId(session);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
