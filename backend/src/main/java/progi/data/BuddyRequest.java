package progi.data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
public class BuddyRequest {

    @Id
    @SequenceGenerator(name = "buddy_request_sequence", sequenceName = "buddy_request_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "buddy_request_sequence")
    private Long id;

    private boolean hasBuddyAccepted;

    private boolean isBlocked;

    @ManyToOne
    private ApplicationUser user;

    @ManyToOne
    private ApplicationUser buddy;

    @CreationTimestamp
    private LocalDateTime DateCreated;

    public BuddyRequest() {
    }

    public BuddyRequest(ApplicationUser user, ApplicationUser buddy) {
        this.hasBuddyAccepted = false;
        this.user = user;
        this.buddy = buddy;
        isBlocked = false;
    }

    public boolean getHasBuddyAccepted() {
        return hasBuddyAccepted;
    }

    public void setHasBuddyAccepted(boolean hasBuddyAccepted) {
        this.hasBuddyAccepted = hasBuddyAccepted;
    }

    public ApplicationUser getUser() {
        return user;
    }

    public void setUser(ApplicationUser user) {
        this.user = user;
    }

    public ApplicationUser getBuddy() {
        return buddy;
    }

    public void setBuddy(ApplicationUser buddy) {
        this.buddy = buddy;
    }

    public LocalDateTime getDateCreated() {
        return DateCreated;
    }

    public void setIsBlocked(Boolean isBlocked) {
        this.isBlocked = isBlocked;
    }

    public boolean getIsBlocked() {
        return isBlocked;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        DateCreated = dateCreated;
    }

}
