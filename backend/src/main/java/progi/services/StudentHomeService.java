package progi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import progi.data.StudentHome;
import progi.repositories.StudentHomeRepository;

@Service
public class StudentHomeService {
   private final StudentHomeRepository studentHomeRepository;

   @Autowired
   public StudentHomeService(StudentHomeRepository studentHomeRepository) {
      this.studentHomeRepository = studentHomeRepository;
   }

   public List<StudentHome> getStudenthomes() {
      return studentHomeRepository.findAll();

   }

   public StudentHome getStudentHomeById(Long id) {
      return studentHomeRepository.getReferenceById(id);
   }
}
