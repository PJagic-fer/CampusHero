package progi.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import progi.services.ApplicationUserService;
import progi.services.BuddyRequestService;
import progi.services.ReviewService;
import progi.data.BuddyRequest;
import progi.data.Review;
import progi.data.ApplicationUser;
import progi.utils.AuthContextUtil;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/campus-hero/buddy-sustav")
public class BuddySistemController {

    private ApplicationUserService applicationUserService;
    private BuddyRequestService buddyRequestService;
    private ReviewService reviewService;

    // setup userdata
    @Autowired
    public BuddySistemController(ApplicationUserService applicationUserService, BuddyRequestService buddyRequestService, ReviewService reviewService) {
        this.applicationUserService = applicationUserService;
        this.buddyRequestService = buddyRequestService;
        this.reviewService = reviewService;
    }

    // Buddy main page, generic info o programu
    @GetMapping("")
    public String getBuddySistem(){
        return ("Dobrodošli na CampusHero buddy sustav");
    }

    // Info o specificnom buddyju - tipa raiting, kolko jos ima slobodnih mjesta, koja je godina/dom/kaj vec ne
    // Vjv bi bilo pozeljno sakriti ime da se nezna bas tocno ko je
    @GetMapping("/buddy/{buddyID}")
    public ApplicationUser getBuddySistemBuddy(@PathVariable Long buddyID){
        ApplicationUser buddy = applicationUserService.getUserById(buddyID).orElse(null);
        if (buddy == null)
        {
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
    public String postBuddySistemBuddyPrijava(HttpSession session){
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        contextUser.setIsBuddy(true);

        return ("Postao buddy!");
    }

    // Stranica sa svim zahtjevima za pojedinog buddyja
    @GetMapping("/buddy/zahtjevi")
    public List<BuddyRequest> getBuddySistemBuddyZahtjevi(HttpSession session){
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        return buddyRequestService.getAllRequestsForId(contextUser.getId());
    }

    // Detaljniji podatci za pojedinog studenta koji zeli korisnika kao buddyja
    @GetMapping("/buddy/zahtjevi/{studentID}")
    public List<Review> getBuddySistemBuddyZahtjeviStudent(@PathVariable Long studentID){
        ApplicationUser buddy = applicationUserService.getUserById(studentID).orElse(null);
        if (buddy != null)
        {
            return reviewService.getReviewsOnBuddy(buddy);
        }
        else
        { 
            return null;
        }
    }

    // Salje ocjenu za trenutnog buddyja
    @PostMapping("/student/ocijeni")
    public String postBuddySistemStudentOcijeni(@RequestHeader("ocjena") Review ocjena){
        reviewService.addReview(ocjena);
        return ("Ocjenili ste svoga buddyja");
    }

    @GetMapping("/student/trazi-buddyja")
    public List<ApplicationUser> getBuddySistemStudentTraziBuddyja(){
        // Vraca sve buddyje
        List<ApplicationUser> users = applicationUserService.getAllApplicationUsers();
        List<ApplicationUser> buddies = new ArrayList<>();        
        for (ApplicationUser user : users)
        {
            if(user.getIsBuddy() == true)
            {
                buddies.add(user);
            }
        }

        for (ApplicationUser buddy : buddies)
        {
            buddy.setJmbag("0"); // Ubij sve privatno
            buddy.setIsAdmin(false);
            buddy.setSurname("Prezimenovic");
            buddy.setGoogleId("0");
        }

        return buddies;
    }

}
