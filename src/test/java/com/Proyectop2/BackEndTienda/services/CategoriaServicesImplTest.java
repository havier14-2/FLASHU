package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.entities.Categoria;
import com.Proyectop2.BackEndTienda.repositories.CategoriaRepositories;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class CategoriaServiceImplTest {

    @Mock
    private CategoriaRepositories categoriaRepository;

    @InjectMocks
    private CategoriaServicesImpl categoriaService;

    private Categoria cat1;
    private Categoria cat2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        cat1 = new Categoria(1L, "Tecnología", Collections.emptyList());
        cat2 = new Categoria(2L, "Hogar", Collections.emptyList());
    }

    @Test
    void findAllCategoriasTest() {
        List<Categoria> listaFalsa = List.of(cat1, cat2);
        when(categoriaRepository.findAll()).thenReturn(listaFalsa);

        List<Categoria> resultado = categoriaService.listarTodas();

        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals("Tecnología", resultado.get(0).getNombre());
        verify(categoriaRepository).findAll();
    }

    @Test
    void saveCategoriaTest() {
        Categoria categoriaNueva = new Categoria(null, "Belleza", Collections.emptyList());
        Categoria categoriaGuardada = new Categoria(3L, "Belleza", Collections.emptyList());
        when(categoriaRepository.save(categoriaNueva)).thenReturn(categoriaGuardada);

        Categoria resultado = categoriaService.crear(categoriaNueva);

        assertNotNull(resultado);
        assertEquals(3L, resultado.getId());
        verify(categoriaRepository).save(categoriaNueva);
    }
}