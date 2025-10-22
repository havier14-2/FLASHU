package com.Proyectop2.BackEndTienda.services; // <-- LÍNEA CORREGIDA

import com.Proyectop2.BackEndTienda.entities.Categoria; // <-- LÍNEA CORREGIDA
import java.util.List;

public interface CategoriaServices {

    Categoria crear(Categoria categoria);
    Categoria obtenerId(Long id);
    List<Categoria> listarTodas();
    void eliminar(Long id);
    Categoria actualizar(Long id, Categoria categoriaActualizada);
}