package progi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import progi.data.ApplicationUser;

@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
    public ApplicationUser findByGoogleId(String googleId);

    public ApplicationUser findByJmbag(String jmbag);

    public List<ApplicationUser> findByIsAdminTrue();

    public List<ApplicationUser> findByIsBuddyTrue();

}
