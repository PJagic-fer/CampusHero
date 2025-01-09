package progi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi.data.ApplicationUser;
import progi.data.Canteen;
import progi.data.Faculty;
import progi.data.Review;
import progi.data.StudentHome;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    public List<Review> findByFaculty(Faculty faculty);
    public List<Review> findByCanteen(Canteen canteen);
    public List<Review> findByStudentHome(StudentHome studentHome);
    public List<Review> findByBuddy(ApplicationUser buddy);
}
