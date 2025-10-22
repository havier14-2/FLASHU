package com.Proyectop2.BackEndTienda.repositories;

import com.Proyectop2.BackEndTienda.entities.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List; // <-- ESTA ES LA IMPORTACIÓN QUE FALTABA

public interface ProductoRepositories extends JpaRepository<Producto, Long> {

    @Query("SELECT p FROM Producto p LEFT JOIN FETCH p.categoria WHERE " +
           "(:categoriaId IS NULL OR p.categoria.id = :categoriaId) AND " +
           "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    Page<Producto> findWithFiltersAndPagination(String nombre, Long categoriaId, Pageable pageable);

    @Query("SELECT p FROM Producto p LEFT JOIN FETCH p.categoria")
    List<Producto> findAllWithCategoria();
}