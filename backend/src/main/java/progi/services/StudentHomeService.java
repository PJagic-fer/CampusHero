package progi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import progi.data.StudentHome;
import progi.repositories.StudentHomeRepository;

import java.util.List;

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
}
