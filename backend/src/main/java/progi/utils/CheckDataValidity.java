package progi.utils;

public interface CheckDataValidity{

    public static boolean checkTextINputLength(String text, Integer length) {
        if (text.length() > length) {
            return false;
        }
        return true;
    }

    
}
