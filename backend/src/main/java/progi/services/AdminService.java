package progi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.AdminRequest;
import progi.data.ApplicationUser;
import progi.repositories.AdminRequestRepository;
import progi.repositories.ApplicationUserRepository;

@Service
public class AdminService {
    private ApplicationUserRepository applicationUserRepository;
    private AdminRequestRepository adminRequestRepository;

    @Autowired
    public AdminService(ApplicationUserRepository applicationUserRepository,
            AdminRequestRepository adminRequestRepository) {
        this.adminRequestRepository = adminRequestRepository;
        this.applicationUserRepository = applicationUserRepository;
    }

    public List<ApplicationUser> getAdmins() {
        return applicationUserRepository.findByIsAdminIsNotNull();
    }

    // korisnik postaje admin
    public ApplicationUser giveAdminPrivileges(Long adminRequestId, ApplicationUser user) {
        user.setIsAdmin(true);
        deleteRequest(adminRequestId);

        return applicationUserRepository.save(user);
    }

    // korisnik prestaje biti admin
    public ApplicationUser depriveAdminPrivileges(ApplicationUser user) {
        user.setIsAdmin(false);
        return applicationUserRepository.save(user);
    }

    public List<AdminRequest> getAdminRequests() {
        return adminRequestRepository.findAll();
    }

    // prijave za admina bez google id
    public List<AdminRequest> getSecureAdminRequests() {
        return getAdminRequests().stream().map((r) -> {
            ApplicationUser applicant = r.getApplicant();
            applicant.setGoogleId(null);
            return new AdminRequest(applicant, r.geApplication());
        }).toList();
    }

    // nova prijava za admina
    public AdminRequest addAdminRequest(AdminRequest request) {
        ApplicationUser applicationUser = request.getApplicant();

        // korisnik ne može podnijeti prijavu ako već je admin
        if (applicationUser.getIsAdmin()) {
            System.out.println("korisnik već je administrator");
            return null;
        }

        // korisnik može podnijeti samo jednu prijavu
        AdminRequest foundRequest = adminRequestRepository.findByApplicant(applicationUser);
        if (foundRequest != null) {
            System.out.println("korisnik već je poslao zahtjev za admina");
            return null;
        }

        AdminRequest adminRequest = adminRequestRepository.save(request);
        List<ApplicationUser> admins = getAdmins();
        if (admins.size() == 0) {
            // prvi korisnik koji želi postati administrator automatskije odobren
            ApplicationUser firstAdmin = request.getApplicant();
            giveAdminPrivileges(adminRequest.getId(), firstAdmin);
        }
        return adminRequest;
    }

    // brisanje prijave iz baze
    public void deleteRequest(Long requestId) {
        if (requestId == null) {
            System.out.println("nema requesta");
        } else {
            adminRequestRepository.deleteById(requestId);
        }
    }
}
