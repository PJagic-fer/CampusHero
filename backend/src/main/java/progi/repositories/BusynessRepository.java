package progi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi.data.Busyness;
import progi.data.Canteen;

@Repository
public interface BusynessRepository extends JpaRepository<Busyness, Long> {
    public List<Busyness> findByCanteen(Canteen canteen);
}
