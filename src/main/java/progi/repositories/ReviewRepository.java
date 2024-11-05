package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.data.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {}
