package progi.data;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
public class Busyness {
    @Id
    @SequenceGenerator(
            name = "busy_sequence",
            sequenceName = "busy_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "busy_sequence"
    )
    private Long id;

    @ManyToOne
    private Canteen canteen;

    private Integer score;

    @Column(nullable = false, updatable = false)
    private LocalDateTime time;

    public Busyness() {}

    public Busyness(Canteen canteen, Integer score) {
        this.canteen = canteen;
        this.score = score;
        this.time = LocalDateTime.now();
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
}
