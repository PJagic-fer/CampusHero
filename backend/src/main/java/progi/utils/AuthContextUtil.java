package progi.utils;

import jakarta.servlet.http.HttpSession;

public class AuthContextUtil {

    public static String getContextUserId(HttpSession session) {
        return (String) session.getAttribute("userId");
    }

    public static void setContextUserId(HttpSession session, String userId) {
        session.setAttribute("userId", userId);
    }

    public static void removeContextUserId(HttpSession session) {
        session.invalidate();
    }
}
