package progi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.data.Faculty;
import progi.repositories.FacultyRepository;

import java.util.List;

@Service
public class FacultyService {
    private final FacultyRepository facultyRepository;

    @Autowired
    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }


    public List<Faculty> getFaculties() {
        return facultyRepository.findAll();

    }

    public Faculty getFacultyById(Long id){
      return facultyRepository.getReferenceById(id);
    }
}
