package progi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.AdminRequest;
import progi.data.ApplicationUser;
import progi.repositories.AdminRequestRepository;
import progi.repositories.ApplicationUserRepository;
import progi.utils.ApplicationUserData;

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
        return applicationUserRepository.findByIsAdminTrue();
    }

    public List<ApplicationUser> getBuddies() {
        return applicationUserRepository.findByIsBuddyTrue();
    }

    public List<ApplicationUserData> getSecureBuddies() {
        return getBuddies().stream().map((buddy) -> ApplicationUserData.parseApplicationUserData(buddy)).toList();
    }

    public Integer getNumOfAdmins() {
        List<ApplicationUser> admins = getAdmins();
        return admins.size();
    }

    // korisnik postaje admin
    public ApplicationUser giveAdminPrivileges(Long adminRequestId, ApplicationUser user) {
        user.setIsAdmin(true);
        deleteAdminRequest(adminRequestId);

        return applicationUserRepository.save(user);
    }

    // korisnik prestaje biti admin
    public ApplicationUser depriveAdminPrivileges(ApplicationUser user) {
        user.setIsAdmin(false);
        user = applicationUserRepository.save(user);

        if (getNumOfAdmins() == 0) {
            List<AdminRequest> adminRequests = getAdminRequests();

            if (adminRequests.size() > 0) {
                AdminRequest oldestRequest = adminRequests.get(0);
                if (adminRequests.size() > 1) {
                    oldestRequest = adminRequests.stream()
                            .min((r1, r2) -> (r1.getTime().compareTo(r2.getTime()))).get();
                }

                ApplicationUser newAdmin = applicationUserRepository
                        .getReferenceById(oldestRequest
                                .getApplicant()
                                .getId());
                giveAdminPrivileges(oldestRequest.getId(), newAdmin);
            }
        }
        return user;
    }

    public AdminRequest getAdminRequest(Long adminRequestId) {
        return adminRequestRepository.getReferenceById(adminRequestId);
    }

    public List<AdminRequest> getAdminRequests() {
        return adminRequestRepository.findAll();
    }

    // prijave za admina bez google id
    public List<AdminRequest> getSecureAdminRequests() {
        return getAdminRequests().stream().map((r) -> {
            ApplicationUser applicant = r.getApplicant();
            applicant.setGoogleId(null);
            return new AdminRequest(r.getId(), applicant, r.geApplication(), r.getTime());
        }).toList();
    }

    // nova prijava za admina
    public Boolean addAdminRequest(AdminRequest request) {
        ApplicationUser applicationUser = request.getApplicant();

        AdminRequest foundRequest = adminRequestRepository.findByApplicant(applicationUser);
        if (foundRequest != null) {
            // staru prijavu zamijeni novom
            foundRequest.setApplication(request.geApplication());
            foundRequest = adminRequestRepository.save(foundRequest);
            return false;
        }

        request = adminRequestRepository.save(request);
        Integer numOfAdmins = getNumOfAdmins();
        if (numOfAdmins == 0) {
            // prvi korisnik koji želi postati administrator je automatskije odobren
            giveAdminPrivileges(request.getId(), applicationUser);
            return true;
        }
        return false;
    }

    // brisanje prijave iz baze
    public void deleteAdminRequest(Long requestId) {
        if (requestId == null) {
            System.out.println("nema requesta");
        } else {
            adminRequestRepository.deleteById(requestId);
        }
    }
}
