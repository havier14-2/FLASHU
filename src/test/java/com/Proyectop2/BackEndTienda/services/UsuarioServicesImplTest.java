package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class UsuarioServicesImplTest {

    @Mock
    private UsuarioRepositories usuarioRepository;
    
    // Para los tests, creamos una instancia real del encoder que no depende de Spring
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // @InjectMocks no funciona bien con inyección por constructor si no se configura,
    // por eso lo inyectaremos manualmente en setUp().
    private UsuarioServicesImpl usuarioService;

    private Usuario adminFalso;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Inyectamos manualmente el mock y el encoder real al servicio para el test
        usuarioService = new UsuarioServicesImpl(usuarioRepository, passwordEncoder);
        adminFalso = new Usuario(1L, "Admin Test", "admin@test.com", passwordEncoder.encode("admin123"), "super-admin", "activo", LocalDateTime.now());
    }

    @Test
    void getAllUsuariosTest() {
        List<Usuario> listaFalsa = List.of(adminFalso);
        when(usuarioRepository.findAll()).thenReturn(listaFalsa);
        List<Usuario> resultado = usuarioService.getAllUsuarios();
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        verify(usuarioRepository).findAll();
    }

    @Test
    void loginExitosoTest() {
        when(usuarioRepository.findByEmail("admin@test.com")).thenReturn(Optional.of(adminFalso));
        Optional<Usuario> resultado = usuarioService.login("admin@test.com", "admin123");
        assertTrue(resultado.isPresent());
        assertEquals("super-admin", resultado.get().getRol());
        verify(usuarioRepository).findByEmail("admin@test.com");
    }

    @Test
    void loginFallidoTest() {
        when(usuarioRepository.findByEmail("admin@test.com")).thenReturn(Optional.of(adminFalso));
        // Probamos con una contraseña incorrecta
        Optional<Usuario> resultado = usuarioService.login("admin@test.com", "password-incorrecta");
        assertFalse(resultado.isPresent());
        verify(usuarioRepository).findByEmail("admin@test.com");
    }
}