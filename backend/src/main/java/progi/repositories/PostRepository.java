package progi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi.data.Forum;
import progi.data.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
   public List<Post> findByForumAndParentPostIsNull(Forum forum);

   public List<Post> findByForumAndParentPost(Forum forum, Post parentPost);
}
