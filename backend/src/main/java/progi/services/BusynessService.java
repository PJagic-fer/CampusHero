package progi.services;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.Busyness;
import progi.data.Canteen;
import progi.repositories.BusynessRepository;
import progi.repositories.CanteenRepository;

@Service
public class BusynessService {
    private BusynessRepository busynessRepository;
    private CanteenRepository canteenRepository;

    @Autowired
    public BusynessService(BusynessRepository busynessRepository, CanteenRepository canteenRepository) {
        this.busynessRepository = busynessRepository;
        this.canteenRepository = canteenRepository;
    }

    public Busyness addBusyness(Busyness busyness) {
        return busynessRepository.save(busyness);
    }

    public void deleteBusyness(Long busynessId) {
        busynessRepository.deleteById(null);
        ;
    }

    public Busyness getBusynessById(Long busynessId) {
        return busynessRepository.getReferenceById(busynessId);
    }

    public List<Busyness> getBusynesses() {
        return busynessRepository.findAll();
    }

    // gužva za određenu menzu
    public List<Busyness> getCanteenBusyness(Long canteenId) {
        Canteen canteen = canteenRepository.getReferenceById(canteenId);
        return busynessRepository.findByCanteen(canteen);
    }

    public List<Busyness> getCanteenBusynessToday(Long canteenId) {
        List<Busyness> matchingBusynesses = new ArrayList<>();
        List<Busyness> allBusynesses = getCanteenBusyness(canteenId);

        // filtracija gužvi po trenutnom satu
        matchingBusynesses = allBusynesses.stream()
                .filter((busyness) -> (busyness.getTime().toLocalDate().equals(LocalDateTime.now().toLocalDate())))
                .toList();
        return matchingBusynesses;
    }

    public List<Busyness> getCanteenBusynessThisHourToday(Long canteenId) {
        List<Busyness> matchingBusynesses = new ArrayList<>();
        List<Busyness> allBusynesses = getCanteenBusyness(canteenId);

        // filtracija gužvi po trenutnom satu i objavljene danas
        matchingBusynesses = allBusynesses.stream()
                .filter((busyness) -> ((busyness.getTime().getHour() == LocalDateTime.now().getHour())
                        && busyness.getTime().toLocalDate().equals(LocalDateTime.now().toLocalDate())))
                .toList();
        return matchingBusynesses;
    }

    public List<Busyness> getCanteenBusynessThisHourDays(Long canteenId) {
        List<Busyness> matchingBusynesses = new ArrayList<>();
        List<Busyness> allBusynesses = getCanteenBusyness(canteenId);

        // filtracija gužvi po trenutnom satu i starosti manjoj od 4 dana
        matchingBusynesses = allBusynesses.stream()
                .filter((busyness) -> ((busyness.getTime().getHour() == LocalDateTime.now().getHour())
                        && ChronoUnit.DAYS
                                .between(busyness.getTime().toLocalDate(), LocalDateTime.now().toLocalDate()) < 4))
                .toList();
        return matchingBusynesses;
    }

    public List<Busyness> getCanteenBusynessNextHourDays(Long canteenId) {
        List<Busyness> matchingBusynesses = new ArrayList<>();
        List<Busyness> allBusynesses = getCanteenBusyness(canteenId);

        // filtracija gužvi po sljdećem satu i starosti manjoj od 4 dana
        matchingBusynesses = allBusynesses.stream()
                .filter((busyness) -> (((busyness.getTime().getHour() - LocalDateTime.now().getHour()) == 1)
                        && ChronoUnit.DAYS
                                .between(busyness.getTime().toLocalDate(), LocalDateTime.now().toLocalDate()) < 4))
                .toList();
        return matchingBusynesses;
    }
}
