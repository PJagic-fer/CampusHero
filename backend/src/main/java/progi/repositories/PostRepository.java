package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.data.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {}
