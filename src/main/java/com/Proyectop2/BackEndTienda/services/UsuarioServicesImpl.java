package com.Proyectop2.BackEndTienda.services;

import com.Proyectop2.BackEndTienda.entities.Usuario;
import com.Proyectop2.BackEndTienda.repositories.UsuarioRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicesImpl implements UsuarioServices {

    private final UsuarioRepositories usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioServicesImpl(UsuarioRepositories usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<Usuario> login(String email, String contraseña) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (passwordEncoder.matches(contraseña, usuario.getContrasena()) && "super-admin".equals(usuario.getRol())) {
                return Optional.of(usuario);
            }
        }
        return Optional.empty();
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Usuario createUsuario(Usuario usuario) {
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario updateUsuario(Long id, Usuario usuarioDetails) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
        usuario.setNombre(usuarioDetails.getNombre());
        usuario.setEmail(usuarioDetails.getEmail());
        usuario.setRol(usuarioDetails.getRol());
        usuario.setEstado(usuarioDetails.getEstado());
        // No actualizamos la contraseña en un método de update general
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario toggleEstadoUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
        if ("activo".equals(usuario.getEstado())) {
            usuario.setEstado("inactivo");
        } else {
            usuario.setEstado("activo");
        }
        return usuarioRepository.save(usuario);
    }

    @Override
    public void deleteUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }
}