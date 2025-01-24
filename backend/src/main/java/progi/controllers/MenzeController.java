package progi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import progi.data.Busyness;
import progi.data.Canteen;
import progi.services.BusynessService;
import progi.services.CanteenService;
import progi.utils.CheckDataValidity;

@RestController
@RequestMapping("/campus-hero/menze")
public class MenzeController {

    private CanteenService canteenService;
    private BusynessService busynessService;

    @Autowired
    public MenzeController(CanteenService canteenService, BusynessService busynessService) {
        this.canteenService = canteenService;
        this.busynessService = busynessService;
    }

    // sve menze
    @GetMapping("")
    public List<Canteen> getMenze() {
        return canteenService.getCanteenes();
    }

    // prijava gužve
    @PostMapping("/guzva")
    public ResponseEntity<?> postBusyness(@RequestBody Busyness busyness) {
        if (!CheckDataValidity.checkTextINputLength(busyness.getMessage(), 255)) {
            return new ResponseEntity<>(HttpStatus.PAYLOAD_TOO_LARGE); // 413
        }
        busyness = busynessService.addBusyness(busyness);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // dohvaćanje svih prijava gužve
    @GetMapping("/guzva")
    public List<Busyness> getAllBusynesses() {
        return busynessService.getBusynesses();
    }

    // dohvaćanje prijava gužve za određenu menzu
    @GetMapping("/guzva/{canteenId}")
    public List<Busyness> getBusyness(@PathVariable String canteenId) {
        return busynessService.getCanteenBusyness(Long.parseLong(canteenId));
    }

    // dohvaćanje današnjih prijava gužve za određenu menzu
    @GetMapping("/guzva/{canteenId}/danas")
    public List<Busyness> getBusynessToday(@PathVariable String canteenId) {
        return busynessService.getCanteenBusynessToday(Long.parseLong(canteenId));
    }

    // dohvaćanje prijava gužve u trenutnom satu za određenu menzu
    @GetMapping("/guzva/{canteenId}/danas-ovaj-sat")
    public List<Busyness> getBusynessNow(@PathVariable String canteenId) {
        return busynessService.getCanteenBusynessThisHourToday(Long.parseLong(canteenId));
    }

    // dohvaćanje prijava gužve u trenutnom satu danas i unazad tri dana za menzu
    @GetMapping("/guzva/{canteenId}/nekoliko-dana-ovaj-sat")
    public List<Busyness> getBusynessDays(@PathVariable String canteenId) {
        return busynessService.getCanteenBusynessThisHourDays(Long.parseLong(canteenId));
    }

    // dohvaćanje prijava gužve u sljdećem satu unazad tri dana za određenu menzu
    @GetMapping("/guzva/{canteenId}/nekoliko-dana-sljedeci-sat")
    public List<Busyness> getBusynessNextHourDays(@PathVariable String canteenId) {
        return busynessService.getCanteenBusynessNextHourDays(Long.parseLong(canteenId));
    }
}
