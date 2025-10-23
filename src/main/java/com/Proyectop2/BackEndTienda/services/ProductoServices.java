package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.entities.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ProductoServices {

    Producto crear(Producto producto);

    Producto obtenerId(Long id);

    Page<Producto> listarTodas(String nombre, Long categoriaId, Integer stockMenorA, Pageable pageable);
    
    List<Producto> listarTodas();

    void eliminar(Long id);

    Producto actualizar(Long id, Producto productoActualizado);

    Producto desactivar(Long id);

    Producto activar(Long id);
    
    Producto guardar(Producto producto);
}