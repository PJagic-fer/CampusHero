package progi.data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Post {
   @Id
   @SequenceGenerator(name = "post_sequence", sequenceName = "post_sequence", allocationSize = 1)
   @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_sequence")
   private Long id;

   @ManyToOne
   private Forum forum;

   @ManyToOne
   private ApplicationUser creator;

   @CreationTimestamp
   private LocalDateTime time;

   @ManyToOne
   private Post parentPost;

   @OneToMany(mappedBy = "parentPost", cascade = CascadeType.ALL)
   @JsonIgnore
   private List<Post> childrenPosts = new ArrayList<>();

   @Column(length = 5000)
   private String message;

   public Post() {
   }

   public Post(Forum forum, Post parentPost, String message) {
      this.forum = forum;
      this.parentPost = parentPost;
      this.message = message;
   }

   public Post(Forum forum, ApplicationUser creator, String message) {
      this.forum = forum;
      this.creator = creator;
      this.message = message;
   }

   public Post(Forum forum, ApplicationUser creator, String message, Post parentPost) {
      this.forum = forum;
      this.creator = creator;
      this.message = message;
      this.parentPost = parentPost;
   }

   public Long getId() {
      return id;
   }

   public Forum getForum() {
      return forum;
   }

   public ApplicationUser getCreator() {
      return creator;
   }

   public LocalDateTime getTime() {
      return time;
   }

   public Post getParentPost() {
      return parentPost;
   }

   @JsonIgnore
   public List<Post> getChildrenPosts() {
      return childrenPosts;
   }

   public String getMessage() {
      return message;
   }

   public void setForum(Forum forum) {
      this.forum = forum;
   }

   @Override
   public String toString() {
      return this.message;
   }
}
