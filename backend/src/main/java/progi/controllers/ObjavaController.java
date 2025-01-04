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

import progi.data.Forum;
import progi.data.Post;
import progi.services.ForumService;
import progi.services.PostService;
import progi.utils.FacilityData;
import progi.utils.FacilityDataWithPost;

@RestController
@RequestMapping("/campus-hero/forum")
public class ObjavaController {
   private PostService postService;
   private ForumService forumService;

   @Autowired
   public ObjavaController(PostService postService, ForumService forumService) {
      this.postService = postService;
      this.forumService = forumService;
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
   public ResponseEntity<?> postQuestion(@RequestBody FacilityDataWithPost facilityDataWithPost) {
      FacilityData facilityData = facilityDataWithPost.getFacilityData();
      Post post = facilityDataWithPost.getPost();
      Forum forum = forumService.getForumByFacility(facilityData);
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
   public ResponseEntity<?> postAnswer(@RequestBody Post post) {
      postService.addPost(post);
      return new ResponseEntity<>(HttpStatus.OK);
   }
}
