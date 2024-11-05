package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.data.Faculty;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {}
