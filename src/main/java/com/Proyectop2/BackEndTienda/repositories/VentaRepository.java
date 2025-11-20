package com.Proyectop2.BackEndTienda.repositories;

import com.Proyectop2.BackEndTienda.entities.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long> {
    
    List<Venta> findByUsuarioId(Long usuarioId);

    // --- CORRECCIÓN 3: Este es el método exacto que busca tu servicio ---
    List<Venta> findByUsuarioIdOrderByFechaDesc(Long usuarioId);
}