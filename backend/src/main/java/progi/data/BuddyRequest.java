package progi.data;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table
public class BuddyRequest {

    @Id
    private String id;

    private boolean hasBuddyAccepted;

    @OneToOne
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
    }

    public boolean GetHasBuddyAccepted()
    {
        return hasBuddyAccepted;
    }

    public void SetHasBuddyAccepted(boolean hasBuddyAccepted)
    {
        this.hasBuddyAccepted = hasBuddyAccepted;
    }

    public ApplicationUser GetUser()
    {
        return user;
    }

    public void SetUser(ApplicationUser user)
    {
        this.user = user;
    }

    public ApplicationUser GetBuddy()
    {
        return buddy;
    }

    public void SetBuddy(ApplicationUser buddy)
    {
        this.buddy = buddy;
    }

    public LocalDateTime GetDateCreated()
    {
        return DateCreated;
    }
}
