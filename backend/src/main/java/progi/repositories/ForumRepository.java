package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.data.Forum;

@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {}
