package progi.data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Busyness {
    @Id
    @SequenceGenerator(name = "busy_sequence", sequenceName = "busy_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "busy_sequence")
    private Long id;

    @ManyToOne
    private Canteen canteen;

    private Integer score;

    @CreationTimestamp
    private LocalDateTime time;

    private String message;

    public Busyness() {
    }

    public Busyness(Canteen canteen, Integer score) {
        this.canteen = canteen;
        this.score = score;
    }

    public Busyness(Canteen canteen, Integer score, String message) {
        this.canteen = canteen;
        this.score = score;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public Canteen getCanteen() {
        return canteen;
    }

    public int getScore() {
        return score;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setCanteen(Canteen canteen) {
        this.canteen = canteen;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
