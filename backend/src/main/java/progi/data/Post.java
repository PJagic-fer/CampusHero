package progi.data;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Entity
public class Post {
    @Id
    @SequenceGenerator(
            name = "post_sequence",
            sequenceName = "post_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "post_sequence"
    )
    private Long id;

    @ManyToOne
    private Forum forum;

    @OneToOne
    private ApplicationUser creator;

    @CreationTimestamp
    private LocalDateTime time;

    @OneToOne
    private Post answerTo;

    private String message;

    public Post() {}

    public Post(Forum forum, ApplicationUser creator, String message) {
        this.forum = forum;
        this.creator = creator;
        this.message = message;
    }

    public Post(Forum forum, ApplicationUser creator, Post answerTo, String message) {
        this.forum = forum;
        this.creator = creator;
        this.answerTo = answerTo;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public Forum getForum() {
        return forum;
    }

    public ApplicationUser getCreator() {
        return creator;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public Post getAnswerTo() {
        return answerTo;
    }

    public String getMessage() {
        return message;
    }
}
