package progi.utils;

import java.util.Collections;
import java.util.Optional;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

public class GoogleAuthentificator {
    public static Optional<GoogleIdToken.Payload> autentificate(String idTokenString) {
        String CLIENT_ID = ""; // token koji je google dodijelio našoj stranici
        NetHttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            // verifikacija tokena
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                return null;
            }
            return Optional.of(idToken.getPayload());
        } catch (Exception e) {
            // neispravan token
            return null;
        }

    }

}
