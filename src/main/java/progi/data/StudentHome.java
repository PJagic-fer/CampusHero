package progi.data;

import jakarta.persistence.*;
import org.hibernate.mapping.ToOne;


@Entity
public class StudentHome {
    @Id
    @SequenceGenerator(
            name = "studentHome_sequence",
            sequenceName = "studentHome_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "studentHome_sequence"
    )
    private Long id;

    private String name;

    private String street;

    private String streetNumber;

    public StudentHome(String name, String street, String streetNumber) {
        this.name = name;
        this.street = street;
        this.streetNumber = streetNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStreet() {
        return street;
    }

    public String getStreetNumber() {
        return streetNumber;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }
}
