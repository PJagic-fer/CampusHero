package progi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.data.Canteen;
import progi.data.Faculty;
import progi.repositories.CanteenRepository;
import progi.repositories.FacultyRepository;

import java.util.List;

@Service
public class CanteenService {
    private final CanteenRepository canteenRepository;

    @Autowired
    public CanteenService(CanteenRepository canteenRepository) {
        this.canteenRepository = canteenRepository;
    }


    public List<Canteen> getCanteenes() {
        return canteenRepository.findAll();

    }
}
