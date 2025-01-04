package progi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.Faculty;
import progi.data.Forum;
import progi.data.StudentHome;
import progi.repositories.ForumRepository;
import progi.utils.FacilityData;

@Service
public class ForumService {
   private ForumRepository forumRepository;
   private FacultyService facultyService;
   private StudentHomeService studentHomeService;

   @Autowired
   public ForumService(ForumRepository forumRepository, FacultyService facultyService,
         StudentHomeService studentHomeService) {
      this.forumRepository = forumRepository;
      this.facultyService = facultyService;
      this.studentHomeService = studentHomeService;
   }

   public void createForum(Forum forum) {
      forumRepository.save(forum);
   }

   public Forum getForumById(Long forumId) {
      return forumRepository.getReferenceById(forumId);
   }

   public Forum getForumByFacility(FacilityData facilityData) {
      Forum forum = new Forum();
      if (facilityData.getFacultyId() != null) {
         Faculty faculty = facultyService.getFacultyById(facilityData.getFacultyId());
         Forum foundForum = forumRepository.findByFaculty(faculty);
         if (foundForum == null) {
            forum.setFaculty(faculty);
            createForum(forum);
            System.out.println("STVOREN NOVI FORUM za fakultet");
            return forum;
         }
         return foundForum;
      } else if (facilityData.getStudentHomeId() != null) {
         StudentHome studentHome = studentHomeService.getStudentHomeById(facilityData.getStudentHomeId());
         Forum foundForum = forumRepository.findByStudentHome(studentHome);
         if (foundForum == null) {
            forum.setStudentHome(studentHome);
            createForum(forum);
            System.out.println("STVOREN NOVI FORUM za dom");
            return forum;
         }
         return foundForum;
      }

      System.out.println("Nije pronasao facility");
      return forum;
   }
}
