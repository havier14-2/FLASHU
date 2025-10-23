package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private UsuarioServicesImpl usuarioService;

    private Usuario adminFalso;
    private Usuario clienteFalso; // Variable declarada correctamente

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        usuarioService = new UsuarioServicesImpl(usuarioRepository, passwordEncoder);

        adminFalso = new Usuario(1L, "Admin", "admin@mail.com", passwordEncoder.encode("admin123"), "super-admin", "activo", null, null, LocalDateTime.now());
        
        // --- TYPO CORREGIDO AQUÍ ---
        clienteFalso = new Usuario(2L, "Cliente", "cliente@mail.com", passwordEncoder.encode("cliente123"), "cliente", "activo", null, null, LocalDateTime.now());
    }

    @Test
    void findAllUsuariosTest() {
        List<Usuario> listaFalsa = List.of(adminFalso, clienteFalso);
        when(usuarioRepository.findAll()).thenReturn(listaFalsa);
        List<Usuario> resultado = usuarioService.getAllUsuarios();
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        verify(usuarioRepository).findAll();
    }

    @Test
    void loginAdminExitosoTest() {
        when(usuarioRepository.findByEmail("admin@mail.com")).thenReturn(Optional.of(adminFalso));
        Optional<Usuario> resultado = usuarioService.login("admin@mail.com", "admin123");
        assertTrue(resultado.isPresent());
        assertEquals("super-admin", resultado.get().getRol());
        verify(usuarioRepository).findByEmail("admin@mail.com");
    }

    @Test
    void loginClienteRechazadoTest() {
        when(usuarioRepository.findByEmail("cliente@mail.com")).thenReturn(Optional.of(clienteFalso));
        Optional<Usuario> resultado = usuarioService.login("cliente@mail.com", "cliente123");
        assertFalse(resultado.isPresent());
        verify(usuarioRepository).findByEmail("cliente@mail.com");
    }
}