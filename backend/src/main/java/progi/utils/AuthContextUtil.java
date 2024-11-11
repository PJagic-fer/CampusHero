package progi.utils;

import java.util.ArrayList;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import progi.data.ApplicationUser;

public class AuthContextUtil {

    public static ApplicationUser getContext() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        return (ApplicationUser) authentication.getPrincipal();
    }

    public static void setContext(ApplicationUser user) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);
    }

}
