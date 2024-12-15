package progi.utils;

import progi.data.ApplicationUser;
import progi.data.City;
import progi.data.Faculty;
import progi.data.StudentHome;

// klasa sa podacima korisnika (bez id-ja)
public class ApplicationUserData {
    private String name;
    private String surname;
    private String email;
    private String jmbag;
    private City city;
    private StudentHome studentHome;
    private Faculty faculty;
    private boolean isBuddy;

    public ApplicationUserData() {
    }

    public ApplicationUserData(String name, String surname, String email, String jmbag, City city,
            StudentHome studentHome, Faculty faculty, boolean isBuddy) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.jmbag = jmbag;
        this.city = city;
        this.studentHome = studentHome;
        this.faculty = faculty;
        this.isBuddy = isBuddy;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJmbag() {
        return jmbag;
    }

    public void setJmbag(String jmbag) {
        this.jmbag = jmbag;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public StudentHome getStudentHome() {
        return studentHome;
    }

    public void setStudentHome(StudentHome studentHome) {
        this.studentHome = studentHome;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public boolean isBuddy() {
        return isBuddy;
    }

    public void setBuddy(boolean buddy) {
        isBuddy = buddy;
    }

    // pretvorba objekta korisnika u objekt koji sadrži njegove atribute (bez id)
    public static ApplicationUserData parseApplicationUserData(ApplicationUser applicationUser) {
        return new ApplicationUserData(
                applicationUser.getName(),
                applicationUser.getSurname(),
                applicationUser.getEmail(),
                applicationUser.getJmbag(),
                applicationUser.getCity(),
                applicationUser.getStudentHome(),
                applicationUser.getFaculty(),
                applicationUser.isBuddy());
    }
}
