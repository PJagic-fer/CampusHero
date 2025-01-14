package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi.data.Faculty;
import progi.data.Forum;
import progi.data.StudentHome;

@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {
   Forum findByFaculty(Faculty faculty);

   Forum findByStudentHome(StudentHome studentHome);

}
