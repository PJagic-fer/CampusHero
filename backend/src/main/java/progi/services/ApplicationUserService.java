package progi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import progi.data.ApplicationUser;
import progi.repositories.ApplicationUserRepository;
import progi.utils.ApplicationUserData;

@Service
public class ApplicationUserService {

    private final ApplicationUserRepository applicationUserRepository;

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    public void addNewApplicationUser(ApplicationUser newUser) {
        applicationUserRepository.save(newUser);
    }

    public List<ApplicationUser> getAllApplicationUsers() {
        return applicationUserRepository.findAll();
    }

    public List<ApplicationUserData> getAllApplicationUsersData() {
        return getAllApplicationUsers().stream().map((u) -> ApplicationUserData.parseApplicationUserData(u)).toList();
    }

    public ApplicationUser getApplicationUser(Long appUserId) {
        // pronalazak korisnika prema id-ju
        return applicationUserRepository.getReferenceById(appUserId);
    }

    public ApplicationUser getApplicationUserByGoogleId(String googleId) {
        // pronalazak korisnika prema custom id-ju
        return applicationUserRepository.findByGoogleId(googleId);
    }

    public Pair<ApplicationUser, Boolean> getOrCreateApplicationUser(ApplicationUser user) {
        // provjera postoji li user u bazi
        ApplicationUser foundUser = applicationUserRepository.findByGoogleId(user.getGoogleId());
        if (foundUser == null) {
            // stvaranje novog ako ne postoji
            return Pair.of(applicationUserRepository.save(user), true);
        }
        // vraćanje pronađenog
        return Pair.of(foundUser, false);
    }

    public void setIsBuddy(ApplicationUser applicationUser) {
        applicationUserRepository.save(applicationUser);
    }

    public Optional<ApplicationUser> getUserById(Long userId) {
        Optional<ApplicationUser> foundUser = applicationUserRepository.findById(userId);
        return foundUser;
    }

    public Optional<ApplicationUser> updateApplicationUserData(String contextUserId, ApplicationUserData userData) {
        // čitanje trenutnog korisnika
        ApplicationUser foundUser = applicationUserRepository.findByGoogleId(contextUserId);
        if (foundUser == null) {
            return null;
        }
        // ažuriranje korisnikovih podataka
        foundUser.setName(userData.getName());
        foundUser.setSurname(userData.getSurname());
        foundUser.setJmbag(userData.getJmbag());
        foundUser.setCity(userData.getCity());
        foundUser.setStudentHome(userData.getStudentHome());
        foundUser.setFaculty(userData.getFaculty());
        foundUser.setEmail(userData.getEmail());

        applicationUserRepository.save(foundUser);
        return Optional.of(foundUser);
    }

    public void updateApplicationUser(ApplicationUser updatedUser)
    {
        applicationUserRepository.save(updatedUser);
    }
}
