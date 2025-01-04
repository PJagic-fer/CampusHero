package progi.controllers;

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

   @GetMapping("/{forumId}/{parentId}")
   public List<Post> getAnswers(@PathVariable String forumId, @PathVariable String parentId) {
      return postService.getChildrenPosts(Long.parseLong(forumId), Long.parseLong(parentId));
   }

   @GetMapping("")
   public List<Post> postForum(@RequestParam String facultyId, @RequestParam String studentHomeId) {
      FacilityData facilityData = new FacilityData();
      if (!(facultyId.equals("null"))) {
         facilityData.setFacultyId(Long.parseLong(facultyId));
         facilityData.setStudentHomeId(null);
      }
      if (!(studentHomeId.equals("null"))) {
         facilityData.setStudentHomeId(Long.parseLong(studentHomeId));
         facilityData.setFacultyId(null);
      }
      Forum forum = forumService.getForumByFacility(facilityData);
      if (forum != null) {
         System.out.println("neki tekst");
         System.out.println(forum.getId());
      } else {
         System.out.println("nema foruma");
      }
      // List<Post> parentPosts = postService.getParentPosts(forum);
      return postService.getParentPosts(forum);
   }

   // pitanje na forumu
   @PostMapping("pitanje")
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
