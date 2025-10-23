package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.entities.Producto;
import com.Proyectop2.BackEndTienda.repositories.ProductoRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoServicesImpl implements ProductoServices {

    @Autowired
    private ProductoRepositories productoRepositories;

    @Override
    public Producto crear(Producto producto) {
        return productoRepositories.save(producto);
    }

    @Override
    public Producto obtenerId(Long id) {
        return productoRepositories.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    @Override
    public Page<Producto> listarTodas(String nombre, Long categoriaId, Integer stockMenorA, Pageable pageable) {
        return productoRepositories.findWithFiltersAndPagination(nombre, categoriaId, stockMenorA, pageable);
    }

    @Override
    public List<Producto> listarTodas() {
        return productoRepositories.findAllWithCategoria();
    }

    @Override
    public void eliminar(Long id) {
        if (!productoRepositories.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con id: " + id);
        }
        productoRepositories.deleteById(id);
    }

    @Override
    public Producto actualizar(Long id, Producto productoActualizado) {
        Producto existente = obtenerId(id);
        existente.setNombre(productoActualizado.getNombre());
        existente.setDescripcion(productoActualizado.getDescripcion());
        existente.setPrecio(productoActualizado.getPrecio());
        existente.setStock(productoActualizado.getStock());
        existente.setCategoria(productoActualizado.getCategoria());
        return productoRepositories.save(existente);
    }

    @Override
    public Producto desactivar(Long id) {
        Producto producto = obtenerId(id);
        producto.setActivo(false);
        return productoRepositories.save(producto);
    }

    @Override
    public Producto activar(Long id) {
        Producto producto = obtenerId(id);
        producto.setActivo(true);
        return productoRepositories.save(producto);
    }

    @Override
    public Producto guardar(Producto producto) {
        return productoRepositories.save(producto);
    }
}