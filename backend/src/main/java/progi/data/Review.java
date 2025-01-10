package progi.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Review {

    @Id
    @SequenceGenerator(name = "review_sequence", sequenceName = "review_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_sequence")
    private Long id;

    @ManyToOne
    private Canteen canteen;

    @ManyToOne
    private Faculty faculty;

    @ManyToOne
    private StudentHome studentHome;

    @ManyToOne
    private ApplicationUser buddy;

    @Column(nullable = false)
    private Integer score;

    private String message;

    @ManyToOne
    private ApplicationUser creator;

    public Review() {
    }

    public Review(Canteen canteen, Integer score, String message, ApplicationUser creator) {
        this.canteen = canteen;
        this.score = score;
        this.message = message;
        this.creator = creator;
    }

    public Review(Canteen canteen, Integer score, ApplicationUser creator) {
        this.canteen = canteen;
        this.score = score;
        this.creator = creator;
    }

    public Review(Faculty faculty, Integer score, String message, ApplicationUser creator) {
        this.faculty = faculty;
        this.score = score;
        this.message = message;
        this.creator = creator;
    }

    public Review(Faculty faculty, Integer score, ApplicationUser creator) {
        this.faculty = faculty;
        this.score = score;
        this.creator = creator;
    }

    public Review(StudentHome studentHome, Integer score, String message, ApplicationUser creator) {
        this.studentHome = studentHome;
        this.score = score;
        this.message = message;
        this.creator = creator;
    }

    public Review(StudentHome studentHome, Integer score, ApplicationUser creator) {
        this.studentHome = studentHome;
        this.score = score;
        this.creator = creator;
    }

    public Review(ApplicationUser buddy, Integer score, String message, ApplicationUser creator) {
        this.buddy = buddy;
        this.score = score;
        this.message = message;
        this.creator = creator;
    }

    public Review(Integer score, ApplicationUser buddy, ApplicationUser creator) {
        this.score = score;
        this.buddy = buddy;
        this.creator = creator;
    }

    public Long getId() {
        return id;
    }

    public Integer getScore() {
        return score;
    }

    public String getMessage() {
        return message;
    }

    public ApplicationUser getCreator() {
        return creator;
    }

    public Canteen getcanteen() {
        return canteen;
    }

    public Faculty getfaculty() {
        return faculty;
    }

    public ApplicationUser getbuddy() {
        return buddy;
    }

    public void setCreator(ApplicationUser creator) {
        this.creator = creator;
    }
}
