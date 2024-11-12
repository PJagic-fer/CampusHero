package progi.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping("/survival-guides") 
    public String serveWelcomePage() {
        return "SurvivalGuides"; 
    }
    @GetMapping("/survival-guides/sava")
    public String serveForumPage() {
        return "Sava"; 
    }
    @GetMapping("/survival-guides/sara")
    public String serveForumPage() {
        return "Šara"; 
    }
    @GetMapping("/survival-guides/cvjetno")
    public String serveForumPage() {
        return "Sava"; 
    }
    @GetMapping("/survival-guides/FER")
    public String serveForumPage() {
        return "FER";
    }
    @GetMapping("/survival-guides/ZET")
    public String serveForumPage() {
        return "ZET";
    }
    @GetMapping("/survival-guides/upisi")
    public String serveForumPage() {
        return "Upisi";
    }
}
