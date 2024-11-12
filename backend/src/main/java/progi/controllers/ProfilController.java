package progi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import progi.data.City;
import progi.data.Faculty;
import progi.data.StudentHome;
import progi.services.ApplicationUserService;
import progi.utils.AuthContextUtil;

@RestController
@RequestMapping("/campus-hero/profil")
public class ProfilController {

    private ApplicationUserService applicationUserService;

    @Autowired
    public ProfilController(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    // klasa sa podacima korisnika (bez id-ja)
    public static class UserData {
        private String ime;
        private String prezime;
        private String email;
        private String jmbag;
        private City city;
        private StudentHome studentHome;
        private Faculty faculty;
        private boolean isBuddy;

        public UserData() {
        }

        public String getIme() {
            return ime;
        }

        public void setIme(String name) {
            this.ime = name;
        }

        public String getPrezime() {
            return prezime;
        }

        public void setPrezime(String surname) {
            this.prezime = surname;
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

    }

    @PostMapping("")
    public ResponseEntity<?> postProfil(@RequestBody UserData userData, HttpSession session,
            HttpServletRequest request) {
        
        String contextUserId = AuthContextUtil.getContextUserId(session);
        applicationUserService.updateApplicationUser(contextUserId, userData);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
