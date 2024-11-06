package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.data.City;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {}
