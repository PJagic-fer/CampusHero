package progi.data.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.data.ApplicationUser;
import progi.repositories.ApplicationUserRepository;

import java.util.List;


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
}
