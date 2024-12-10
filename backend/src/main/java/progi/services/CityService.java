package progi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.City;
import progi.repositories.CityRepository;

@Service
public class CityService {
    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepositoryit) {
        this.cityRepository = cityRepositoryit;
    }

    public List<City> getCities() {
        return cityRepository.findAll();

    }
}
