package com.Proyectop2.BackEndTienda.services; // <-- LÍNEA CORREGIDA

import com.Proyectop2.BackEndTienda.entities.Usuario; // <-- LÍNEA CORREGIDA
import java.util.List;
import java.util.Optional;

public interface UsuarioServices {

    List<Usuario> getAllUsuarios();
    Optional<Usuario> getUsuarioById(Long id);
    Usuario createUsuario(Usuario usuario);
    Usuario updateUsuario(Long id, Usuario usuarioDetails);
    Usuario toggleEstadoUsuario(Long id);
    Optional<Usuario> login(String email, String contraseña);
    void deleteUsuario(Long id);
}