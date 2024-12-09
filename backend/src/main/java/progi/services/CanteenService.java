package progi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.Canteen;
import progi.repositories.CanteenRepository;

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
