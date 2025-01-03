package progi.utils;

import progi.data.Post;

public class FacilityDataWithPost {
   private FacilityData facilityData;

   private Post post;

   public FacilityDataWithPost() {
   }

   public FacilityDataWithPost(FacilityData facilityData, Post post) {
      this.facilityData = facilityData;
      this.post = post;
   }

   public FacilityData getFacilityData() {
      return facilityData;
   }

   public void setFacilityData(FacilityData facilityData) {
      this.facilityData = facilityData;
   }

   public Post getPost() {
      return post;
   }

   public void setPost(Post post) {
      this.post = post;
   }

}
