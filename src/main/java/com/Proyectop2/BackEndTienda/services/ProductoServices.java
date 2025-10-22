package com.Proyectop2.BackEndTienda.services; // <-- LÍNEA CORREGIDA

import com.Proyectop2.BackEndTienda.entities.Producto; // <-- LÍNEA CORREGIDA
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductoServices {
Page<Producto> listarTodas(String nombre, Long categoriaId, Pageable pageable);
    Producto crear(Producto producto);
    Producto obtenerId(Long id);
    List<Producto> listarTodas();
    void eliminar(Long id);
    Producto actualizar(Long id, Producto productoActualizado);
    Producto desactivar(Long id);
    Producto activar(Long id); // <-- AÑADE ESTA LÍNEA
    Producto guardar(Producto producto); // <-- AÑADE ESTA LÍNEA
}