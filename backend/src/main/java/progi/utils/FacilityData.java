package progi.utils;

import progi.data.Faculty;
import progi.data.StudentHome;

public class FacilityData {

   private Long facultyId;
   private Long studentHomeId;

   public FacilityData() {
   }

   public FacilityData(Long facultyId, Long studentHomeId) {
      this.facultyId = facultyId;
      this.studentHomeId = studentHomeId;
   }

   public Long getFacultyId() {
      return facultyId;
   }

   public Long getStudentHomeId() {
      return studentHomeId;
   }

   public void setFacultyId(Long facultyId) {
      this.facultyId = facultyId;
   }

   public void setStudentHomeId(Long studentHomeId) {
      this.studentHomeId = studentHomeId;
   }

}
