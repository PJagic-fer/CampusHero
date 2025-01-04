package progi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.Forum;
import progi.data.Post;
import progi.repositories.ForumRepository;
import progi.repositories.PostRepository;

@Service
public class PostService {
   private PostRepository postRepository;
   private ForumRepository forumRepository;

   @Autowired
   public PostService(PostRepository postRepository, ForumRepository forumRepository) {
      this.postRepository = postRepository;
      this.forumRepository = forumRepository;
   }

   public Post addPost(Post post) {
      if (post.getParentPost() != null) {
         Post parentPost = post.getParentPost();
         parentPost.getChildrenPosts().add(post);
      }
      return postRepository.save(post);
   }

   public Post getPostById(Long postId) {
      return postRepository.getReferenceById(postId);
   }

   public List<Post> getParentPosts(Forum forum) {
      return postRepository.findByForumAndParentPostIsNull(forum);
   }

   public List<Post> getChildrenPosts(Long parentPostId) {
      Post parentPost = postRepository.getReferenceById(parentPostId);
      return postRepository.findByParentPost(parentPost);
   }

}
