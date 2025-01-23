package progi.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import progi.data.ApplicationUser;
import progi.data.BuddyRequest;
import progi.data.Review;
import progi.services.ApplicationUserService;
import progi.services.BuddyRequestService;
import progi.services.ReviewService;
import progi.utils.AuthContextUtil;
import progi.utils.LongClass;

@RestController
@RequestMapping("/campus-hero/buddy-sustav")
public class BuddySistemController {

    private ApplicationUserService applicationUserService;
    private BuddyRequestService buddyRequestService;
    private ReviewService reviewService;

    // setup userdata
    @Autowired
    public BuddySistemController(ApplicationUserService applicationUserService, BuddyRequestService buddyRequestService,
            ReviewService reviewService) {
        this.applicationUserService = applicationUserService;
        this.buddyRequestService = buddyRequestService;
        this.reviewService = reviewService;
    }

    // Buddy main page, generic info o programu
    @GetMapping("")
    public String getBuddySistem() {
        return ("Dobrodošli na CampusHero buddy sustav");
    }

    // Info o specificnom buddyju - tipa raiting, kolko jos ima slobodnih mjesta,
    // koja je godina/dom/kaj vec ne
    // Vjv bi bilo pozeljno sakriti ime da se nezna bas tocno ko je
    @GetMapping("/buddy/{buddyID}")
    public ApplicationUser getBuddySistemBuddy(@PathVariable Long buddyID) {
        ApplicationUser buddy = applicationUserService.getUserById(buddyID).orElse(null);
        if (buddy == null) {
            return null;
        }
        buddy.setJmbag("0"); // Ubij sve privatno
        buddy.setIsAdmin(false);
        buddy.setSurname("Prezimenovic");
        buddy.setGoogleId("0");
        return buddy;
    }

    // Stranica za prijavu na buddy sustav (zelim biti buddy)
    @PostMapping("/buddy/prijava")
    public String postBuddySistemBuddyPrijava(HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        contextUser.setIsBuddy(true);
        applicationUserService.updateApplicationUser(contextUser);
        return ("Postao buddy!");
    }

    // Makni se iz registra buddyja
    @DeleteMapping("/buddy/prijava")
    public String deleteBuddySistemBuddyPrijava(HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        contextUser.setIsBuddy(false);
        applicationUserService.updateApplicationUser(contextUser);
        return ("Vise nisi buddy!");
    }

    // Stranica sa svim zahtjevima za pojedinog buddyja
    @GetMapping("/buddy/zahtjevi")
    public List<BuddyRequest> getBuddySistemBuddyZahtjevi(HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        return buddyRequestService.getAllRequestsForId(contextUser.getId())
                .stream()
                .map((request) -> {
                    request.getBuddy().setGoogleId(null);
                    request.getUser().setGoogleId(null);
                    return request;
                }).toList();
    }

    // Detaljniji podatci za pojedinog studenta koji zeli korisnika kao buddyja
    @GetMapping("/buddy/zahtjevi/{studentID}")
    public List<Review> getBuddySistemBuddyZahtjeviStudent(@PathVariable Long studentID) {
        ApplicationUser buddy = applicationUserService.getUserById(studentID).orElse(null);
        if (buddy != null) {
            return reviewService.getReviewsOnBuddy(buddy);
        } else {
            return null;
        }
    }

    @GetMapping("/student/trazi-buddyja")
    public List<ApplicationUser> getBuddySistemStudentTraziBuddyja() {
        // Vraca sve buddyje
        List<ApplicationUser> users = applicationUserService.getAllApplicationUsers();
        List<ApplicationUser> buddies = new ArrayList<>();
        for (ApplicationUser user : users) {
            if (user.getIsBuddy() == true) {
                buddies.add(user);
            }
        }

        for (ApplicationUser buddy : buddies) {
            buddy.setJmbag("0"); // Ubij sve privatno
            buddy.setIsAdmin(false);
            buddy.setSurname("Prezimenovic");
            buddy.setGoogleId("0");
        }

        return buddies;
    }

    @PostMapping("/student/trazi-buddyja")
    public boolean postBuddySistemStudentTraziBuddyja(@RequestBody LongClass buddyID, HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        ApplicationUser buddy = applicationUserService.getUserById(buddyID.getValue()).orElse(null);

        if (buddy == null) {
            return false;
        }

        BuddyRequest buddyRequest = new BuddyRequest(contextUser, buddy);

        buddyRequestService.addNewBuddyRequest(buddyRequest);

        return true;
    }

    @GetMapping("/student/trazeni-buddy")
    public ResponseEntity<?> getRequestedBuddy(HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        ApplicationUser buddy = buddyRequestService.getRequestedBuddyByUser(contextUser);

        if (buddy != null) {
            buddy.setJmbag("0"); // Ubij sve privatno
            buddy.setIsAdmin(false);
            buddy.setSurname("Prezimenovic");
            buddy.setGoogleId("0");
        }

        return new ResponseEntity<>(buddy, HttpStatus.OK);
    }

    @PostMapping("/buddy/prihvati/{userId}")
    public Boolean postPrihvatiBuddyja(@PathVariable Long userId, HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        return buddyRequestService.editBuddyStatus(userId, contextUser.getId(), true, applicationUserService);
    }

    @DeleteMapping("/buddy/prihvati/{userId}")
    public Boolean deletePrihvatiBuddyja(@PathVariable Long userId, HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        return buddyRequestService.editBuddyStatus(userId, contextUser.getId(), false, applicationUserService);
    }
}
