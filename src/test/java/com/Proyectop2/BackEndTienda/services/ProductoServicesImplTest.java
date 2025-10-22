package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.entities.Categoria;
import com.Proyectop2.BackEndTienda.entities.Producto;
import com.Proyectop2.BackEndTienda.repositories.ProductoRepositories;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class ProductoServicesImplTest {

    @Mock
    private ProductoRepositories productoRepository;

    @InjectMocks
    private ProductoServicesImpl productoService;

    private Categoria categoriaF;
    private Producto productoF;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        categoriaF = new Categoria(1L, "Bebidas", null);
        productoF = new Producto(1L, "Jugo Natural", "500cc", 2000L, 80, true, "jugo.jpg", categoriaF);
    }
    
    @Test
    void listarTodasConFiltrosYPaginacionTest() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Producto> listaFalsa = List.of(productoF);
        when(productoRepository.findWithFiltersAndPagination("Jugo", 1L, pageable))
            .thenReturn(new PageImpl<>(listaFalsa, pageable, 1));

        var resultado = productoService.listarTodas("Jugo", 1L, pageable);

        assertNotNull(resultado);
        assertEquals(1, resultado.getContent().size());
        verify(productoRepository).findWithFiltersAndPagination("Jugo", 1L, pageable);
    }

    @Test
    void obtenerIdTest() {
        when(productoRepository.findById(1L)).thenReturn(Optional.of(productoF));
        Producto resultado = productoService.obtenerId(1L);
        assertNotNull(resultado);
        assertEquals("Jugo Natural", resultado.getNombre());
        verify(productoRepository).findById(1L);
    }

    @Test
    void crearProductoTest() {
        Producto productoNuevo = new Producto(null, "Café", "Café helado", 2800L, 40, true, null, categoriaF);
        Producto productoGuardado = new Producto(2L, "Café", "Café helado", 2800L, 40, true, "cafe.jpg", categoriaF);
        when(productoRepository.save(productoNuevo)).thenReturn(productoGuardado);
        Producto resultado = productoService.crear(productoNuevo);
        assertNotNull(resultado);
        assertEquals(2L, resultado.getId());
        verify(productoRepository).save(productoNuevo);
    }

    @Test
    void desactivarProductoTest() {
        when(productoRepository.findById(1L)).thenReturn(Optional.of(productoF));
        when(productoRepository.save(any(Producto.class))).thenReturn(productoF);
        
        Producto resultado = productoService.desactivar(1L);
        
        assertNotNull(resultado);
        assertFalse(resultado.getActivo());
        verify(productoRepository).findById(1L);
        verify(productoRepository).save(productoF);
    }
}