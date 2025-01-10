package progi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import progi.data.AdminRequest;
import progi.data.ApplicationUser;

public interface AdminRequestRepository extends JpaRepository<AdminRequest, Long> {
    public AdminRequest findByApplicant(ApplicationUser applicant);
}
