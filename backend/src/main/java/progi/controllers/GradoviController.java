package progi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi.data.City;
import progi.services.CityService;

@RestController
@RequestMapping("/campus-hero/gradovi")
public class GradoviController {

    private CityService cityService;

    @Autowired
    public GradoviController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("")
    public List<City> getGradovi() {
        return cityService.getCities();
    }

}
