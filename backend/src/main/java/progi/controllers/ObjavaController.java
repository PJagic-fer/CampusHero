package progi.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import progi.data.ApplicationUser;
import progi.data.Forum;
import progi.data.Post;
import progi.services.ApplicationUserService;
import progi.services.ForumService;
import progi.services.PostService;
import progi.utils.AuthContextUtil;
import progi.utils.FacilityData;
import progi.utils.FacilityDataWithPost;

@RestController
@RequestMapping("/campus-hero/forum")
public class ObjavaController {
   private PostService postService;
   private ForumService forumService;
   private ApplicationUserService applicationUserService;

   @Autowired
   public ObjavaController(PostService postService, ForumService forumService,
         ApplicationUserService applicationUserService) {
      this.postService = postService;
      this.forumService = forumService;
      this.applicationUserService = applicationUserService;
   }

   // dohvaćanje pitanja za određenu instituciju
   @GetMapping("")
   public List<Post> getQuestions(@RequestParam String facultyId, @RequestParam String studentHomeId) {
      FacilityData facilityData = new FacilityData();
      if (!(facultyId.equals("null"))) {
         facilityData.setFacultyId(Long.parseLong(facultyId));
         facilityData.setStudentHomeId(null);
      } else if (!(studentHomeId.equals("null"))) {
         facilityData.setStudentHomeId(Long.parseLong(studentHomeId));
         facilityData.setFacultyId(null);
      } else {
         System.out.println("neispravni parametri");
         return new ArrayList<Post>();
      }
      Forum forum = forumService.getForumByFacility(facilityData);
      if (forum != null) {
         System.out.println("neki tekst");
         System.out.println(forum.getId());
      } else {
         System.out.println("nema foruma");
      }
      return postService.getParentPosts(forum);
   }

   // dohvaćanje odgovora za pitanje
   @GetMapping("/{parentId}")
   public List<Post> getAnswers(@PathVariable String parentId) {
      return postService.getChildrenPosts(Long.parseLong(parentId));
   }

   // pitanje na forumu
   @PostMapping("")
   public ResponseEntity<?> postQuestion(@RequestBody FacilityDataWithPost facilityDataWithPost, HttpSession session) {
      FacilityData facilityData = facilityDataWithPost.getFacilityData();
      Post post = facilityDataWithPost.getPost();
      Forum forum = forumService.getForumByFacility(facilityData);

      // dodavanje autora objave
      String contextUserId = AuthContextUtil.getContextUserId(session);
      ApplicationUser applicationUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);
      post.setCreator(applicationUser);

      if (post.getForum() == null) {
         post.setForum(forum);
      }
      if (forum != null) {
         postService.addPost(post);
         return new ResponseEntity<>(HttpStatus.OK);
      }
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
   }

   // odgovor na pitanje (pitanjeid) na forumu sa forumid
   @PostMapping("/odgovor")
   public ResponseEntity<?> postAnswer(@RequestBody Post post, HttpSession session) {
      // dodavanje autora objave
      String contextUserId = AuthContextUtil.getContextUserId(session);
      ApplicationUser applicationUser = applicationUserService.getApplicationUserByGoogleId(contextUserId);
      post.setCreator(applicationUser);

      Post parentPost = postService.getPostById(post.getParentPost().getId());
      post.setParentPost(parentPost);

      Forum forum = parentPost.getForum();
      post.setForum(forum);

      postService.addPost(post);
      return new ResponseEntity<>(HttpStatus.OK);
   }
}
