package progi.data;


import jakarta.persistence.*;

import java.util.List;


@Entity
public class Canteen {

    @Id
    @SequenceGenerator(
            name = "canteen_sequence",
            sequenceName = "canteen_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "canteen_sequence"
    )
    private Long id;

    private String name;

    private String street;

    private  String streetNumber;

    public Canteen(String name, String street, String streetNumber) {
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
