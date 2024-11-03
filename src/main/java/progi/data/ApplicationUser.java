package progi.data;


import jakarta.persistence.*;


@Entity
public class ApplicationUser {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;

    @Column(unique = true, length = 10)
    private String jmbag;

    private String name;

    private String surname;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    private City city;

    @ManyToOne
    private StudentHome studentHome;

    @ManyToOne
    private Faculty faculty;

    private boolean isAdmin;

    private boolean isBuddy;

    @Column(unique = true, nullable = false)
    private String email;

    public ApplicationUser(String jmbag, String name, String surname, String password, String email) {
        this.jmbag = jmbag;
        this.name = name;
        this.surname = surname;
        this.isAdmin = false;
        this.isBuddy = false;
        this.password = password;
        this.email = email;
    }

    public ApplicationUser(String jmbag, String name, String surname, String password, City city, Faculty faculty, boolean isBuddy, String email) {
        this.jmbag = jmbag;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.city = city;
        this.faculty = faculty;
        this.isBuddy = isBuddy;
        this.email = email;
    }

    public ApplicationUser(String jmbag, String name, String surname, String password, City city, StudentHome studentHome, Faculty faculty, boolean isBuddy, String email) {
        this.jmbag = jmbag;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.city = city;
        this.studentHome = studentHome;
        this.faculty = faculty;
        this.isBuddy = isBuddy;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }

    public String getJmbag() {
        return jmbag;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getPassword() {
        return password;
    }

    public City getCity() {
        return city;
    }

    public StudentHome getStudentHome() {
        return studentHome;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public boolean isBuddy() {
        return isBuddy;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public void setBuddy(boolean buddy) {
        isBuddy = buddy;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setJmbag(String jmbag) {
        this.jmbag = jmbag;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public void setStudentHome(StudentHome studentHome) {
        this.studentHome = studentHome;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }
}
