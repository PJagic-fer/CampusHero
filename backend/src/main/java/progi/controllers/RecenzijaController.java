package progi.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import progi.data.ApplicationUser;
import progi.data.Canteen;
import progi.data.Faculty;
import progi.data.Review;
import progi.data.StudentHome;
import progi.services.ApplicationUserService;
import progi.services.CanteenService;
import progi.services.FacultyService;
import progi.services.ReviewService;
import progi.services.StudentHomeService;

@RestController
@RequestMapping("/campus-hero/recenzije")
public class RecenzijaController{
    private ReviewService reviewService;
    private FacultyService facultyService;
    private CanteenService canteenService;
    private StudentHomeService studentHomeService;
    private ApplicationUserService applicationUserService;

    @Autowired
    public RecenzijaController(ReviewService reviewService, FacultyService facultyService,
    CanteenService canteenService, StudentHomeService studentHomeService, ApplicationUserService applicationUserService) {
        this.reviewService = reviewService;
        this.facultyService = facultyService;
        this.canteenService = canteenService;
        this.studentHomeService = studentHomeService;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping("")
    public List<Review> getReviews(@RequestParam String facultyId, @RequestParam String studentHomeId,
    @RequestParam String canteenId, @RequestParam String userId) {
        if(!(facultyId.equals("null"))){
            Faculty faculty = new Faculty();
            faculty = facultyService.getFacultyById(Long.parseLong(facultyId));
            return reviewService.getFacultyReviews(faculty);  
        }else if (!(studentHomeId.equals("null"))) {
            StudentHome studentHome = new StudentHome();
            studentHome = studentHomeService.getStudentHomeById(Long.parseLong(studentHomeId));
            return reviewService.getStudentHomeReviews(studentHome);
        }else if (!(canteenId.equals("null"))) {
            Canteen canteen = new Canteen();
            canteen = canteenService.getCanteenById(Long.parseLong(canteenId));
            return reviewService.getCanteenReviews(canteen);
        }else if (!(userId.equals("null"))) {
            ApplicationUser applicationUser = new ApplicationUser();
            applicationUser = applicationUserService.getApplicationUser(userId);
            return reviewService.getReviewsOnBuddy(applicationUser);
        }else{
            System.out.println("SVI PARAMETRI SU NULL, NOT ALLOWED");
            return new ArrayList<Review>();
        }  
    }
    
    @PostMapping("")
    public ResponseEntity<?> postReviews(@RequestBody Review review) {
        reviewService.addReview(review);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}