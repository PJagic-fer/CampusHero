package progi.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class City {

    @Id
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
