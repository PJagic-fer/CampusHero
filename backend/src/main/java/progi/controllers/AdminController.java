package progi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import progi.data.AdminRequest;
import progi.data.ApplicationUser;
import progi.services.AdminService;
import progi.services.ApplicationUserService;
import progi.services.PostService;
import progi.services.ReviewService;
import progi.utils.AdminApplication;
import progi.utils.ApplicationUserData;
import progi.utils.AuthContextUtil;
import progi.utils.LongClass;

@RestController
@RequestMapping("/campus-hero/admin")
public class AdminController {

    private ApplicationUserService applicationUserService;
    private ReviewService reviewService;
    private PostService postService;
    private AdminService adminService;

    @Autowired
    public AdminController(ApplicationUserService applicationUserService, ReviewService reviewService,
            PostService postService, AdminService adminService) {
        this.applicationUserService = applicationUserService;
        this.reviewService = reviewService;
        this.postService = postService;
        this.adminService = adminService;
    }

    // dohavćanje svih korisničkih podataka
    @GetMapping("/korisnici")
    public ResponseEntity<?> getUsers(HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        if (contextUser.getIsAdmin()) {
            List<ApplicationUserData> users = applicationUserService.getAllApplicationUsersData();
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // trenutni korisnik podnosi prijavu za admina
    @PostMapping("/prijava")
    public ResponseEntity<?> postApplication(@RequestBody AdminApplication application, HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        // korisnik ne može podnijeti prijavu ako već je admin
        if (contextUser.getIsAdmin()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        AdminRequest adminRequest = new AdminRequest(contextUser, application);
        Boolean gotAdmin = adminService.addAdminRequest(adminRequest);

        // ako je korisnik postao administrator, odgovor je 202
        if (gotAdmin) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED); // 202
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // trenutni korisnik prestaje biti admin
    @PostMapping("/odjava")
    public ResponseEntity<?> postOdjava(HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        if (contextUser.getIsAdmin()) {
            contextUser = adminService.depriveAdminPrivileges(contextUser);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // administrator dohvaća sve prijavljene korisnike
    @GetMapping("/admin-kandidati")
    public ResponseEntity<?> getAdminApplicants(HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        if (contextUser.getIsAdmin()) {
            List<AdminRequest> adminRequests = adminService.getSecureAdminRequests();
            return new ResponseEntity<>(adminRequests, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // administrator odobrava tuđu admin prijavu
    @PostMapping("admin-kandidati/odobri")
    public ResponseEntity<?> postAdminPrivileges(@RequestBody AdminRequest adminRequest, HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        if (contextUser.getIsAdmin()) {
            ApplicationUser approvedUser = applicationUserService
                    .getApplicationUser(adminRequest
                            .getApplicant()
                            .getId());
            adminService.giveAdminPrivileges(adminRequest.getId(), approvedUser);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // administrator odobrava tuđu admin prijavu
    @PostMapping("admin-kandidati/odbij")
    public ResponseEntity<?> postAdminDeny(@RequestBody AdminRequest adminRequest, HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        if (contextUser.getIsAdmin()) {
            adminService.deleteAdminRequest(adminRequest.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // administrator briše recenziju
    @PostMapping("/review")
    public ResponseEntity<?> deleteReview(@RequestBody LongClass reviewId, HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        if (contextUser.getIsAdmin()) {
            reviewService.deleteReview(reviewId.getValue());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // administrator briše recenziju
    @PostMapping("/post")
    public ResponseEntity<?> deletePost(@RequestBody LongClass postId, HttpSession session) {
        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        if (contextUser.getIsAdmin()) {
            postService.deletePost(postId.getValue());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // administrator odobrava tuđu buddy prijavu
    @PostMapping("/buddy")
    public ResponseEntity<?> addNewBuddy(@RequestBody Long buddyId, HttpSession session) {
        ApplicationUser applicationUser = new ApplicationUser();
        applicationUser = applicationUserService.getApplicationUser(buddyId);

        String contextUserId = AuthContextUtil.getContextUserId(session);
        ApplicationUser contextUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);

        if (contextUser.getIsAdmin()) {
            applicationUser.setIsBuddy(true);
            applicationUserService.setIsBuddy(applicationUser);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
