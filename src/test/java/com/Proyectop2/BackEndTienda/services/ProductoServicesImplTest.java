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

    // --- TEST CORREGIDO ---
    @Test
    void listarTodasConFiltrosYPaginacionTest() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Producto> listaFalsa = List.of(productoF);
        
        // Añadimos 'null' para el parámetro 'stockMenorA' que faltaba
        when(productoRepository.findWithFiltersAndPagination("Jugo", 1L, null, pageable))
            .thenReturn(new PageImpl<>(listaFalsa, pageable, 1));

        // Añadimos 'null' en la llamada al servicio
        var resultado = productoService.listarTodas("Jugo", 1L, null, pageable);

        assertNotNull(resultado);
        assertEquals(1, resultado.getContent().size());
        
        // Verificamos que se llame al método con el 'null' incluido
        verify(productoRepository).findWithFiltersAndPagination("Jugo", 1L, null, pageable);
    }
    
    // ... (El resto de los tests: obtenerIdTest, etc., quedan igual)
}