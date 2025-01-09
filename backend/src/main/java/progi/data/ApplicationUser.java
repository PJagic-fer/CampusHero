package progi.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ApplicationUser {

    @Id
    private String id;

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

    @Column(unique = true, nullable = false)
    private String email;

    public ApplicationUser() {
    }

    public ApplicationUser(String id, String name, String surname, String email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.isAdmin = false;
        this.isBuddy = false;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getId() {
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
        System.out.println("Postao buddy");
        isBuddy = buddy;
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
}
