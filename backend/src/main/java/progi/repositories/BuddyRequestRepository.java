package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi.data.ApplicationUser;
import progi.data.BuddyRequest;

@Repository
public interface BuddyRequestRepository extends JpaRepository<BuddyRequest, Long> {
    public BuddyRequest findByUserAndIsBlocked(ApplicationUser user, boolean isBlocked);

    public BuddyRequest findByUserAndBuddy(ApplicationUser user, ApplicationUser buddy);
}
