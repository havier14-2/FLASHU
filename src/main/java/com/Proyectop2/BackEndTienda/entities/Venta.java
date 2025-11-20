package com.Proyectop2.BackEndTienda.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "ventas")
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long total;

    @CreationTimestamp
    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties("ventas")
    private Usuario usuario;

    private String estado; 

    // --- CORRECCIÓN 1: Agregamos este campo que faltaba ---
    private Integer cantidadItems; 

    // Relación con los detalles
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("venta")
    private List<DetalleVenta> detalles = new ArrayList<>();
}