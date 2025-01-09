package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi.data.ApplicationUser;
import progi.services.ApplicationUserService;
import progi.services.ReviewService;

@RestController
@RequestMapping("/campus-hero/admin")
public class AdminController {

    private ApplicationUserService applicationUserService;
    private ReviewService reviewService;

    @Autowired
    public AdminController(ApplicationUserService applicationUserService, ReviewService reviewService) {
        this.applicationUserService = applicationUserService;
        this.reviewService = reviewService;
    }

    @GetMapping("")
    public String getAdmin() {
        return applicationUserService.getAllApplicationUsers().toString();
    }

    @PostMapping("/review")
    public ResponseEntity<?> deleteReviews(@RequestBody Long reviewId) {
        reviewService.deleteReview(reviewId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/buddy")
    public ResponseEntity<?> addNewBuddy(@RequestBody String buddyId) {
        ApplicationUser applicationUser = new ApplicationUser();
        applicationUser = applicationUserService.getApplicationUser(buddyId);
        applicationUser.setBuddy(true);
        applicationUserService.setBuddy(applicationUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    

}
