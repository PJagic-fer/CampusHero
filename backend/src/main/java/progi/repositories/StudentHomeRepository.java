package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progi.data.StudentHome;

@Repository
public interface StudentHomeRepository extends JpaRepository<StudentHome, Long> {}
