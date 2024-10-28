package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

// Oznaci klasu kao controller
@RestController
public class MainController
{
    // Povezuje funkciju i "/" uri
    @GetMapping("/")
    public ModelAndView LoginFunc()
    {
        ModelAndView test = new ModelAndView();
        test.setViewName("login.html");
        return test;
    }

    @GetMapping("/home")
    public ModelAndView HomeFunc()
    {
        ModelAndView test = new ModelAndView();
        test.setViewName("home.html");
        return test;
    }

    @GetMapping("/error")
    public String ErrorFunc()
    {
        return "Error, something went wrong!";
    }
}