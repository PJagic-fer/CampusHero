package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.data.Canteen;

@Repository
public interface CanteenRepository extends JpaRepository<Canteen, Long> {}
