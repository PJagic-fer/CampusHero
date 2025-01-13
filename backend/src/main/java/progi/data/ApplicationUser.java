package progi.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ApplicationUser {

    @Id
    @SequenceGenerator(name = "app_user_sequence", sequenceName = "app_user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_user_sequence")
    private Long id;

    @Column(unique = true)
    private String googleId;

    @Column(unique = true, length = 10)
    private String jmbag;

    private String name;

    private String surname;

    @ManyToOne
    private City city;

    @ManyToOne
    private StudentHome studentHome;

    @ManyToOne
    private Faculty faculty;

    private boolean isAdmin;

    private boolean isBuddy;

    @ManyToOne
    private ApplicationUser buddy;

    @Column(unique = true, nullable = false)
    private String email;

    public ApplicationUser() {
    }

    public ApplicationUser(String googleId, String name, String surname, String email) {
        this.googleId = googleId;
        this.name = name;
        this.surname = surname;
        this.isAdmin = false;
        this.isBuddy = false;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getGoogleId() {
        return googleId;
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

    public City getCity() {
        return city;
    }

    public StudentHome getStudentHome() {
        return studentHome;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public boolean getIsBuddy() {
        return isBuddy;
    }

    public ApplicationUser getBuddy() {
        return buddy;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public void setIsBuddy(boolean isBuddy) {
        System.out.println("Postao buddy");
        this.isBuddy = isBuddy;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBuddy(ApplicationUser buddy) {
        this.buddy = buddy;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    @Override
    public String toString() {
        return "ApplicationUser [id=" + id + ", googleId=" + googleId + ", jmbag=" + jmbag + ", name=" + name
                + ", surname=" + surname + ", city=" + city + ", studentHome=" + studentHome + ", faculty=" + faculty
                + ", isAdmin=" + isAdmin + ", isBuddy=" + isBuddy + ", buddy=" + buddy + ", email=" + email + "]";
    }

}
