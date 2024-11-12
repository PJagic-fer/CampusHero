package progi.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("campus-hero/survival-guide")
@Controller
public class WebController {
   @GetMapping("/survival-guides")
   public String serveWelcomePage() {
      return "SurvivalGuides";
   }

   @GetMapping("/survival-guides/sava")
   public String postSurvaivalSava() {
      return "Sava";
   }

   @GetMapping("/survival-guides/sara")
   public String postSurvaivalSara() {
      return "Šara";
   }

   @GetMapping("/survival-guides/cvjetno")
   public String postSurvaivalCvjeto() {
      return "Sava";
   }

   @GetMapping("/survival-guides/FER")
   public String postSurvaivalFER() {
      return "FER";
   }

   @GetMapping("/survival-guides/ZET")
   public String postSurvaivalZET() {
      return "ZET";
   }

   @GetMapping("/survival-guides/upisi")
   public String postSurvaivalUpisi() {
      return "Upisi";
   }
}
