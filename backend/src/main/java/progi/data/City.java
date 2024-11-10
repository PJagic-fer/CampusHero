package progi.data;

import jakarta.persistence.*;

@Entity
public class City {

    @Id
    @SequenceGenerator(
            name = "city_sequence",
            sequenceName = "city_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "city_sequence"
    )
    @Column(unique = true)
    private Integer postal_code;

    private String name;

    public City() {}

    public City(Integer postal_code, String name) {
        this.postal_code = postal_code;
        this.name = name;
    }

    public Integer getPostal_code() {
        return postal_code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
