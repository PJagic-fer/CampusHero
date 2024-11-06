package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.data.Busyness;

@Repository
public interface BusynessRepository extends JpaRepository<Busyness, Long> {}
