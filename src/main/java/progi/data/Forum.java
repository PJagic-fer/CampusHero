package progi.data;

import jakarta.persistence.*;


@Entity
public class Forum {

    @Id
    @SequenceGenerator(
            name = "forum_sequence",
            sequenceName = "forum_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "forum_sequence"
    )
    private Long id;

    @OneToOne
    private Faculty faculty;

    @OneToOne
    private StudentHome studentHome;

    public Forum(Faculty faculty) {
        this.faculty = faculty;
    }

    public Forum(StudentHome studentHome){
        this.studentHome = studentHome;
    }

    public Long getId() {
        return id;
    }

    public Faculty getfaculty() {
        return faculty;
    }

    public StudentHome getstudentHome() {
        return studentHome;
    }
}
