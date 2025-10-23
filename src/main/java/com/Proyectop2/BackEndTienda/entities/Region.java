package com.Proyectop2.BackEndTienda.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;

    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
    private List<Comuna> comunas;
}