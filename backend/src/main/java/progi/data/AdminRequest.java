package progi.data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import progi.utils.AdminApplication;

@Entity
public class AdminRequest {
    @Id
    @SequenceGenerator(name = "admin_request_sequence", sequenceName = "admin_request_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_request_sequence")
    @Column(unique = true)
    private Long id;

    @OneToOne
    private ApplicationUser applicant;

    @Column(length = 5000)
    private String personalInfo;

    @Column(length = 5000)
    private String experiences;

    @Column(length = 5000)
    private String competencies;

    @CreationTimestamp
    private LocalDateTime time;

    public AdminRequest() {
    }

    public AdminRequest(ApplicationUser applicant, String personalInfo, String experiences, String competencies) {
        this.applicant = applicant;
        this.personalInfo = personalInfo;
        this.experiences = experiences;
        this.competencies = competencies;
    }

    public AdminRequest(ApplicationUser applicant, AdminApplication application) {
        this.applicant = applicant;
        this.personalInfo = application.getPersonalInfo();
        this.experiences = application.getExperiences();
        this.competencies = application.getCompetencies();
    }

    public AdminRequest(Long id, ApplicationUser applicant, AdminApplication application, LocalDateTime time) {
        this.id = id;
        this.applicant = applicant;
        this.personalInfo = application.getPersonalInfo();
        this.experiences = application.getExperiences();
        this.competencies = application.getCompetencies();
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ApplicationUser getApplicant() {
        return applicant;
    }

    public void setApplicant(ApplicationUser applicant) {
        this.applicant = applicant;
    }

    public String getPersonalInfo() {
        return personalInfo;
    }

    public void setPersonalInfo(String personalInfo) {
        this.personalInfo = personalInfo;
    }

    public String getExperiences() {
        return experiences;
    }

    public void setExperiences(String experiences) {
        this.experiences = experiences;
    }

    public String getCompetencies() {
        return competencies;
    }

    public void setCompetencies(String competencies) {
        this.competencies = competencies;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public AdminApplication geApplication() {
        return new AdminApplication(this.personalInfo, this.experiences, this.competencies);
    }

    public void setApplication(AdminApplication application) {
        this.personalInfo = application.getPersonalInfo();
        this.experiences = application.getExperiences();
        this.competencies = application.getCompetencies();
    }

}
