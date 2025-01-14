package progi.utils;

public class AdminApplication {
    private String personalInfo;

    private String experiences;

    private String competencies;

    public AdminApplication() {
    }

    public AdminApplication(String personalInfo, String experiences, String competencies) {
        this.personalInfo = personalInfo;
        this.experiences = experiences;
        this.competencies = competencies;
    }

    public String getPersonalInfo() {
        return personalInfo;
    }

    public void setPersonalInfo(String personalInfo
    ) {
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

}
