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

   @GetMapping("")
   public List<Post> getForum(@RequestBody FacilityData facilityData) {
      Forum forum = forumService.getForumByFacility(facilityData);
      return postService.getParentPosts(forum);
   }

   @GetMapping("/{forumId}/{parentId}")
   public List<Post> getAnswers(@PathVariable String forumId, @PathVariable String parentId) {
      return postService.getChildrenPosts(Long.parseLong(forumId), Long.parseLong(parentId));
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
         //zapravo dodaj post u repository
         return new ResponseEntity<>(HttpStatus.OK);
      }
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
   }

   // odgovor na pitanje (pitanjeid) na forumu sa forumid
   @PostMapping("/{forumId}/{parentId}")
   public ResponseEntity<?> postAnswer(@PathVariable String forumId, @PathVariable String parentId,
         @RequestBody Post post) {
      //fali kod
      return new ResponseEntity<>(HttpStatus.OK);
   }
}
