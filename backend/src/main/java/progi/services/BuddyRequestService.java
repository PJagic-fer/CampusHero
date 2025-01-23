package progi.services;

import java.util.List;
import java.util.ArrayList; 
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import progi.data.ApplicationUser;
import progi.data.BuddyRequest;
import progi.repositories.BuddyRequestRepository;
import progi.repositories.ApplicationUserRepository;
import progi.services.ApplicationUserService;

@Service
public class BuddyRequestService {

    private final BuddyRequestRepository buddyRequestRepository;

    @Autowired
    public BuddyRequestService(BuddyRequestRepository buddyRequestRepository) {
        this.buddyRequestRepository = buddyRequestRepository;
    }

    public void addNewBuddyRequest(BuddyRequest request) {
        buddyRequestRepository.save(request);
    }

    public String getAllBuddyRequests()
    {
        List<BuddyRequest> requests = buddyRequestRepository.findAll();
        
        return requests.toString();
    }

    public Pair<BuddyRequest, Boolean> getBuddyRequest(ApplicationUser from, ApplicationUser to) {
        List<BuddyRequest> requests = buddyRequestRepository.findAll();

        Pair<BuddyRequest, Boolean> ret = Pair.of(null, false); // request nije naden, vrati prazno

        for(BuddyRequest request : requests){
            if(request.GetUser().equals(from) && request.GetBuddy().equals(to))
            {
                ret = Pair.of(request, true); // nasli request, vracamo ga
            }
        }

        return ret;
    }

    public Boolean editBuddyStatus(Long studentId, Long buddyId, Boolean isBuddy, ApplicationUserService applicationUserService)
    {
        List<BuddyRequest> requests = getAllRequestsForId(studentId);
        if (requests.size() == 0)
        {
            return false;
        }
        for(BuddyRequest request : requests)
        {
            if(request.GetBuddy().getId() == buddyId)
            {
                ApplicationUser user = applicationUserService.getUserById(studentId).orElse(null);
                if(!isBuddy)
                {
                    request.SetIsBlocked(false);
                    if(user != null)
                    {
                        user.setBuddy(null);
                        applicationUserService.updateApplicationUser(user);
                    }
                }
                else
                {
                    if(user != null)
                    {
                        ApplicationUser buddy = applicationUserService.getUserById(buddyId).orElse(null);
                        user.setBuddy(buddy);
                        applicationUserService.updateApplicationUser(user);
                    }
                }
                request.SetHasBuddyAccepted(isBuddy);
                buddyRequestRepository.save(request);
                return true;
            }
        }
        return false;
    }

    public List<BuddyRequest> getAllRequestsForId(Long userID)
    {
        List<BuddyRequest> requests = buddyRequestRepository.findAll();

        List<BuddyRequest> ret = new ArrayList<>();

        for(BuddyRequest request : requests){
            if(request.GetUser().getId() == userID)
            {
                ret.add(request);
            }
        }

        return ret;
    }
}
