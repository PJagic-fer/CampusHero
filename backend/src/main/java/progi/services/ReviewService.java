package progi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.Canteen;
import progi.data.Faculty;
import progi.data.Review;
import progi.data.StudentHome;
import progi.repositories.ReviewRepository;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    public Review addReview(Review review){
        return reviewRepository.save(review);
    }

    public Review getReviewById(Long reviewId){
        return reviewRepository.getReferenceById(reviewId);
    }

    public List<Review> getFacultyReviews(Faculty faculty){
        return reviewRepository.findByFaculty(faculty);
    }
    public List<Review> getCanteenReviews(Canteen canteen){
        return reviewRepository.findByCanteen(canteen);
    }
    public List<Review> getStudentHomeReviews(StudentHome studentHome){
        return reviewRepository.findByStudentHome(studentHome);
    } 
}
