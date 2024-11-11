package progi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import progi.controllers.ProfilController.UserData;
import progi.data.ApplicationUser;
import progi.repositories.ApplicationUserRepository;
import progi.utils.AuthContextUtil;

import java.util.List;
import java.util.Optional;

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

    public List<String> getApplicationUsers() {
        return applicationUserRepository.findAll().stream().map(ApplicationUser::getName).toList();

    }

    public Pair<ApplicationUser, Boolean> getOrCreateApplicationUser(ApplicationUser user) {
        // provjera postoji li user u bazi
        Optional<ApplicationUser> foundUser = applicationUserRepository.findById(user.getId());
        if (foundUser.isEmpty()) {
            // stvaranje novog ako ne postoji
            return Pair.of(applicationUserRepository.save(user), true);
        }
        // vraćanje pronađenog
        return Pair.of(foundUser.get(), false);
    }

    public Optional<ApplicationUser> updateApplicationUser(UserData userData) {
        // čitanje trenutnog korisnika
        ApplicationUser contextUser = AuthContextUtil.getContext();
        Optional<ApplicationUser> foundUserOptional = applicationUserRepository.findById(contextUser.getId());
        if (foundUserOptional.isEmpty()) {
            return null;
        }

        // ažuriranje korisnikovih podataka
        ApplicationUser foundUser = foundUserOptional.get();
        foundUser.setName(userData.getName());
        foundUser.setSurname(userData.getSurname());
        foundUser.setBuddy(userData.isBuddy());
        foundUser.setJmbag(userData.getJmbag());
        foundUser.setCity(userData.getCity());
        foundUser.setStudentHome(userData.getStudentHome());
        foundUser.setFaculty(userData.getFaculty());
        foundUser.setEmail(userData.getEmail());

        applicationUserRepository.save(foundUser);
        return Optional.of(foundUser);
    }
}
