package progi.data;

import jakarta.persistence.*;


@Entity
public class Faculty {

    @Id
    @SequenceGenerator(
            name = "faculty_sequence",
            sequenceName = "faculty_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "faculty_sequence"
    )
    private Long id;

    private String name;

    private String street;

    private String streetNumber;

    public Faculty() {}

    public Faculty(String name, String street, String streetNumber) {
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
